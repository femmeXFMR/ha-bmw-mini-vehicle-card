import { HomeAssistant, VehicleNormalized, Powertrain, EntityInfo } from './types.js';

export function discoverVehicles(hass: HomeAssistant): VehicleNormalized[] {
  const vehicles: VehicleNormalized[] = [];
  const vehicleGroups = new Map<string, EntityInfo[]>();

  // Group entities by vehicle prefix (first two segments)
  Object.values(hass.states).forEach(entity => {
    const parts = entity.entity_id.split('.');
    if (parts.length >= 2) {
      const vehiclePrefix = `${parts[0]}.${parts[1]}`;
      if (!vehicleGroups.has(vehiclePrefix)) {
        vehicleGroups.set(vehiclePrefix, []);
      }
      vehicleGroups.get(vehiclePrefix)!.push(entity);
    }
  });

  // Process each vehicle group
  vehicleGroups.forEach((entities, vehiclePrefix) => {
    const vehicle = normalizeVehicle(vehiclePrefix, entities);
    if (vehicle) {
      vehicles.push(vehicle);
    }
  });

  return vehicles;
}

function normalizeVehicle(deviceId: string, entities: EntityInfo[]): VehicleNormalized | null {
  const entityMap = new Map<string, EntityInfo>();
  entities.forEach(entity => {
    entityMap.set(entity.entity_id, entity);
  });

  // Determine powertrain type
  const powertrain = detectPowertrain(entities);
  
  // Extract vehicle name from device tracker or first entity
  const name = extractVehicleName(entities, deviceId);

  const vehicle: VehicleNormalized = {
    deviceId,
    name,
    kind: powertrain,
  };

  // Map fuel-related entities
  const fuelEntity = findEntityByPattern(entities, ['remaining_fuel']);
  const fuelPercentEntity = findEntityByPattern(entities, ['remaining_fuel_percent']);
  
  if (fuelEntity) {
    vehicle.fuel_l = fuelEntity.state;
  }
  if (fuelPercentEntity) {
    vehicle.fuel_percent = fuelPercentEntity.state;
  }

  // Map range entities
  const rangeFuelEntity = findEntityByPattern(entities, ['remaining_range_fuel']);
  const rangeTotalEntity = findEntityByPattern(entities, ['remaining_range_total']);
  const rangeElectricEntity = findEntityByPattern(entities, ['range_electric', 'remaining_range_electric']);

  if (rangeFuelEntity) {
    vehicle.range_km = rangeFuelEntity.state;
  } else if (rangeTotalEntity) {
    vehicle.range_km = rangeTotalEntity.state;
  }

  if (rangeElectricEntity) {
    vehicle.range_elec_km = rangeElectricEntity.state;
  }

  // Map battery entities (EV/PHEV)
  if (powertrain === 'ev' || powertrain === 'phev') {
    const batteryEntity = findEntityByPattern(entities, ['battery', 'remaining_battery_percent', 'charging_level_percent']);
    const chargingStateEntity = findEntityByPattern(entities, ['charging_state', 'charging_status']);

    if (batteryEntity) {
      vehicle.battery_percent = batteryEntity.state;
    }
    if (chargingStateEntity) {
      vehicle.charging_state = chargingStateEntity.state;
    }
  }

  // Map odometer
  const odometerEntity = findEntityByPattern(entities, ['mileage']);
  if (odometerEntity) {
    vehicle.odometer_km = odometerEntity.state;
  }

  // Map lock state
  const lockEntity = findEntityByPattern(entities, ['lock']);
  if (lockEntity) {
    vehicle.lock = lockEntity.state;
  }

  // Map binary sensors
  const windowsEntity = findEntityByPattern(entities, ['windows']);
  const lidsEntity = findEntityByPattern(entities, ['lids']);

  if (windowsEntity) {
    vehicle.windows_open = windowsEntity.state;
  }
  if (lidsEntity) {
    vehicle.lids_open = lidsEntity.state;
  }

  // Map action buttons
  const flashEntity = findEntityByPattern(entities, ['flash_lights']);
  const hornEntity = findEntityByPattern(entities, ['sound_horn']);
  const ventEntity = findEntityByPattern(entities, ['activate_air_conditioning', 'climate']);
  const findEntity = findEntityByPattern(entities, ['find_vehicle']);

  if (flashEntity) {
    vehicle.flash_btn = flashEntity.entity_id;
  }
  if (hornEntity) {
    vehicle.horn_btn = hornEntity.entity_id;
  }
  if (ventEntity) {
    vehicle.vent_btn = ventEntity.entity_id;
  }
  if (findEntity) {
    vehicle.find_btn = findEntity.entity_id;
  }

  // Map device tracker
  const trackerEntity = findEntityByPattern(entities, ['device_tracker']);
  if (trackerEntity) {
    vehicle.tracker = trackerEntity.entity_id;
  }

  return vehicle;
}

function detectPowertrain(entities: EntityInfo[]): Powertrain {
  const hasBattery = entities.some(entity => 
    entity.entity_id.includes('battery') || 
    entity.entity_id.includes('charging')
  );
  
  const hasFuel = entities.some(entity => 
    entity.entity_id.includes('fuel') || 
    entity.entity_id.includes('remaining_fuel')
  );

  if (hasBattery && hasFuel) {
    return 'phev';
  } else if (hasBattery) {
    return 'ev';
  } else {
    return 'ice';
  }
}

function extractVehicleName(entities: EntityInfo[], deviceId: string): string {
  // Try to get name from device tracker first
  const trackerEntity = findEntityByPattern(entities, ['device_tracker']);
  if (trackerEntity && trackerEntity.attributes.friendly_name) {
    return trackerEntity.attributes.friendly_name;
  }

  // Fallback to device ID with formatting
  const parts = deviceId.split('.');
  if (parts.length >= 2) {
    return parts[1].replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  return deviceId;
}

function findEntityByPattern(entities: EntityInfo[], patterns: string[]): EntityInfo | null {
  for (const entity of entities) {
    for (const pattern of patterns) {
      if (entity.entity_id.includes(pattern)) {
        return entity;
      }
    }
  }
  return null;
}

export function convertUnits(value: string, fromUnit: string, toUnit: string): string {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return value;

  // Length conversions (km <-> miles)
  if (fromUnit === 'km' && toUnit === 'mi') {
    return (numValue * 0.621371).toFixed(1);
  } else if (fromUnit === 'mi' && toUnit === 'km') {
    return (numValue * 1.60934).toFixed(1);
  }

  // Volume conversions (L <-> gal)
  if (fromUnit === 'L' && toUnit === 'gal') {
    return (numValue * 0.264172).toFixed(2);
  } else if (fromUnit === 'gal' && toUnit === 'L') {
    return (numValue * 3.78541).toFixed(2);
  }

  // Fuel economy conversions (L/100km <-> mpg)
  if (fromUnit === 'L/100km' && toUnit === 'mpg') {
    return (235.214 / numValue).toFixed(1);
  } else if (fromUnit === 'mpg' && toUnit === 'L/100km') {
    return (235.214 / numValue).toFixed(1);
  }

  return value;
}

export function getDisplayUnit(unit: string, preferImperial: boolean): string {
  if (!preferImperial) return unit;

  switch (unit) {
    case 'km': return 'mi';
    case 'L': return 'gal';
    case 'L/100km': return 'mpg';
    default: return unit;
  }
}

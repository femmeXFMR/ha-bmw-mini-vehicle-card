export type Powertrain = 'ice' | 'ev' | 'phev';

export interface VehicleCardConfig {
  type: 'custom:ha-vehicle-card';
  title?: string;
  image?: string;
  device_id?: string;
  prefer_imperial?: boolean;
  tank_size_l?: number;
}

export interface VehicleNormalized {
  deviceId: string;
  name: string;
  kind: Powertrain;
  fuel_l?: string;
  fuel_percent?: string;
  range_km?: string;
  battery_percent?: string;
  range_elec_km?: string;
  charging_state?: string;
  odometer_km?: string;
  lock?: string;
  windows_open?: string;
  lids_open?: string;
  flash_btn?: string;
  horn_btn?: string;
  vent_btn?: string;
  find_btn?: string;
  tracker?: string;
}

export interface EntityInfo {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
  last_updated: string;
}

export interface HomeAssistant {
  states: Record<string, EntityInfo>;
  callService: (domain: string, service: string, serviceData?: Record<string, any>) => Promise<void>;
  localize: (key: string, ...args: any[]) => string;
  config: {
    unit_system: {
      length: string;
      mass: string;
      temperature: string;
      volume: string;
    };
  };
}

export interface LovelaceCard {
  hass: HomeAssistant;
  config: VehicleCardConfig;
  setConfig: (config: VehicleCardConfig) => void;
  getCardSize: () => number;
}

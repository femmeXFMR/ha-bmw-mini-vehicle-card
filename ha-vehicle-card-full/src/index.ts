import { HaVehicleCard } from './ha-vehicle-card.js';
import { HaVehicleCardEditor } from './ha-vehicle-card-editor.js';
import { VehicleCardConfig } from './types.js';

// Register the custom elements
customElements.define('ha-vehicle-card', HaVehicleCard);
customElements.define('ha-vehicle-card-editor', HaVehicleCardEditor);

// Export types for external use
export { VehicleCardConfig } from './types.js';
export { discoverVehicles, convertUnits, getDisplayUnit } from './discovery.js';

// Home Assistant card registration
declare global {
  interface Window {
    customCards: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}

if (window.customCards) {
  window.customCards.push({
    type: 'custom:ha-vehicle-card',
    name: 'BMW/MINI Vehicle Card',
    description: 'Universal vehicle card for BMW/MINI vehicles with auto-discovery',
    preview: true,
    documentationURL: 'https://github.com/your-username/ha-vehicle-card'
  });
}

// Home Assistant card editor registration
declare global {
  interface Window {
    customCards: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}

// Card configuration schema for Home Assistant
export const cardConfigSchema = {
  type: 'custom:ha-vehicle-card',
  name: 'BMW/MINI Vehicle Card',
  description: 'Universal vehicle card for BMW/MINI vehicles with auto-discovery',
  preview: true,
  documentationURL: 'https://github.com/your-username/ha-vehicle-card',
  config: {
    title: {
      type: 'string',
      description: 'Card title (optional)',
      default: ''
    },
    image: {
      type: 'string',
      description: 'Hero image path (optional)',
      default: ''
    },
    device_id: {
      type: 'string',
      description: 'Specific vehicle device ID (optional)',
      default: ''
    },
    prefer_imperial: {
      type: 'boolean',
      description: 'Use imperial units (miles, gallons, MPG)',
      default: false
    },
    tank_size_l: {
      type: 'number',
      description: 'Tank size in liters for fuel percentage calculation',
      default: null
    }
  }
};

// Default configuration
export const defaultConfig: VehicleCardConfig = {
  type: 'custom:ha-vehicle-card',
  title: '',
  image: '',
  device_id: '',
  prefer_imperial: false,
  tank_size_l: undefined
};

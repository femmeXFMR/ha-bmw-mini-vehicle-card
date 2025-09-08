import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, VehicleCardConfig, VehicleNormalized } from './types.js';
import { discoverVehicles } from './discovery.js';

@customElement('ha-vehicle-card-editor')
export class HaVehicleCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: VehicleCardConfig;
  @state() private vehicles: VehicleNormalized[] = [];

  static get styles() {
    return css`
      .card-config {
        padding: 16px;
      }

      .form-group {
        margin-bottom: 16px;
      }

      .form-group label {
        display: block;
        margin-bottom: 4px;
        font-weight: 500;
        color: var(--primary-text-color, #000);
      }

      .form-group input,
      .form-group select {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 4px;
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color, #000);
        font-size: 14px;
      }

      .form-group input:focus,
      .form-group select:focus {
        outline: none;
        border-color: var(--accent-color, #03a9f4);
        box-shadow: 0 0 0 2px rgba(3, 169, 244, 0.2);
      }

      .form-group .checkbox-group {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .form-group input[type="checkbox"] {
        width: auto;
        margin: 0;
      }

      .form-group .help-text {
        font-size: 12px;
        color: var(--secondary-text-color, #666);
        margin-top: 4px;
      }

      .vehicle-preview {
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
        padding: 12px;
        margin-top: 16px;
        border: 1px solid var(--divider-color, #e0e0e0);
      }

      .vehicle-preview h4 {
        margin: 0 0 8px 0;
        font-size: 14px;
        color: var(--primary-text-color, #000);
      }

      .vehicle-info {
        font-size: 12px;
        color: var(--secondary-text-color, #666);
      }

      .error-message {
        color: var(--error-color, #f44336);
        font-size: 12px;
        margin-top: 4px;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.discoverVehicles();
  }

  private discoverVehicles() {
    if (!this.hass) return;
    this.vehicles = discoverVehicles(this.hass);
  }

  private _valueChanged(ev: Event) {
    const target = ev.target as HTMLInputElement | HTMLSelectElement;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    const field = target.name;

    if (!this.config) {
      this.config = { type: 'custom:ha-vehicle-card' };
    }

    const newConfig = { ...this.config };

    switch (field) {
      case 'title':
        newConfig.title = value as string;
        break;
      case 'image':
        newConfig.image = value as string;
        break;
      case 'device_id':
        newConfig.device_id = value as string;
        break;
      case 'prefer_imperial':
        newConfig.prefer_imperial = value as boolean;
        break;
      case 'tank_size_l':
        newConfig.tank_size_l = parseFloat(value as string) || undefined;
        break;
    }

    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true
    }));
  }

  private getSelectedVehicle(): VehicleNormalized | null {
    if (!this.config.device_id) return null;
    return this.vehicles.find(v => v.deviceId === this.config.device_id) || null;
  }

  render(): TemplateResult {
    if (!this.hass) {
      return html`<div class="error-message">Home Assistant not available</div>`;
    }

    const selectedVehicle = this.getSelectedVehicle();

    return html`
      <div class="card-config">
        <div class="form-group">
          <label for="title">Card Title</label>
          <input
            type="text"
            name="title"
            id="title"
            .value=${this.config.title || ''}
            @input=${this._valueChanged}
            placeholder="Leave empty to use vehicle name"
          />
          <div class="help-text">Optional title for the card. If empty, the vehicle name will be used.</div>
        </div>

        <div class="form-group">
          <label for="image">Hero Image</label>
          <input
            type="text"
            name="image"
            id="image"
            .value=${this.config.image || ''}
            @input=${this._valueChanged}
            placeholder="/local/bmw/x5-hero.png"
          />
          <div class="help-text">Optional path to a hero image (e.g., /local/bmw/x5-hero.png)</div>
        </div>

        <div class="form-group">
          <label for="device_id">Vehicle</label>
          <select
            name="device_id"
            id="device_id"
            .value=${this.config.device_id || ''}
            @change=${this._valueChanged}
          >
            <option value="">Auto-detect (first vehicle)</option>
            ${this.vehicles.map(vehicle => html`
              <option value="${vehicle.deviceId}">${vehicle.name} (${vehicle.kind.toUpperCase()})</option>
            `)}
          </select>
          <div class="help-text">Select a specific vehicle or leave empty to auto-detect.</div>
        </div>

        <div class="form-group">
          <div class="checkbox-group">
            <input
              type="checkbox"
              name="prefer_imperial"
              id="prefer_imperial"
              .checked=${this.config.prefer_imperial || false}
              @change=${this._valueChanged}
            />
            <label for="prefer_imperial">Use Imperial Units</label>
          </div>
          <div class="help-text">Display miles, gallons, and MPG instead of kilometers, liters, and L/100km.</div>
        </div>

        <div class="form-group">
          <label for="tank_size_l">Tank Size (Liters)</label>
          <input
            type="number"
            name="tank_size_l"
            id="tank_size_l"
            .value=${this.config.tank_size_l || ''}
            @input=${this._valueChanged}
            placeholder="70"
            step="0.1"
            min="0"
          />
          <div class="help-text">Tank size in liters. Used to calculate fuel percentage if not available from the vehicle.</div>
        </div>

        ${selectedVehicle ? html`
          <div class="vehicle-preview">
            <h4>Selected Vehicle Preview</h4>
            <div class="vehicle-info">
              <strong>Name:</strong> ${selectedVehicle.name}<br>
              <strong>Type:</strong> ${selectedVehicle.kind.toUpperCase()}<br>
              <strong>Device ID:</strong> ${selectedVehicle.deviceId}<br>
              ${selectedVehicle.fuel_percent ? html`<strong>Fuel:</strong> ${selectedVehicle.fuel_percent}%<br>` : ''}
              ${selectedVehicle.battery_percent ? html`<strong>Battery:</strong> ${selectedVehicle.battery_percent}%<br>` : ''}
              ${selectedVehicle.range_km ? html`<strong>Range:</strong> ${selectedVehicle.range_km} km<br>` : ''}
              ${selectedVehicle.odometer_km ? html`<strong>Odometer:</strong> ${selectedVehicle.odometer_km} km<br>` : ''}
            </div>
          </div>
        ` : ''}

        ${this.vehicles.length === 0 ? html`
          <div class="error-message">
            No BMW/MINI vehicles found. Make sure the BMW ConnectedDrive integration is installed and configured.
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ha-vehicle-card-editor': HaVehicleCardEditor;
  }
}

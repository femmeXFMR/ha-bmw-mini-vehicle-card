import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, VehicleCardConfig, VehicleNormalized } from './types.js';
import { discoverVehicles, convertUnits } from './discovery.js';

@customElement('ha-vehicle-card')
export class HaVehicleCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: VehicleCardConfig;
  @state() private vehicles: VehicleNormalized[] = [];
  @state() private selectedVehicle: VehicleNormalized | null = null;
  @state() private showDetails = false;

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 16px;
        background: var(--card-background-color, #fff);
        border-radius: var(--border-radius, 8px);
        box-shadow: var(--box-shadow, 0 2px 4px rgba(0,0,0,0.1));
        color: var(--primary-text-color, #000);
      }

      .card-header {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        gap: 12px;
      }

      .card-title {
        font-size: 1.2em;
        font-weight: 500;
        margin: 0;
        flex: 1;
      }

      .hero-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 16px;
        position: relative;
      }

      .hero-image-container {
        position: relative;
        width: 100%;
        height: 200px;
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 16px;
      }

      .hero-image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .hero-image-overlay .vehicle-name {
        color: white;
        font-size: 1.5em;
        font-weight: 600;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
        text-align: center;
      }

      .status-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 12px;
        margin-bottom: 16px;
      }

      .status-tile {
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 12px;
        padding: 16px;
        text-align: center;
        border: 1px solid var(--divider-color, #e0e0e0);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      .status-tile:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
      }

      .status-tile .icon {
        font-size: 1.5em;
        margin-bottom: 4px;
        color: var(--accent-color, #03a9f4);
      }

      .status-tile .value {
        font-size: 1.1em;
        font-weight: 500;
        margin-bottom: 2px;
      }

      .status-tile .unit {
        font-size: 0.9em;
        color: var(--secondary-text-color, #666);
      }

      .actions-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 16px;
      }

      .action-chip {
        background: var(--accent-color, #03a9f4);
        color: white;
        border: none;
        border-radius: 16px;
        padding: 8px 16px;
        font-size: 0.9em;
        cursor: pointer;
        transition: background-color 0.2s;
      }

      .action-chip:hover {
        background: var(--accent-color-dark, #0288d1);
      }

      .action-chip:disabled {
        background: var(--disabled-color, #ccc);
        cursor: not-allowed;
      }

      .details-toggle {
        background: none;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 4px;
        padding: 8px 16px;
        cursor: pointer;
        color: var(--primary-text-color, #000);
        margin-bottom: 16px;
      }

      .details-toggle:hover {
        background: var(--secondary-background-color, #f5f5f5);
      }

      .details-content {
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
        padding: 12px;
        margin-top: 8px;
      }

      .details-content.hidden {
        display: none;
      }

      .details-item {
        display: flex;
        justify-content: space-between;
        padding: 4px 0;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }

      .details-item:last-child {
        border-bottom: none;
      }

      .details-label {
        font-weight: 500;
      }

      .details-value {
        color: var(--secondary-text-color, #666);
      }

      .charging-indicator {
        animation: pulse 2s infinite;
      }

      @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
      }

      .progress-bar-container {
        position: relative;
        width: 100%;
        height: 4px;
        background: var(--divider-color, #e0e0e0);
        border-radius: 2px;
        margin: 8px 0;
        overflow: hidden;
      }

      .progress-bar {
        height: 100%;
        background: linear-gradient(90deg, var(--accent-color, #03a9f4), var(--accent-color-dark, #0288d1));
        border-radius: 2px;
        transition: width 0.3s ease;
        position: relative;
      }

      .progress-bar.charging {
        background: linear-gradient(90deg, #4caf50, #2e7d32);
        animation: progressPulse 2s infinite;
      }

      @keyframes progressPulse {
        0% { box-shadow: 0 0 0 rgba(76, 175, 80, 0.4); }
        50% { box-shadow: 0 0 10px rgba(76, 175, 80, 0.8); }
        100% { box-shadow: 0 0 0 rgba(76, 175, 80, 0.4); }
      }

      .battery-icon.charging {
        animation: batteryPulse 2s infinite;
        color: #4caf50;
      }

      @keyframes batteryPulse {
        0% { 
          color: var(--accent-color, #03a9f4);
          box-shadow: 0 0 0 rgba(76, 175, 80, 0.4);
        }
        50% { 
          color: #4caf50;
          box-shadow: 0 0 8px rgba(76, 175, 80, 0.8);
        }
        100% { 
          color: var(--accent-color, #03a9f4);
          box-shadow: 0 0 0 rgba(76, 175, 80, 0.4);
        }
      }

      .error-message {
        color: var(--error-color, #f44336);
        text-align: center;
        padding: 20px;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.discoverVehicles();
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has('hass') || changedProperties.has('config')) {
      this.discoverVehicles();
    }
  }

  private discoverVehicles() {
    if (!this.hass) return;

    this.vehicles = discoverVehicles(this.hass);
    
    // Select vehicle based on config or first available
    if (this.config.device_id) {
      this.selectedVehicle = this.vehicles.find(v => v.deviceId === this.config.device_id) || null;
    } else {
      this.selectedVehicle = this.vehicles[0] || null;
    }
  }

  private async callService(entityId: string) {
    if (!this.hass) return;
    
    const [domain] = entityId.split('.');
    await this.hass.callService(domain, 'press', { entity_id: entityId });
  }

  private toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  private getStatusTiles(): TemplateResult[] {
    if (!this.selectedVehicle) return [];

    const tiles: TemplateResult[] = [];
    const preferImperial = this.config.prefer_imperial || false;

    // ICE/PHEV: Fuel
    if (this.selectedVehicle.kind === 'ice' || this.selectedVehicle.kind === 'phev') {
      if (this.selectedVehicle.fuel_percent) {
        tiles.push(html`
          <div class="status-tile">
            <div class="icon">⛽</div>
            <div class="value">${this.selectedVehicle.fuel_percent}%</div>
            <div class="unit">Fuel</div>
          </div>
        `);
      }
    }

    // EV/PHEV: Battery
    if (this.selectedVehicle.kind === 'ev' || this.selectedVehicle.kind === 'phev') {
      const isCharging = this.selectedVehicle.charging_state === 'charging' || this.selectedVehicle.charging_state === 'on';
      const batteryClass = isCharging ? 'battery-icon charging' : 'battery-icon';
      tiles.push(html`
        <div class="status-tile">
          <div class="icon ${batteryClass}">🔋</div>
          <div class="value">${this.selectedVehicle.battery_percent || 'N/A'}%</div>
          <div class="unit">Battery ${isCharging ? '(Charging)' : ''}</div>
        </div>
      `);
    }

    // Range
    if (this.selectedVehicle.range_km) {
      const rangeValue = preferImperial 
        ? convertUnits(this.selectedVehicle.range_km, 'km', 'mi')
        : this.selectedVehicle.range_km;
      const rangeUnit = preferImperial ? 'mi' : 'km';
      
      tiles.push(html`
        <div class="status-tile">
          <div class="icon">📏</div>
          <div class="value">${rangeValue}</div>
          <div class="unit">Range (${rangeUnit})</div>
        </div>
      `);
    }

    // Odometer
    if (this.selectedVehicle.odometer_km) {
      const odometerValue = preferImperial 
        ? convertUnits(this.selectedVehicle.odometer_km, 'km', 'mi')
        : this.selectedVehicle.odometer_km;
      const odometerUnit = preferImperial ? 'mi' : 'km';
      
      tiles.push(html`
        <div class="status-tile">
          <div class="icon">🛣️</div>
          <div class="value">${odometerValue}</div>
          <div class="unit">Odometer (${odometerUnit})</div>
        </div>
      `);
    }

    return tiles;
  }

  private getActionChips(): TemplateResult[] {
    if (!this.selectedVehicle) return [];

    const chips: TemplateResult[] = [];

    // Lock/Unlock
    if (this.selectedVehicle.lock) {
      const isLocked = this.selectedVehicle.lock === 'locked';
      chips.push(html`
        <button 
          class="action-chip" 
          @click=${() => this.callService(this.selectedVehicle!.lock!)}
        >
          ${isLocked ? '🔓 Unlock' : '🔒 Lock'}
        </button>
      `);
    }

    // Flash lights
    if (this.selectedVehicle.flash_btn) {
      chips.push(html`
        <button 
          class="action-chip" 
          @click=${() => this.callService(this.selectedVehicle!.flash_btn!)}
        >
          💡 Flash
        </button>
      `);
    }

    // Horn
    if (this.selectedVehicle.horn_btn) {
      chips.push(html`
        <button 
          class="action-chip" 
          @click=${() => this.callService(this.selectedVehicle!.horn_btn!)}
        >
          📢 Horn
        </button>
      `);
    }

    // Vent/AC
    if (this.selectedVehicle.vent_btn) {
      chips.push(html`
        <button 
          class="action-chip" 
          @click=${() => this.callService(this.selectedVehicle!.vent_btn!)}
        >
          🌬️ Vent
        </button>
      `);
    }

    // Find vehicle
    if (this.selectedVehicle.find_btn) {
      chips.push(html`
        <button 
          class="action-chip" 
          @click=${() => this.callService(this.selectedVehicle!.find_btn!)}
        >
          📍 Find
        </button>
      `);
    }

    return chips;
  }

  private getProgressBars(): TemplateResult {
    if (!this.selectedVehicle) return html``;

    const bars: TemplateResult[] = [];

    // Battery progress bar for EV/PHEV
    if ((this.selectedVehicle.kind === 'ev' || this.selectedVehicle.kind === 'phev') && this.selectedVehicle.battery_percent) {
      const batteryPercent = parseFloat(this.selectedVehicle.battery_percent);
      const isCharging = this.selectedVehicle.charging_state === 'charging';
      
      bars.push(html`
        <div class="progress-bar-container">
          <div class="progress-bar ${isCharging ? 'charging' : ''}" style="width: ${batteryPercent}%"></div>
        </div>
      `);
    }

    // Fuel progress bar for ICE/PHEV
    if ((this.selectedVehicle.kind === 'ice' || this.selectedVehicle.kind === 'phev') && this.selectedVehicle.fuel_percent) {
      const fuelPercent = parseFloat(this.selectedVehicle.fuel_percent);
      
      bars.push(html`
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${fuelPercent}%"></div>
        </div>
      `);
    }

    return html`${bars}`;
  }

  private getDetailsContent(): TemplateResult {
    if (!this.selectedVehicle) return html``;

    const preferImperial = this.config.prefer_imperial || false;

    return html`
      <div class="details-item">
        <span class="details-label">Vehicle Type:</span>
        <span class="details-value">${this.selectedVehicle.kind.toUpperCase()}</span>
      </div>
      
      ${this.selectedVehicle.fuel_l ? html`
        <div class="details-item">
          <span class="details-label">Fuel Level:</span>
          <span class="details-value">
            ${this.selectedVehicle.fuel_l}L 
            ${preferImperial ? `(${convertUnits(this.selectedVehicle.fuel_l, 'L', 'gal')} gal)` : ''}
          </span>
        </div>
      ` : ''}
      
      ${this.selectedVehicle.range_elec_km ? html`
        <div class="details-item">
          <span class="details-label">Electric Range:</span>
          <span class="details-value">
            ${preferImperial ? convertUnits(this.selectedVehicle.range_elec_km, 'km', 'mi') : this.selectedVehicle.range_elec_km}
            ${preferImperial ? 'mi' : 'km'}
          </span>
        </div>
      ` : ''}
      
      ${this.selectedVehicle.windows_open ? html`
        <div class="details-item">
          <span class="details-label">Windows:</span>
          <span class="details-value">${this.selectedVehicle.windows_open}</span>
        </div>
      ` : ''}
      
      ${this.selectedVehicle.lids_open ? html`
        <div class="details-item">
          <span class="details-label">Lids:</span>
          <span class="details-value">${this.selectedVehicle.lids_open}</span>
        </div>
      ` : ''}
      
      ${this.selectedVehicle.tracker ? html`
        <div class="details-item">
          <span class="details-label">Location:</span>
          <span class="details-value">${this.hass.states[this.selectedVehicle.tracker]?.state || 'Unknown'}</span>
        </div>
      ` : ''}
    `;
  }

  render(): TemplateResult {
    if (!this.hass) {
      return html`<div class="error-message">Home Assistant not available</div>`;
    }

    if (!this.selectedVehicle) {
      return html`<div class="error-message">No BMW/MINI vehicles found</div>`;
    }

    return html`
      <div class="card-header">
        <h2 class="card-title">${this.config.title || this.selectedVehicle.name}</h2>
      </div>

      ${this.config.image ? html`
        <div class="hero-image-container">
          <img class="hero-image" src="${this.config.image}" alt="${this.selectedVehicle.name}" />
          <div class="hero-image-overlay">
            <div class="vehicle-name">${this.selectedVehicle.name}</div>
          </div>
        </div>
      ` : ''}

      <div class="status-row">
        ${this.getStatusTiles()}
      </div>

      ${this.getProgressBars()}

      <div class="actions-row">
        ${this.getActionChips()}
      </div>

      <button class="details-toggle" @click=${this.toggleDetails}>
        ${this.showDetails ? 'Hide' : 'Show'} Details
      </button>

      <div class="details-content ${this.showDetails ? '' : 'hidden'}">
        ${this.getDetailsContent()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ha-vehicle-card': HaVehicleCard;
  }
}

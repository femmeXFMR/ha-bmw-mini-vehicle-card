# BMW/MINI Vehicle Card for Home Assistant

A **universal Home Assistant** custom Lovelace card that auto-discovers vehicles provided by the official **BMW ConnectedDrive** integration and renders an elegant dashboard for **ICE / EV / PHEV** models (BMW, MINI, Motorrad).

## ✨ Features

- **🔍 Auto-Discovery**: Automatically detects BMW/MINI vehicles from the ConnectedDrive integration
- **🚗 Multi-Powertrain Support**: Works with ICE, EV, and PHEV vehicles
- **🎨 Smart Layout**: Adapts display based on vehicle capabilities
- **⚡ Action Buttons**: Lock/unlock, flash lights, horn, vent/AC, find vehicle
- **🌍 Unit Conversion**: Imperial/metric display options
- **📱 Responsive Design**: Works on all device sizes
- **⚙️ Easy Configuration**: Simple card editor with live preview

## 🚀 Quick Start

### Prerequisites

**Required Dependencies:**
- **BMW ConnectedDrive Integration**: Official BMW ConnectedDrive integration must be installed and configured
- **Home Assistant**: Version 2024.6.0 or later
- **HACS**: For easy installation (recommended)

**Optional Dependencies:**
- **Card Mod**: For advanced CSS styling and customization
- **Button Card**: For enhanced button styling
- **Bar Card**: For progress bars and indicators

### Installation

1. **Install Required Dependencies**
   - Go to HACS → Frontend → Explore & Download Repositories
   - Search for "BMW Connected Drive"
   - Install the integration
   - Configure in Settings → Devices & Services
   - Restart Home Assistant

2. **Install the Card via HACS (Recommended)**
   - Go to HACS → Frontend → Custom repositories
   - Add this repository as a custom repository
   - Install "BMW/MINI Vehicle Card"
   - Restart Home Assistant

3. **Manual Installation**
   - Download `dist/ha-vehicle-card.js` from the releases
   - Copy to `/config/www/` in your Home Assistant
   - Add as a resource in Settings → Dashboards → Resources

### Usage

Add a manual card to your dashboard:

```yaml
type: 'custom:ha-vehicle-card'
title: My BMW X5
image: /local/bmw/x5-hero.png
prefer_imperial: false
```

## ⚙️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | Auto-detected | Card title (uses vehicle name if empty) |
| `image` | string | - | Hero image path (e.g., `/local/bmw/x5-hero.png`) |
| `device_id` | string | Auto-detect | Specific vehicle device ID |
| `prefer_imperial` | boolean | false | Use imperial units (miles, gallons, MPG) |
| `tank_size_l` | number | - | Tank size in liters for fuel % calculation |

### Example Configurations

**Basic ICE Vehicle:**
```yaml
type: 'custom:ha-vehicle-card'
title: BMW X5
prefer_imperial: true
```

**EV with Hero Image:**
```yaml
type: 'custom:ha-vehicle-card'
title: BMW i4
image: /local/bmw/i4-hero.png
prefer_imperial: false
```

**PHEV with Custom Tank Size:**
```yaml
type: 'custom:ha-vehicle-card'
title: BMW X5 xDrive50e
tank_size_l: 70
prefer_imperial: true
```

## 📋 Examples

### Basic ICE Vehicle
```yaml
type: 'custom:ha-vehicle-card'
title: BMW X5
prefer_imperial: true
```

### EV with Hero Image
```yaml
type: 'custom:ha-vehicle-card'
title: BMW i4
image: /local/bmw/i4-hero.png
prefer_imperial: false
```

### PHEV with Custom Tank Size
```yaml
type: 'custom:ha-vehicle-card'
title: BMW X5 xDrive50e
tank_size_l: 70
prefer_imperial: true
```

### Multiple Vehicles
```yaml
type: 'custom:ha-vehicle-card'
title: Primary Vehicle
device_id: 'x5_xdrive35i'
prefer_imperial: false
```

For more examples, see [examples.yaml](examples.yaml).

## 🚗 Supported Vehicles

The card automatically detects vehicle type and capabilities:

### ICE (Internal Combustion Engine)
- **Display**: Fuel %, Range, Odometer
- **Actions**: Lock/Unlock, Flash, Horn, Vent, Find

### EV (Electric Vehicle)
- **Display**: Battery %, Electric Range, Charging State
- **Actions**: Lock/Unlock, Flash, Horn, Vent, Find

### PHEV (Plug-in Hybrid)
- **Display**: Fuel %, Battery %, Range (both), Odometer
- **Actions**: Lock/Unlock, Flash, Horn, Vent, Find

## 🔧 Entity Requirements

The card works with the official BMW ConnectedDrive integration. It automatically discovers entities using these patterns:

### Required Entities
- `device_tracker.{vehicle_name}` - Vehicle location
- `lock.{vehicle_name}_lock` - Lock state
- `sensor.{vehicle_name}_mileage` - Odometer

### ICE/PHEV Entities
- `sensor.{vehicle_name}_remaining_fuel` - Fuel level (L)
- `sensor.{vehicle_name}_remaining_fuel_percent` - Fuel percentage
- `sensor.{vehicle_name}_remaining_range_fuel` - Fuel range

### EV/PHEV Entities
- `sensor.{vehicle_name}_battery` or `sensor.{vehicle_name}_remaining_battery_percent` - Battery %
- `sensor.{vehicle_name}_range_electric` - Electric range
- `binary_sensor.{vehicle_name}_charging_status` - Charging state

### Action Entities
- `button.{vehicle_name}_flash_lights` - Flash lights
- `button.{vehicle_name}_sound_horn` - Sound horn
- `button.{vehicle_name}_activate_air_conditioning` - Vent/AC
- `button.{vehicle_name}_find_vehicle` - Find vehicle

### Status Entities
- `binary_sensor.{vehicle_name}_windows` - Windows status
- `binary_sensor.{vehicle_name}_lids` - Lids status

## 🧪 Testing Matrix

| Make | Model | Year | Powertrain | Status | Notes |
|------|-------|------|------------|--------|-------|
| BMW | X5 xDrive35i | 2022 | ICE | ✅ Tested | Full functionality |
| BMW | X5 xDrive50e | 2023 | PHEV | ✅ Tested | Full functionality |
| BMW | i4 | 2023 | EV | ⚠️ Likely works | Needs verification |
| BMW | iX | 2023 | EV | ⚠️ Likely works | Needs verification |
| MINI | Cooper SE | 2023 | EV | ⚠️ Likely works | Needs verification |
| MINI | Countryman PHEV | 2023 | PHEV | ⚠️ Likely works | Needs verification |

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm

### Setup
```bash
git clone <repository-url>
cd ha-vehicle-card-full
npm install
```

### Build
```bash
npm run build
```

### Development Mode
```bash
npm run watch
```

### Project Structure
```
src/
├── types.ts              # TypeScript interfaces
├── discovery.ts          # Vehicle discovery and normalization
├── ha-vehicle-card.ts    # Main card component
├── ha-vehicle-card-editor.ts # Card editor
└── index.ts              # Entry point and registration
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with your vehicle
5. Submit a pull request

### Adding New Vehicle Support

To add support for new vehicle patterns, edit `src/discovery.ts`:

1. Add new entity patterns to the mapping functions
2. Update the powertrain detection logic if needed
3. Test with the new vehicle type
4. Update the compatibility matrix

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built on the excellent [Lit](https://lit.dev/) framework
- Inspired by the BMW ConnectedDrive integration community
- Thanks to all testers and contributors

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/ha-vehicle-card/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/ha-vehicle-card/discussions)
- **Home Assistant Community**: [Forum Thread](https://community.home-assistant.io/t/bmw-mini-vehicle-card/123456)

---

**Made with ❤️ for the Home Assistant community**

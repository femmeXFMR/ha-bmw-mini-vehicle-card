# BMW/MINI Vehicle Card for Home Assistant

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.6.0+-blue.svg)](https://www.home-assistant.io/)
[![HACS](https://img.shields.io/badge/HACS-Custom%20Repository-orange.svg)](https://hacs.xyz/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Lit](https://img.shields.io/badge/Lit-3.0+-purple.svg)](https://lit.dev/)
[![BMW ConnectedDrive](https://img.shields.io/badge/BMW%20ConnectedDrive-Required-green.svg)](https://www.home-assistant.io/integrations/bmw_connected_drive/)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/femmeXFMR/ha-bmw-mini-vehicle-card/graphs/commit-activity)
[![GitHub stars](https://img.shields.io/github/stars/femmeXFMR/ha-bmw-mini-vehicle-card.svg?style=social&label=Star)](https://github.com/femmeXFMR/ha-bmw-mini-vehicle-card)

> **🚧 WORK IN PROGRESS** - This is an active development project. All questions, forks, commits, and contributions are welcome! We're building a universal BMW/MINI vehicle card for the Home Assistant community.

A universal Home Assistant Lovelace card that auto-discovers BMW/MINI vehicles from the ConnectedDrive integration and renders an elegant dashboard for ICE, EV, and PHEV models.

## 🤝 Contributing

**We welcome all contributions!** This project is actively developed and we'd love your help:

- **🐛 Bug Reports**: Found an issue? Please report it!
- **💡 Feature Requests**: Have ideas? We want to hear them!
- **🔧 Pull Requests**: Want to contribute code? Submit a PR!
- **📖 Documentation**: Help improve our docs!
- **🧪 Testing**: Test with your BMW/MINI vehicle and share feedback!
- **💬 Discussions**: Join the conversation in GitHub Discussions!

**No contribution is too small** - every bit helps make this card better for the community!

## ✨ Features

- **🔍 Auto-Discovery**: Automatically detects BMW/MINI vehicles
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
title: 'My BMW X5'
prefer_imperial: false
```

## ⚙️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | Auto-detected | Card title |
| `image` | string | - | Hero image path |
| `device_id` | string | Auto-detect | Specific vehicle |
| `prefer_imperial` | boolean | false | Imperial units |
| `tank_size_l` | number | - | Tank size for fuel % |

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

## 🧪 Testing Matrix

| Make | Model | Year | Powertrain | Status | Notes |
|------|-------|------|------------|--------|-------|
| BMW | X5 xDrive35i | 2022 | ICE | ✅ Tested | Full functionality |
| BMW | X5 xDrive50e | 2023 | PHEV | ✅ Tested | Full functionality |
| BMW | i4 | 2023 | EV | ⚠️ Likely works | Needs verification |
| BMW | iX | 2023 | EV | ⚠️ Likely works | Needs verification |
| MINI | Cooper SE | 2023 | EV | ⚠️ Likely works | Needs verification |
| MINI | Countryman PHEV | 2023 | PHEV | ⚠️ Likely works | Needs verification |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with your vehicle
5. Submit a pull request

## 📝 License

This project is licensed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License** (CC BY-NC-SA 4.0).

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

**What this means:**
- ✅ **Share** — You can copy and redistribute the material
- ✅ **Adapt** — You can remix, transform, and build upon the material
- ⚠️ **Attribution** — You must give appropriate credit
- ❌ **NonCommercial** — You may not use the material for commercial purposes
- 🔄 **ShareAlike** — You must distribute your contributions under the same license

See the [LICENSE](LICENSE) file for full details.

## 🙏 Acknowledgments

- Built on the excellent [Lit](https://lit.dev/) framework
- Inspired by the BMW ConnectedDrive integration community
- Thanks to all testers and contributors

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/femmeXFMR/ha-bmw-mini-vehicle-card/issues)
- **Discussions**: [GitHub Discussions](https://github.com/femmeXFMR/ha-bmw-mini-vehicle-card/discussions)
- **Home Assistant Community**: [Forum Thread](https://community.home-assistant.io/t/bmw-mini-vehicle-card/123456)

---

**Made with ❤️ for the Home Assistant community**

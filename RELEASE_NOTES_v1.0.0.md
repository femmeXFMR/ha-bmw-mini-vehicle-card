# BMW/MINI Vehicle Card v1.0.0 Release Notes

## 🎉 Initial Release - Universal BMW/MINI Vehicle Card

**Release Date:** January 8, 2025  
**Version:** 1.0.0  
**License:** CC BY-NC-SA 4.0

## ✨ Features

### 🚗 Universal Vehicle Support
- **Auto-discovery** of BMW/MINI vehicles from ConnectedDrive integration
- **Multi-powertrain support** - ICE, EV, and PHEV vehicles
- **Smart layout adaptation** based on vehicle capabilities

### 🎨 Visual Design
- **Hero image support** with vehicle picture backgrounds
- **Animated progress bars** for battery/fuel percentage
- **Charging animations** with pulsating effects
- **Responsive design** for all device sizes
- **Modern card styling** with hover effects

### ⚡ Functionality
- **Action buttons** - Lock/unlock, flash lights, horn, vent/AC, find vehicle
- **Unit conversion** - Imperial/metric display options
- **Smart fallbacks** - Graceful handling of missing entities
- **Card editor** - Easy configuration with live preview

### 🔧 Technical Features
- **TypeScript/Lit 3** implementation
- **HACS compatible** with proper metadata
- **Production ready** - 40KB optimized build
- **Comprehensive testing** - 41 tests passing

## 🚀 Installation

### Via HACS (Recommended)
1. Go to HACS → Frontend → Custom repositories
2. Add repository: `https://github.com/femmeXFMR/ha-bmw-mini-vehicle-card`
3. Install "BMW/MINI Vehicle Card"
4. Restart Home Assistant

### Manual Installation
1. Download `ha-vehicle-card.js` from releases
2. Copy to `/config/www/` in your Home Assistant
3. Add as resource in Settings → Dashboards → Resources

## 📋 Requirements

- **Home Assistant:** 2024.6.0 or later
- **BMW ConnectedDrive Integration:** Required
- **HACS:** Recommended for easy installation

## 🧪 Tested Vehicles

| Make | Model | Year | Powertrain | Status |
|------|-------|------|------------|--------|
| BMW | X5 xDrive35i | 2022 | ICE | ✅ Tested |
| BMW | X5 xDrive50e | 2023 | PHEV | ✅ Tested |

## 📝 Usage

Add a manual card to your dashboard:

```yaml
type: 'custom:ha-vehicle-card'
title: 'My BMW X5'
prefer_imperial: false
```

## 🔗 Links

- **Repository:** https://github.com/femmeXFMR/ha-bmw-mini-vehicle-card
- **Issues:** https://github.com/femmeXFMR/ha-bmw-mini-vehicle-card/issues
- **Discussions:** https://github.com/femmeXFMR/ha-bmw-mini-vehicle-card/discussions

## 🙏 Acknowledgments

- Built on the excellent Lit framework
- Inspired by the BMW ConnectedDrive integration community
- Thanks to all testers and contributors

---

**Made with ❤️ for the Home Assistant community**

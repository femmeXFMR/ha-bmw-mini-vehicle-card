# Changelog

All notable changes to the BMW/MINI Vehicle Card project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-08

### Added
- 🎉 **Initial Release** - Universal BMW/MINI Vehicle Card
- 🚗 **Auto-discovery** of BMW/MINI vehicles from ConnectedDrive integration
- ⚡ **Multi-powertrain support** - ICE, EV, and PHEV vehicles
- 🎨 **Hero image support** with vehicle picture backgrounds
- 📊 **Animated progress bars** for battery/fuel percentage
- ⚡ **Charging animations** with pulsating effects
- 🎯 **Action buttons** - Lock/unlock, flash lights, horn, vent/AC, find vehicle
- 🌍 **Unit conversion** - Imperial/metric display options
- 📱 **Responsive design** for all device sizes
- ⚙️ **Card editor** with live preview
- 🧪 **Comprehensive test suite** - 41 tests passing
- 📚 **Complete documentation** and examples
- 🔧 **HACS compatibility** with proper metadata

### Technical
- **TypeScript/Lit 3** implementation
- **Production ready** - 40KB optimized build
- **CC BY-NC-SA 4.0** license
- **Professional badges** and repository structure

## [Unreleased]

### Added
- Comprehensive test suite
- Example configurations
- Troubleshooting guide
- Performance optimizations

### Changed
- Improved error handling
- Enhanced responsive design
- Better unit conversion accuracy

## [0.1.0] - 2024-01-XX

### Added
- **Initial Release** 🎉
- Universal BMW/MINI vehicle card for Home Assistant
- Auto-discovery of vehicles from BMW ConnectedDrive integration
- Support for ICE, EV, and PHEV powertrains
- Smart entity mapping and normalization
- Action buttons (lock/unlock, flash, horn, vent, find)
- Unit conversion (imperial/metric)
- Card editor with live preview
- Responsive design for all screen sizes
- Comprehensive documentation
- TypeScript/Lit implementation
- Rollup build system
- HACS compatibility

### Features
- **Auto-Discovery**: Automatically detects BMW/MINI vehicles
- **Multi-Powertrain Support**: Works with ICE, EV, and PHEV vehicles
- **Smart Layout**: Adapts display based on vehicle capabilities
- **Action Buttons**: Full remote control functionality
- **Unit Conversion**: Imperial/metric display options
- **Responsive Design**: Works on all device sizes
- **Easy Configuration**: Simple card editor with live preview

### Technical Details
- Built with TypeScript and Lit 3
- Modular architecture with separate discovery, normalization, and UI components
- Comprehensive type definitions
- Error handling and fallback mechanisms
- Performance optimized with lazy loading
- Accessibility compliant

### Supported Vehicles
- BMW X5 xDrive35i (ICE) - ✅ Tested
- BMW X5 xDrive50e (PHEV) - ✅ Tested
- BMW i4 (EV) - ⚠️ Likely works
- BMW iX (EV) - ⚠️ Likely works
- MINI Cooper SE (EV) - ⚠️ Likely works
- MINI Countryman PHEV - ⚠️ Likely works

### Configuration Options
- `title`: Card title (optional)
- `image`: Hero image path (optional)
- `device_id`: Specific vehicle device ID (optional)
- `prefer_imperial`: Use imperial units (optional)
- `tank_size_l`: Tank size in liters for fuel % calculation (optional)

### Entity Requirements
- Works with official BMW ConnectedDrive integration
- Auto-discovers entities using pattern matching
- Supports all standard BMW/MINI entity patterns
- Graceful handling of missing entities

### Installation
- HACS compatible
- Manual installation supported
- No external dependencies required
- Works with Home Assistant 2024.6.0+

## [0.0.1] - 2024-01-XX

### Added
- Project initialization
- Basic TypeScript setup
- Rollup configuration
- Package.json with dependencies
- Initial project structure

---

## Development Notes

### Version Numbering
- **Major** (X.0.0): Breaking changes to API or configuration
- **Minor** (0.X.0): New features, backward compatible
- **Patch** (0.0.X): Bug fixes, minor improvements

### Release Process
1. Update version in package.json
2. Update CHANGELOG.md
3. Create git tag
4. Build and test
5. Create GitHub release
6. Update HACS repository

### Testing
- Manual testing with real BMW/MINI vehicles
- Unit tests for discovery and normalization logic
- Integration tests with Home Assistant
- Cross-browser compatibility testing
- Responsive design validation

### Future Roadmap
- [ ] Additional vehicle brand support
- [ ] Enhanced customization options
- [ ] Performance monitoring
- [ ] Advanced analytics
- [ ] Mobile app integration
- [ ] Voice control support
- [ ] Automation triggers
- [ ] Historical data visualization

---

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### How to Contribute
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Reporting Issues
- Use GitHub Issues for bug reports
- Include Home Assistant version
- Include vehicle model and year
- Provide entity examples
- Include browser console logs

### Feature Requests
- Use GitHub Discussions for feature requests
- Describe the use case
- Provide examples if possible
- Consider backward compatibility

---

## Support

- **Documentation**: [README.md](README.md)
- **Examples**: [examples.yaml](examples.yaml)
- **Issues**: [GitHub Issues](https://github.com/your-username/ha-vehicle-card/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/ha-vehicle-card/discussions)
- **Home Assistant Community**: [Forum Thread](https://community.home-assistant.io/t/bmw-mini-vehicle-card/123456)

---

**Made with ❤️ for the Home Assistant community**

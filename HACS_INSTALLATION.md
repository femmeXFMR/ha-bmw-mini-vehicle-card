# HACS Installation Guide

## 🚀 How to Install BMW/MINI Vehicle Card via HACS

### Prerequisites

1. **HACS Installed** - Make sure HACS is installed in your Home Assistant
2. **BMW ConnectedDrive Integration** - Install and configure the official BMW ConnectedDrive integration first

### Step 1: Add Custom Repository

1. Open Home Assistant
2. Go to **HACS** → **Frontend** → **Custom repositories**
3. Click the **"+"** button in the bottom right
4. Add the following:
   - **Repository:** `https://github.com/femmeXFMR/ha-bmw-mini-vehicle-card`
   - **Category:** `Lovelace` (NOT Integration!)
5. Click **"Add"**

**⚠️ Important:** Make sure you select **"Lovelace"** as the category, NOT "Integration"!

### Step 2: Install the Card

1. Go to **HACS** → **Frontend**
2. Search for **"BMW/MINI Vehicle Card"**
3. Click on the card
4. Click **"Install"**
5. Click **"Install"** again to confirm

### Step 3: Restart Home Assistant

1. Go to **Settings** → **System** → **Restart**
2. Click **"Restart"** to restart Home Assistant

### Step 4: Add to Dashboard

1. Go to your **Dashboard**
2. Click **"⋮"** (three dots) → **"Edit Dashboard"**
3. Click **"+"** to add a card
4. Choose **"Manual"**
5. Add the following configuration:

```yaml
type: 'custom:ha-vehicle-card'
title: 'My BMW X5'
prefer_imperial: false
```

6. Click **"Save"**

## ✅ Verification

After installation, you should see:
- The BMW/MINI Vehicle Card in your HACS frontend list
- The card working on your dashboard
- Auto-discovery of your BMW/MINI vehicles

## 🔧 Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | Auto-detected | Card title |
| `image` | string | - | Hero image path |
| `device_id` | string | Auto-detect | Specific vehicle |
| `prefer_imperial` | boolean | false | Imperial units |
| `tank_size_l` | number | - | Tank size for fuel % |

## 🆘 Troubleshooting

### "Repository structure for main is not compliant" Error
- **❌ Wrong:** You selected "Integration" as the type
- **✅ Correct:** Select "Lovelace" as the category
- This is a **frontend card**, not a backend integration

### Card Not Showing
- Make sure HACS is installed and updated
- Restart Home Assistant after installation
- Check that BMW ConnectedDrive integration is working

### No Vehicles Found
- Verify BMW ConnectedDrive integration is installed and configured
- Check that your vehicle is properly connected
- Look at Home Assistant logs for any errors

### Card Not Loading
- Clear browser cache
- Check browser console for JavaScript errors
- Verify the card file is properly installed

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/femmeXFMR/ha-bmw-mini-vehicle-card/issues)
- **Discussions:** [GitHub Discussions](https://github.com/femmeXFMR/ha-bmw-mini-vehicle-card/discussions)

---

**Made with ❤️ for the Home Assistant community**

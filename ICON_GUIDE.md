# Customizing the App Icon

This guide explains how to replace the default Wails icon with your own app icon.

## Prerequisites

- A **1024x1024** PNG file for your icon.
- For macOS users: You may need to refresh the system icon cache after rebuilding.

## Step-by-Step Guide

### 1. Replace the Source Icon

Place your 1024x1024 PNG file in the `build/` directory and overwrite the existing `appicon.png`.

### 2. Remove Conflicting macOS Assets

> **⚠️ Important for macOS Users**
> If your project contains `build/appicon.icon` (Icon Composer format) or `build/darwin/Assets.car`, Wails will prioritize them over `appicon.png`. This often causes your new icon to be ignored on macOS.
>
> **Solution**: Rename or delete these files to force Wails to use your PNG:
> ```bash
> # Option A: Rename to prevent Wails from reading it
> mv build/appicon.icon build/appicon.icon.bak
> mv build/darwin/Assets.car build/darwin/__Assets.car
> 
> # Option B: Delete them entirely
> rm -f build/appicon.icon build/darwin/Assets.car
> ```

### 3. Generate the Icon Assets

Run the following command in your project root to generate platform-specific icon files (e.g., `icons.icns` for macOS):

```bash
wails3 task common:generate:icons
```

### 4. Update Build Assets

This step updates the `Info.plist` and other metadata to reference the new icon:

```bash
wails3 task common:update:build-assets
```

### 5. Clean and Rebuild

Clean the old build artifacts and rebuild your application:

```bash
rm -rf bin/ build/bin/
wails3 build
```

### 6. Refresh macOS Cache (Optional)

If the icon still doesn't update on macOS, restart Finder and Dock to clear the system cache:

```bash
killall Finder
killall Dock
```

If that doesn't work, try clearing the LaunchServices cache:
```bash
sudo /System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/LaunchServices.framework/Versions/A/Support/lsregister -kill -r -domain local -domain system -domain user
```

## Troubleshooting

- **Icon not updating on macOS**: Ensure `Assets.car` and `appicon.icon` are removed or renamed. macOS prioritizes these files over `icons.icns`.
- **Build fails**: Ensure your `appicon.png` is exactly 1024x1024 pixels and is a valid PNG file.
- **Windows/Linux**: The icon generation process is handled automatically by Wails. You usually don't need to manually remove any conflicting files.

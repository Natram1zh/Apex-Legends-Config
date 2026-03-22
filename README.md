[![Build and Release](https://github.com/pwnyprod/Apex-Legends-Config/actions/workflows/release.yml/badge.svg)](https://github.com/pwnyprod/Apex-Legends-Config/actions/workflows/release.yml)
[![Publish README to GitHub Pages](https://github.com/pwnyprod/Apex-Legends-Config/actions/workflows/publish-readme.yml/badge.svg)](https://github.com/pwnyprod/Apex-Legends-Config/actions/workflows/publish-readme.yml)

# Apex Legends Configuration Guide (English)
> [Deutsche Readme Version hier](./README.de)
>
> [Release Changelog](./CHANGELOG)

This guide explains how to use specially tailored configuration files for Apex Legends to enhance your gaming experience. The provided packages include both video settings and basic game settings, adjusted to different needs.

## What is this about?

- **autoexec.cfg:**  
  This file package includes settings that are loaded automatically at game start. You can define things like maximum framerate (fps), graphic settings, and audio adjustments here. Different variants focus on different goals:
  - **competitive:** Optimized for maximum performance and stability. Settings are chosen to achieve very high frame rates, often at the expense of visual detail.
  - **quality:** A balanced approach, offering good image quality and solid performance.
  - **ultraquality:** Maximizes visual fidelity with high-resolution textures and effects, recommended for high-end PCs.

- **videoconfig.txt:**  
  This file controls resolution and other video settings. Various resolution presets are provided:
  - **720p:** Lower resolution to conserve resources and maximize FPS, ideal if performance is more important than graphics.
  - **1080p:** Standard quality and resolution, a good compromise for most players.
  - **1440p:** Higher detail level than 1080p, requires more system power.
  - **4k:** Very high resolution with sharp details, recommended for powerful hardware.

## Installing the Configurations

1. **Choosing a Package:**  
   Download one of the prepared packages from the [Releases](https://github.com/pwnyprod/Apex-Legends-Config/releases). These packages combine an `autoexec.cfg` variant and a `videoconfig.txt` variant.

2. **Installing autoexec.cfg:**  
   - Extract the downloaded package.
   - Move the `autoexec.cfg` file into the game's `cfg` folder.  
     For Steam installations, this is usually:  
     `C:\Program Files (x86)\Steam\steamapps\common\Apex Legends\cfg`
   
3. **Installing videoconfig.txt:**  
   - Press `Win + R` on your keyboard.
   - Paste this path into the Run dialog and press Enter:  
     `%USERPROFILE%\Saved Games\Respawn\Apex\local`
   - Copy `videoconfig.txt` into this directory, overwriting the existing file if necessary.

### Windows Quick Install Script

To make setup easier on Windows, the repository contains a helper script that copies both files to the correct folders and flags them as read-only:

1. Extract the release ZIP you downloaded—`install-windows-config.ps1` is already included alongside the `autoexec*.cfg` and `videoconfig*.txt` variants.
2. Inside the extracted folder, right-click `install-windows-config.ps1` and choose **“Run with PowerShell.”** You can also open a PowerShell window there (`Shift + Right Click` → “Open PowerShell window here”) and run `.\install-windows-config.ps1`.
3. Answer the prompts. The script auto-detects the config files, copies them to the recommended locations, and marks both as read-only so the game can’t overwrite them.

If you need to edit the files later, remove the read-only attribute first (for example with `attrib -r <filename>`) and rerun the script when you’re done.

4. **Game Launch Parameters:**  
   - In your Steam Library, right-click Apex Legends and select "Properties".
   - Go to the "General" tab.
   - Add the following in the Launch Options field:  
     `+exec autoexec.cfg -high -dev`  
     This ensures your chosen package loads on game start and attempts to run the game at a higher priority.

#### **Additional Launch Parameters:**

| Command | Description |
| --- | --- |
| `+exec` | Executes a cfg file on startup |
| `-dev` | Skips EA intro on startup, can cause HUD flicker issues on NVIDIA cards |
| `-fullscreen` | Forces the game to launch in fullscreen mode |
| `-high` | Attempts to set the game's priority to "high" for Windows resources |
| `-anticheat_settings=SettingsDX11.json` | Forces the game to launch in DX11|
| `-anticheat_settings=SettingsDX12.json` | Forces the game to launch in DX12|

## Additional Tips

- You can switch between different packages by choosing another `autoexec.cfg` and `videoconfig.txt` from the release packages and placing them as described above.
- If you want to apply changes to the `autoexec.cfg` without restarting the game, open the game console (if enabled via launch options) and type `exec autoexec.cfg`.
- If you experience performance issues or poor visuals, try simpler variants first (e.g. `competitive` with `720p`). If your PC is more powerful, move on to higher quality packages.

## Common Keybinds in autoexec

- **F3:** `disconnect` – Quickly disconnects from the server in case of severe lag.
- **F4:** `miles_reboot; miles_stop_all` – Restarts the audio engine if you encounter sound issues.
- **F5:** `toggle showfps_enabled 0 1 2` – Toggles FPS display and additional performance graphs.
- **F6:** `toggle shownet_enabled` – Displays network graphs to monitor connection stability.
- **F7:** `exec autoexec.cfg` – Reloads the current autoexec file to apply changes immediately.

## General Advice

- Experiment with various combinations to find the optimal balance between visual quality and performance.
- If you have older or weaker hardware, start with performance-focused variants.
- For high-resolution monitors or powerful hardware, go for the higher-quality variants to enhance your gaming experience.

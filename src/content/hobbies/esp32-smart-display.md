---
title: "Smart Display"
github: "https://github.com/Stashchenko/esp32-smart-display"
---

# Smart Display ESPHome Project

This project implements a **smart display** using an ESP32, ILI9342 TFT display, XPT2046 touchscreen, and ESPHome. 
It integrates with Home Assistant to display weather, media, notifications, and air quality, with interactive touch and sound feedback.

<img src="https://raw.githubusercontent.com/Stashchenko/esp32-smart-display/master/demo.jpg" width="320" alt="demo">

Inspired by https://github.com/1achy/ESPHOME-esp32-2432s028r-LCD

---

## Features

### 🌤 Weather Display
- Shows current **temperature**, **condition**, and **wind speed** from Home Assistant's `weather.forecast_home`.
- Dynamic **weather icons** update based on condition (`sunny`, `rainy`, `fog`, etc.).
- Displays temperature in **°C** and wind speed in **km/h**.

### 🎵 Media Player Integration
- Works with any Home Assistant media player (e.g., `media_player.kitchen`).
- Displays **media title**, **play/pause**, **next/previous**, **volume**, and **volume controls**.
- Updates **play/pause icon** dynamically.

### 🌡️ Climate Control

- Dual Monitoring: Dedicated UI block linking to climate.ac_irblaster_samsung_aqv to render local ambient temperature alongside target values.
- Granular Adjustments: Built-in hardware buttons execute steps to increment or decrement the targeted HVAC temperature point by 1° increments.
- Mode Selection: Integrates an LVGL dropdown menu component enabling users to swap live operating profiles directly between Off, Cool, Heat, and Dry.

### 🔋 Battery Status & Monitoring
- Analog Tracking: Monitors battery cell potential continuously using an ADC layout mapped to GPIO35.
- Tuned Mapping Math: Employs a segmented interpolation formula mapped across specific discharge milestones to accurately depict true capacity profiles.
- Visual Arc Indicator: Leverages an LVGL arc graphic that shifts colors dynamically from Green (≥ 80%), Blue (≥ 50%), Yellow (≥ 15%), down to Red (< 15%).

### 🔔 Smart Notifications
- Urgent Overlays: Pushes immediate, full-width modal popups to the front of the UI when text values change inside Home Assistant.
- Audio Intercepts: Couples visibility with automated acoustic prompts driven by multi-melody chime logic.
- Dismissal Interactivity: Tapping anywhere inside the notification block instantly stops audio playback and hides the popup frame.

### 🌬 Air Quality Index
- Displays **AQI** from Home Assistant sensor `sensor.air_quality_index_lviv`.
- Shows numerical AQI on the display.

### ⏱ Screen Management & Deep Sleep
- Power Saving Timeouts: Automatically drops the backlight low when interactions cease for a customized timeframe.
- Tap-to-Unlock Interface: Locks the standard panels behind a 100% dark touch block layer to filter accidental brushes when sleeping.
- Deep Sleep Schedule: Utilizes time-of-day automation rules to power off display buses and suspend the processor for 30 minutes during designated rest periods.

### ⚡ RTTTL Sound
- Plays **melody sounds** on notification events.
- Volume can be controlled via ESP32 PWM output.
- Melodies can be selected via **ESPHome select component**.
- Tap notifications to stop sound immediately.

### 📶 Wi-Fi & Home Assistant
- Connects via Wi-Fi or opens fallback **captive portal**.
- Integrates seamlessly with Home Assistant API.
- OTA updates supported.

## Setup Instructions

1. Flash ESP32 with ESPHome firmware.
2. Configure Wi-Fi or use captive portal to connect to network.
3. Add device to Home Assistant.
4. Ensure Home Assistant entities:
    - `weather.forecast_home`
    - `media_player.kitchen`
    - `sensor.air_quality_index_krakow_air_quality_index`
    - `climate.ac_irblaster_samsung_aqv`
5. Configure select box for **melody notifications** in ESPHome UI or Home Assistant.

___
## Notes

- ⚠️ Deep Sleep Wake Alert: By default, entering deep sleep shuts down the screen and processor cores completely to minimize battery drain. 
The device will remain unreactive to screen presses during this window and will wake automatically every 30 minutes to check schedules.
- 🎵 Instant Quiet: Clicking directly on a visible notification popup layer interrupts the active RTTTL thread immediately.
- **RTTTL playback** stops when tapping notification popup.
- **Screen timeout** is configurable via ESPHome number component.
- Uses **Home Assistant API** to fetch live data.
- Works with **Cyrillic and extended glyphs**and material UI https://pictogrammers.com/library/mdi/


---
title: "SmartRack - Smart Home PC Rack"
github: "https://github.com/Stashchenko/smartrack"
---

# SmartRack (ESPHome)

SmartRack is an ESP32-S3–based smart rack display and lighting controller built with ESPHome.  
It combines LED effects, presence detection, and a live system dashboard powered by Home Assistant.

<img src="https://raw.githubusercontent.com/Stashchenko/smartrack/master/examples/photo1.jpg" width="320" alt="demo">
<img src="https://raw.githubusercontent.com/Stashchenko/smartrack/master/examples/photo2.jpg" width="320" alt="demo">

---

## ✨ Features

<img src="https://raw.githubusercontent.com/Stashchenko/smartrack/master/examples/display.gif" width="320" alt="demo">

- 📺 **LVGL Display Dashboard**
    - CPU usage
    - CPU temperature
    - RAM usage
    - NAS storage usage
- 🌈 **Dual LED Control**
    - Internal LED ring (24 LEDs)
    - Rack LED strip (148 LEDs)
- 🧠 **Smart Presence Detection**
    - VL53L0X distance sensor
    - Automatic screen + lighting activation
- 🎞 **Matrix Animation (56 frames)**
- 📡 **Home Assistant Integration**
- 🔐 **Encrypted API + OTA updates**
- ⚡ **Optimized performance (PSRAM + 240MHz CPU)**

---

## 🧱 Hardware

- ESP32-S3 DevKitC-1
- WS2812 LED strips:
    - 24 LEDs (internal ring)
    - 148 LEDs (rack)
- ST7789V SPI display (284x76)
- VL53L0X distance sensor

---

## ⚙️ Configuration

### Substitutions

```yaml
substitutions:  
  COLOR_TEXT: "0x21A321"
  COLOR_ICON: "0x005300"
```

### ESP32 Setup

- Board: `esp32-s3-devkitc-1`
- CPU: 240MHz
- Flash: 16MB
- PSRAM: Octal @ 80MHz

**Optimizations:**
- Instructions + read-only data moved to PSRAM
- TLS 1.3 enabled
- BLE memory optimized
- Cache tuning enabled for ESP32-S3

---

### Connectivity

- WiFi with fallback AP:
  - SSID: `SmartRack`
  - Password: configured in YAML
- Encrypted Home Assistant API
- OTA updates enabled

---

## 💡 Lighting

### LED Ring (Internal)

- 24x WS2812 LEDs
- GPIO14
- Default: soft green light

---

### LED Rack

- 148x WS2812 LEDs
- GPIO13
- Higher brightness than ring

---

### Backlight

- Controlled via PWM (GPIO21)
- Monochromatic output
- Default: OFF

**Behavior:**
- Turns ON when occupancy detected
- Turns OFF when no presence detected
- Controls UI overlay + animation state

---

## 👁 Presence Detection

Using VL53L0X distance sensor over I2C:

- SDA: GPIO6
- SCL: GPIO7

**Logic:**
- Distance ≤ 0.5m → detection
- NaN or >0.5m → no detection

**Debounce:**
- 3 consecutive detections → ON
- 3 consecutive misses → OFF

---

### Behavior

| Event          | Action |
|----------------|--------|
| Presence ON    | Backlight ON + LED ring ON |
| Presence OFF   | Backlight OFF + LEDs OFF (after delay) |

---

## 🖥 Display (LVGL) 2.25-inch TFT LCD ST7789 small screen 76*284 module

- Driver: ST7789V (SPI)
- Resolution: 284x76
- Rotation: 90°
- Buffer: 25%

**SPI Pins:**
- CLK: GPIO12
- MOSI: GPIO11
- DC: GPIO16
- CS: GPIO17
- RESET: GPIO18

---

### UI Widgets

- CPU usage
- CPU temperature
- RAM usage
- NAS usage

Each widget:
- Icon (Material Design Icons font)
- Label with dynamic value
- Styled container with borders

---

### 🎞 Animation

- 56 JPEG frames (`images/matrix/`)
- Duration: 6 seconds loop
- Runs only when display is active
- Stops when display turns off

---

## 📊 Home Assistant Integration

Sensors used:

- `sensor.192_168_1_11_cpu_usage`
- `sensor.cpu_temperature_average`
- `sensor.192_168_1_11_memory_usage`
- `sensor.192_168_1_11_tank_data_disk_usage`

**Updates:**
- Values pushed to LVGL labels in real time
- Handles NaN values gracefully (`--` fallback)

---

## 🔢 Configurable Parameters

### Occupancy Fade Time

- Range: 5–60 seconds
- Step: 5 seconds
- Default: 20 seconds

Controls delay before system turns off after no presence.

---

## 📶 Diagnostics

- WiFi signal (dBm)
- WiFi signal (% calculated)
- Internal logs minimized:
  - Global: WARN
  - Sensors: ERROR

---

## 🚀 Getting Started

1. Install ESPHome
2. Copy configuration into `.yaml`
3. Configure secrets:

```yaml
wifi_ssid: "your_wifi"
wifi_password: "your_password"


---
title: "HA Voice Assistant"
github: "https://github.com/Stashchenko/home-assistant-voice-pe"
---

# Home Assistant Voice: Preview Edition

This is the ESPHome source code of the [Home Assistant Voice: Preview Edition](https://www.home-assistant.io/voice-pe/).

See [the documentation](https://voice-pe.home-assistant.io/) for set up and troubleshooting.

If you need to re-install the firmware, [use this installer](https://esphome.github.io/home-assistant-voice-pe/).


# Home Assistant Voice Assistant PE

ESPHome-based **Voice Assistant device** for Home Assistant, built on ESP32-S3.  
This project provides a fully local voice pipeline with wake word detection, audio playback, LED feedback, and timer support.


<img src="https://raw.githubusercontent.com/Stashchenko/home-assistant-voice-pe/master/examples/photo2.png" width="320" alt="demo">

---
Tiny transparent box with red light ring, I2S microphone, and speaker.

<img src="https://raw.githubusercontent.com/Stashchenko/home-assistant-voice-pe/master/examples/photo1.jpg" width="320" alt="demo">

---

## ✨ Features

- 🎤 **Local Voice Assistant**
    - Wake word detection (`okay nabu`, `hey jarvis`)
    - Speech-to-text (STT)
    - Text-to-speech (TTS)
- 🔊 **Audio System**
    - I2S microphone input
    - I2S speaker output (MAX98357A)
    - Mixer for simultaneous media + announcements
- 💡 **Smart LED Ring**
    - Real-time voice assistant state visualization
    - Multiple animations (listening, thinking, replying, error, timers)
- ⏱ **Timer Support**
    - Visual countdown on LED ring
    - Audible alerts
- 🔇 **Mute Control**
    - Hardware + software mute
    - LED feedback when muted
- 📡 **Home Assistant Integration**
    - Native ESPHome API (encrypted)
- 🔄 **OTA Updates**
- ⚡ **High Performance**
    - ESP32-S3 @ 240MHz
    - PSRAM enabled
    - TLS 1.3 support

---

## 🧱 Hardware

- ESP32-S3 DevKitC-1 (16MB Flash + PSRAM)
- I2S Microphone (GPIO4 / GPIO3 / GPIO2)
- I2S Amplifier (MAX98357A on GPIO21)
- WS2812 LED Ring (26 LEDs, GPIO9)
- Hardware mute button (GPIO10)

---

## 🧠 Voice Assistant Phases

The device operates using internal state IDs:

| Phase | Description |
|------|-------------|
| 1 | Idle (waiting for wake word) |
| 2 | Waiting for command |
| 3 | Listening |
| 4 | Thinking |
| 5 | Replying |
| 10 | Not ready |
| 11 | Error |

These phases control LED animations and behavior.

---

## 💡 LED Ring Behavior

| State | Effect |
|------|--------|
| Idle | Off (or user-controlled) |
| Waiting | Slow clockwise spin |
| Listening | Fast clockwise spin |
| Thinking | Pulsing LEDs |
| Replying | Fast counter-clockwise spin |
| Error | Red pulse |
| Muted | Red indicator LEDs |
| Timer | Progress ring / blinking |

---

## 🔇 Mute System

- **Hardware mute switch** overrides everything
- **Software mute switch** exposed to Home Assistant
- Audio + LEDs reflect mute state
- Sound feedback on toggle

---

## 🔊 Audio Pipeline

- Microphone → Voice Assistant → TTS → Speaker
- Mixer allows:
    - Media playback
    - Announcements
- Ducking applied during voice responses

---

## 🎧 Sounds

External sound files:

- Wake word trigger
- Mute ON/OFF
- Timer finished

Configured via URLs:

```yaml
mute_switch_on_sound_file
mute_switch_off_sound_file
timer_finished_sound_file
wake_word_triggered_sound_file
```

### 📄 License

Community-based project
Use and modify freely


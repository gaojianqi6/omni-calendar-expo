# 📅 OmniCalendar

A universal cultural calendar application built with Expo that bridges global timekeeping traditions, enabling users to seamlessly manage personal events across multiple calendar systems while celebrating the rich histories and cultural significance of international holidays. 🌍✨

## Project Overview

### 🎯 Vision Statement

OmniCalendar is a universal cultural calendar application that bridges global timekeeping traditions, enabling users to seamlessly manage personal events across multiple calendar systems while celebrating the rich histories and cultural significance of international holidays. 🌏📚

### 💡 Core Concept

This project aims to create a comprehensive calendar application that:

- **🌐 Multi-Cultural Calendar Support**: Start with Gregorian (公历) and Lunar calendars, with future expansion to Māori and other cultural calendar systems
- **📖 Educational Holiday Integration**: Display holidays from both primary and secondary calendars with rich historical context
- **⚡ Intelligent Event Management**: Create, manage, and organize events with flexible recurrence patterns
- **🤝 Cultural Awareness**: Respect and celebrate diverse cultural traditions through thoughtful design and functionality

### ✨ Key Features

#### 🏗️ Phase 1: Calendar Foundation
- **📅 Monthly Calendar View**: Clean, intuitive monthly calendar display with custom design
- **🔄 Multi-Calendar Toggle**: Settings to show/hide Lunar calendar alongside Gregorian
- **🎉 Holiday Integration**: 
  - Display 公历 (Gregorian) holidays
  - Show Lunar calendar holidays 🌙
  - Interactive holiday details with historical context 📚
- **⚙️ Settings Page**: Configure calendar preferences and display options

#### 📋 Phase 2: Event Management
- **➕ Event Creation**: Create events using either calendar system
- **🎨 Color Coding**: Assign different colors to events for visual organization
- **🔄 Recurrence Patterns**: Support for:
  - 📅 Weekly events
  - 📆 Fortnightly events
  - 📊 Monthly events
  - 🗓️ Yearly events
- **📊 Event Management Dashboard**: 
  - View all events in organized sections
  - Collapsible sections by event type/status 📁
  - Status tracking: Not Started, In Progress, Completed, etc. ✅

#### 🚀 Future Enhancements
- **🌍 Additional Calendar Systems**: Māori calendar and other cultural calendars
- **🔔 Advanced Features**: Todo lists, reminders, notifications
- **☁️ Cloud Sync**: Multi-device synchronization
- **📚 Cultural Education**: Expanded historical context and traditions

## 🚀 Getting Started

### 📋 Prerequisites

Before you begin, ensure you have the following installed:
- 📦 Node.js (version 18 or higher)
- 📦 npm or yarn
- ⚡ Expo CLI (`npm install -g @expo/cli`)
- 📱 Expo Go app on your mobile device (for testing)

### 💻 Installation

1. **📥 Clone the repository**
   ```bash
   git clone <repository-url>
   cd omni-calendar-expo
   ```

2. **📦 Install dependencies**
   ```bash
   npm install
   ```

3. **🚀 Start the development server**
   ```bash
   npm start
   ```

4. **📱 Run on your device**
   - Install Expo Go on your mobile device
   - Scan the QR code displayed in your terminal or browser
   - The app will load on your device ✨

### 🛠️ Development Commands

```bash
# 🚀 Start development server
npm start

# 📱 Run on iOS simulator (macOS only)
npm run ios

# 🤖 Run on Android emulator
npm run android

# 🏗️ Build for production
npm run build

# 🧪 Run tests
npm test

# 🔍 Lint code
npm run lint
```

### 📁 Project Structure

```
omni-calendar-expo/
├── src/
│   ├── components/          # 🧩 Reusable UI components
│   ├── screens/             # 📱 Screen components
│   ├── navigation/          # 🧭 Navigation configuration
│   ├── services/            # ⚙️ Business logic services
│   ├── utils/               # 🔧 Utility functions
│   ├── constants/           # 📋 App constants
│   └── types/               # 📝 TypeScript definitions
├── assets/                  # 🎨 Images, fonts, etc.
├── app.json                 # ⚙️ Expo configuration
└── package.json             # 📦 Dependencies and scripts
```

## 🛠️ Technology Stack

- **⚡ Framework**: Expo (React Native)
- **📝 Language**: TypeScript
- **🧭 Navigation**: React Navigation
- **🔄 State Management**: React Hooks + Context
- **💾 Database**: Local storage (AsyncStorage/Realm)
- **🎨 UI Components**: Custom design system

## 🗺️ Development Roadmap

### 🏗️ Phase 1: Core Calendar (Current Focus)
- [ ] 📅 Monthly calendar view with custom design
- [ ] ⚙️ Settings page for calendar preferences
- [ ] 🌙 Lunar calendar integration
- [ ] 🎉 Holiday display and historical context
- [ ] 🧭 Basic navigation structure

### 📋 Phase 2: Event Management
- [ ] ➕ Event creation and editing
- [ ] 🎨 Color coding system
- [ ] 🔄 Recurrence patterns
- [ ] 📊 Event management dashboard
- [ ] ✅ Status tracking system

### 🚀 Phase 3: Enhanced Features
- [ ] 🌍 Additional calendar systems (Māori, etc.)
- [ ] 🔔 Advanced reminder system
- [ ] ☁️ Cloud synchronization
- [ ] 📚 Cultural education features

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for details on how to get involved.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**🌍 Building bridges between cultures through time** 📅✨
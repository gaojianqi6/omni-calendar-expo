# Package Setup Guide

This document describes all the packages that have been installed and configured in the project.

## 📦 Installed Packages

### 1. React Native + Expo ✅
Already installed and configured.

### 2. React Native Paper (UI Library)
**Package:** `react-native-paper`

Multiple themes configured:
- Light theme
- Dark theme
- Calendar theme (custom)

**Configuration:** `src/config/themes.ts`

**Usage:**
```tsx
import { PaperProvider } from 'react-native-paper';
import { Button, Card, Text } from 'react-native-paper';

// Themes are automatically applied based on color scheme
// Can be accessed via: useTheme() hook from react-native-paper
```

### 3. Clerk (Authentication)
**Package:** `@clerk/clerk-expo`
**Additional:** `expo-secure-store` (for token storage)

**Configuration:** `src/config/clerk.ts`

**Setup:**
1. Set environment variable: `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`
2. Update `app.json` with your Clerk publishable key in plugins section

**Usage:**
```tsx
import { useAuth } from '@clerk/clerk-expo';

function MyComponent() {
  const { isSignedIn, userId } = useAuth();
  // ...
}
```

### 4. React Navigation ✅
Already installed and configured.

### 5. TanStack React Query (API Requests)
**Package:** `@tanstack/react-query`

**Configuration:**
- Query Client: `src/config/queryClient.ts`
- API Config: `src/config/api.ts`
- Custom Hooks: `src/hooks/useApi.ts`

**API Configuration:**
- Base URL: `http://localhost:5235`
- API Prefix: `/api`
- Example: `/api/tasks` → `http://localhost:5235/api/tasks`

**Usage:**
```tsx
import { useApiQuery, useApiMutation } from '../hooks/useApi';

// GET request
const { data, isLoading, error } = useApiQuery('/tasks');

// POST request
const mutation = useApiMutation('/tasks', 'POST');
mutation.mutate({ title: 'New Task' });
```

**Example Service:** `src/services/taskService.ts`

### 6. Zustand (State Management) ✅
Already installed.

**Example Store:** `src/store/useTaskStore.ts`

**Usage:**
```tsx
import { useTaskStore } from '../store/useTaskStore';

const { tasks, addTask, updateTask } = useTaskStore();
```

### 7. react-i18next (Multi-language Support)
**Package:** `react-i18next` + `i18next`

**Supported Languages:**
- English (en)
- Māori (mi)
- Chinese (zh)

**Configuration:** `src/i18n/config.ts`
**Translation Files:** `src/i18n/locales/`

**Usage:**
```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();
  
  return <Text>{t('common.welcome')}</Text>;
  
  // Change language
  // i18n.changeLanguage('mi');
}
```

### 8. react-native-gifted-charts
**Package:** `react-native-gifted-charts`
**Additional:** `react-native-svg` (dependency)

**Installation:** Already added to package.json

**Usage:**
```tsx
import { LineChart, BarChart } from 'react-native-gifted-charts';

// See documentation: https://www.npmjs.com/package/react-native-gifted-charts
```

## 🔧 Configuration Files Created

1. **API Configuration**
   - `src/config/api.ts` - API base URL and fetch wrapper
   - `src/config/queryClient.ts` - React Query client

2. **Theme Configuration**
   - `src/config/themes.ts` - Multiple Paper themes

3. **Authentication**
   - `src/config/clerk.ts` - Clerk provider setup

4. **Internationalization**
   - `src/i18n/config.ts` - i18next configuration
   - `src/i18n/locales/en.json` - English translations
   - `src/i18n/locales/mi.json` - Māori translations
   - `src/i18n/locales/zh.json` - Chinese translations

5. **Hooks & Services**
   - `src/hooks/useApi.ts` - Custom API hooks for React Query
   - `src/services/taskService.ts` - Example API service
   - `src/store/useTaskStore.ts` - Example Zustand store

## 📱 App Integration

All providers are integrated in `src/App.tsx`:
- QueryClientProvider (React Query)
- ClerkProviderWrapper (Clerk)
- PaperProvider (React Native Paper)
- i18n (imported and initialized)

## 🚀 Next Steps

1. **Install packages:**
   ```bash
   npm install
   ```

2. **Set environment variables:**
   Create a `.env` file:
   ```
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
   ```

3. **Update Clerk key in app.json:**
   Replace `"your-clerk-publishable-key-here"` in the plugins section

4. **Update API base URL if needed:**
   Edit `src/config/api.ts` to change the `BASE_URL`

5. **Add more translations:**
   Add keys to files in `src/i18n/locales/`

## 📚 Example Component

See `src/examples/TaskExample.tsx` for a complete example using:
- React Query
- Zustand
- React Native Paper
- react-i18next

## 🔗 Useful Links

- [React Native Paper Docs](https://callstack.github.io/react-native-paper/)
- [Clerk Expo Docs](https://clerk.com/docs/quickstarts/expo)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Zustand Docs](https://zustand-demo.pmnd.rs/)
- [react-i18next Docs](https://react.i18next.com/)
- [react-native-gifted-charts Docs](https://github.com/Abhinandan-Krishnan/react-native-gifted-charts)


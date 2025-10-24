import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useAppStore } from '../../store/useAppStore';

export function Settings() {
  const { settings, updateSettings } = useAppStore();

  const handleLanguageChange = (language: 'en' | 'zh') => {
    updateSettings({ language });
  };

  const handleSecondCalendarToggle = () => {
    updateSettings({ showSecondCalendar: !settings.showSecondCalendar });
  };

  const handleGridBackgroundColorChange = (color: string) => {
    updateSettings({ gridBackgroundColor: color });
  };

  const handleTextColorChange = (color: string) => {
    updateSettings({ textColor: color });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Language Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Language</Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                settings.language === 'en' && styles.selectedOption,
              ]}
              onPress={() => handleLanguageChange('en')}
            >
              <Text
                style={[
                  styles.optionText,
                  settings.language === 'en' && styles.selectedOptionText,
                ]}
              >
                English
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                settings.language === 'zh' && styles.selectedOption,
              ]}
              onPress={() => handleLanguageChange('zh')}
            >
              <Text
                style={[
                  styles.optionText,
                  settings.language === 'zh' && styles.selectedOptionText,
                ]}
              >
                中文
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Second Calendar Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Second Calendar</Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                !settings.showSecondCalendar && styles.selectedOption,
              ]}
              onPress={() => handleSecondCalendarToggle()}
            >
              <Text
                style={[
                  styles.optionText,
                  !settings.showSecondCalendar && styles.selectedOptionText,
                ]}
              >
                None
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                settings.showSecondCalendar && styles.selectedOption,
              ]}
              onPress={() => handleSecondCalendarToggle()}
            >
              <Text
                style={[
                  styles.optionText,
                  settings.showSecondCalendar && styles.selectedOptionText,
                ]}
              >
                Chinese Lunar
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Calendar Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Calendar Settings</Text>
          
          {/* Grid Background Color */}
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Grid Background Color</Text>
            <View style={styles.colorOptionsContainer}>
              <TouchableOpacity
                style={[
                  styles.colorOption,
                  { backgroundColor: '#ffffff' },
                  settings.gridBackgroundColor === '#ffffff' && styles.selectedColorOption,
                ]}
                onPress={() => handleGridBackgroundColorChange('#ffffff')}
              >
                <Text style={styles.colorOptionText}>Default</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.colorOption,
                  { backgroundColor: '#f5f5f5' },
                  settings.gridBackgroundColor === '#f5f5f5' && styles.selectedColorOption,
                ]}
                onPress={() => handleGridBackgroundColorChange('#f5f5f5')}
              >
                <Text style={styles.colorOptionText}>Light Gray</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Text Color */}
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Text Color</Text>
            <View style={styles.colorOptionsContainer}>
              <TouchableOpacity
                style={[
                  styles.colorOption,
                  { backgroundColor: '#000000' },
                  settings.textColor === '#000000' && styles.selectedColorOption,
                ]}
                onPress={() => handleTextColorChange('#000000')}
              >
                <Text style={[styles.colorOptionText, { color: '#fff' }]}>Black</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.colorOption,
                  { backgroundColor: '#333333' },
                  settings.textColor === '#333333' && styles.selectedColorOption,
                ]}
                onPress={() => handleTextColorChange('#333333')}
              >
                <Text style={[styles.colorOptionText, { color: '#fff' }]}>Dark Gray</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 24,
  },
  settingItem: {
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 12,
  },
  colorOptionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  colorOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColorOption: {
    borderColor: '#007AFF',
  },
  colorOptionText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

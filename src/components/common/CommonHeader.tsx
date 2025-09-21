import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../../store/useAppStore';

interface CommonHeaderProps {
  title?: string;
  showLeftToggle?: boolean;
}

export const CommonHeader: React.FC<CommonHeaderProps> = ({
  title = 'Omni Calendar',
  showLeftToggle = true,
}) => {
  const { toggleLeftDrawer } = useAppStore();

  return (
    <View style={styles.container}>
      {showLeftToggle && (
        <TouchableOpacity
          style={styles.leftButton}
          onPress={toggleLeftDrawer}
          activeOpacity={0.7}
        >
          <Ionicons name="menu" size={24} color="#000" />
        </TouchableOpacity>
      )}
      
      <Text style={styles.title}>{title}</Text>
      
      {/* Right side placeholder for future features */}
      <View style={styles.rightButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  leftButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  rightButton: {
    width: 40, // Same width as left button for centering
  },
});

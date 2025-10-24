import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { CommonHeader } from '../../components/common/CommonHeader';

export function Explore() {
  const navigation = useNavigation();

  const menuItems = [
    {
      id: 'settings',
      title: 'Settings',
      icon: 'settings-outline',
      onPress: () => navigation.navigate('Settings' as never),
    },
    {
      id: 'help',
      title: 'Help & Feedback',
      icon: 'help-circle-outline',
      onPress: () => navigation.navigate('HelpFeedback' as never),
    },
  ];

  const aboutItem = {
    id: 'about',
    title: 'About',
    icon: 'information-circle-outline',
    onPress: () => navigation.navigate('About' as never),
  };

  return (
    <View style={styles.container}>
      <CommonHeader title="Menu" showLeftToggle={false} />
      
      <View style={styles.content}>
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <Ionicons name={item.icon as any} size={24} color="#000" />
              <Text style={styles.menuItemText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Separator Line */}
        <View style={styles.separator} />
        
        <View style={styles.menuSection}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={aboutItem.onPress}
            activeOpacity={0.7}
          >
            <Ionicons name={aboutItem.icon as any} size={24} color="#000" />
            <Text style={styles.menuItemText}>{aboutItem.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </View>
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
  },
  menuSection: {
    paddingTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 16,
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
});

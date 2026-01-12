import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useProfile } from '../../contexts/ProfileContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function ProfileScreen() {
  const { profileData, updateProfile } = useProfile();
  const { isDark } = useTheme();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      updateProfile({ headerBackground: result.assets[0].uri });
    }
  };
  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* Header with background image */}
      <View style={styles.headerContainer}>
        <Image 
          source={{ uri: profileData.headerBackground }}
          style={styles.headerBackgroundImage}
        />
        <View style={styles.headerOverlay}>
          {/* Top navigation */}
          <View style={styles.topNav}>
            <TouchableOpacity onPress={pickImage}>
              <Ionicons name="camera-outline" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.topRightIcons}>
            </View>
          </View>
        </View>
      </View>
      
      {/* Profile info card */}
      <View style={[styles.profileCard, { backgroundColor: isDark ? '#333' : 'white' }]}>
        <View style={styles.profileInfo}>
          <Image
            source={{ uri: profileData.profileImage }}
            style={styles.profileAvatar}
          />
          <View style={styles.userInfo}>
            <Text style={[styles.username, { color: isDark ? 'white' : '#333' }]}>{profileData.name}</Text>
            <Text style={[styles.userTitle, { color: isDark ? '#ccc' : '#666' }]}>{profileData.title}</Text>
            <Text style={[styles.userBio, { color: isDark ? '#aaa' : '#888' }]}>{profileData.bio}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={[styles.editButton, { backgroundColor: isDark ? '#444' : '#e9ecef' }]} onPress={() => router.push('/edit-profile')}>
          <Text style={[styles.editButtonText, { color: isDark ? 'white' : '#333' }]}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      
      {/* Stats section */}
      <View style={styles.statsContainer}>
        <TouchableOpacity style={styles.statItem} onPress={() => router.push('/followers')}>
          <Text style={[styles.statNumber, { color: isDark ? 'white' : '#333' }]}>10K</Text>
          <Text style={[styles.statLabel, { color: isDark ? '#ccc' : '#666' }]}>Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statItem} onPress={() => router.push('/following')}>
          <Text style={[styles.statNumber, { color: isDark ? 'white' : '#333' }]}>20k</Text>
          <Text style={[styles.statLabel, { color: isDark ? '#ccc' : '#666' }]}>Following</Text>
        </TouchableOpacity>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: isDark ? 'white' : '#333' }]}>200</Text>
          <Text style={[styles.statLabel, { color: isDark ? '#ccc' : '#666' }]}>Coins</Text>
        </View>
      </View>
      
      {/* Action buttons */}
      <View style={styles.actionGrid}>
        {/* First row - 3 icons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/verification')}>
            <View style={[styles.actionIcon, { backgroundColor: '#127d96' }]}>
              <Ionicons name="checkmark-circle-outline" size={24} color="white" />
            </View>
            <Text style={[styles.actionText, { color: isDark ? 'white' : '#333' }]}>Verify</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/live-history')}>
            <View style={[styles.actionIcon, { backgroundColor: '#127d96' }]}>
              <Ionicons name="bar-chart-outline" size={24} color="white" />
            </View>
            <Text style={[styles.actionText, { color: isDark ? 'white' : '#333' }]}>Live Data</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/settings')}>
            <View style={[styles.actionIcon, { backgroundColor: '#127d96' }]}>
              <Ionicons name="settings-outline" size={24} color="white" />
            </View>
            <Text style={[styles.actionText, { color: isDark ? 'white' : '#333' }]}>Settings</Text>
          </TouchableOpacity>
        </View>
        
        {/* Second row - 2 icons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/post')}>
            <View style={[styles.actionIcon, { backgroundColor: '#127d96' }]}>
              <Ionicons name="person-outline" size={24} color="white" />
            </View>
            <Text style={[styles.actionText, { color: isDark ? 'white' : '#333' }]}>Post</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/earnings')}>
            <View style={[styles.actionIcon, { backgroundColor: '#127d96' }]}>
              <Ionicons name="cash-outline" size={24} color="white" />
            </View>
            <Text style={[styles.actionText, { color: isDark ? 'white' : '#333' }]}>Earnings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/recharge')}>
            <View style={[styles.actionIcon, { backgroundColor: '#127d96' }]}>
              <Ionicons name="card-outline" size={24} color="white" />
            </View>
            <Text style={[styles.actionText, { color: isDark ? 'white' : '#333' }]}>Recharge</Text>
          </TouchableOpacity>
        </View>
        
        {/* Third row - empty */}
        <View style={styles.actionRow}>
          <View style={styles.actionButton}></View>
          <View style={styles.actionButton}></View>
          <View style={styles.actionButton}></View>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    height: 280,
  },
  headerBackgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerOverlay: {
    flex: 1,
    paddingHorizontal: 20,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingTop: 40,
  },
  topRightIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  iconButton: {
    padding: 5,
  },
  profileImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundProfileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'white',
  },
  profileCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: -60,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  userTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  userBio: {
    fontSize: 12,
    color: '#888',
    lineHeight: 16,
  },
  editButton: {
    backgroundColor: '#e9ecef',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  actionGrid: {
    paddingHorizontal: 20,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  actionText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
});
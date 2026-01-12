import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useProfile } from '../contexts/ProfileContext';
import { useTheme } from '../contexts/ThemeContext';

export default function EditProfileScreen() {
  const { profileData, updateProfile } = useProfile();
  const { isDark } = useTheme();
  const [profileImage, setProfileImage] = useState(profileData.profilePhoto || profileData.profileImage);
  const [bio, setBio] = useState(profileData.bio);
  const [location, setLocation] = useState(profileData.location);
  const [gender, setGender] = useState(profileData.gender);
  const [birthday, setBirthday] = useState(profileData.birthday);
  const [userName, setUserName] = useState(profileData.UserName);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const saveProfile = () => {
    updateProfile({
      bio,
      location,
      profileImage,
      profilePhoto: profileImage,
      gender,
      birthday,
      UserName: userName
    });
    router.back();
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: isDark ? '#1a1a1a' : 'white', borderBottomColor: isDark ? '#333' : '#127d96' }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={isDark ? 'white' : '#333'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? 'white' : '#333' }]}>Edit Profile</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Image */}
        <View style={[styles.profileImageSection, { backgroundColor: isDark ? '#333' : 'white' }]}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
            <TouchableOpacity style={styles.editImageButton} onPress={pickImage}>
              <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Personal Information */}
          <Text style={[styles.sectionTitle, { color: isDark ? 'white' : '#333' }]}>Personal Information</Text>
          
          <View style={styles.fieldContainer}>
            <Text style={[styles.fieldLabel, { color: isDark ? '#ccc' : '#333' }]}>Username :</Text>
            <TextInput
              style={[styles.textInput, { 
                backgroundColor: isDark ? '#444' : '#e9ecef',
                color: isDark ? 'white' : '#333',
                borderColor: isDark ? '#555' : '#127d96'
              }]}
              value={userName}
              onChangeText={setUserName}
              placeholder="Enter your username"
              placeholderTextColor={isDark ? '#888' : '#666'}
            />
          </View>
          
          <View style={styles.fieldContainer}>
            <Text style={[styles.fieldLabel, { color: isDark ? '#ccc' : '#333' }]}>Gender :</Text>
            <TextInput
              style={[styles.textInput, { 
                backgroundColor: isDark ? '#444' : '#e9ecef',
                color: isDark ? 'white' : '#333',
                borderColor: isDark ? '#555' : '#127d96'
              }]}
              value={gender}
              onChangeText={setGender}
              placeholder="Enter your gender"
              placeholderTextColor={isDark ? '#888' : '#666'}
            />
          </View>
          
          <View style={styles.fieldContainer}>
            <Text style={[styles.fieldLabel, { color: isDark ? '#ccc' : '#333' }]}>Birthday :</Text>
            <TextInput
              style={[styles.textInput, { 
                backgroundColor: isDark ? '#444' : '#e9ecef',
                color: isDark ? 'white' : '#333',
                borderColor: isDark ? '#555' : '#127d96'
              }]}
              value={birthday}
              onChangeText={setBirthday}
              placeholder="Enter your birthday (DD/MM/YYYY)"
              placeholderTextColor={isDark ? '#888' : '#666'}
            />
          </View>
          
          <View style={styles.fieldContainer}>
            <Text style={[styles.fieldLabel, { color: isDark ? '#ccc' : '#333' }]}>Bio :</Text>
            <TextInput
              style={[styles.textInput, { 
                backgroundColor: isDark ? '#444' : '#e9ecef',
                color: isDark ? 'white' : '#333',
                borderColor: isDark ? '#555' : '#127d96'
              }]}
              value={bio}
              onChangeText={setBio}
              placeholder="Enter your bio"
              placeholderTextColor={isDark ? '#888' : '#666'}
              multiline
            />
          </View>
          
          {/* Other Information */}
          <Text style={[styles.sectionTitle, { color: isDark ? 'white' : '#333' }]}>Other Information</Text>
          
          <View style={styles.fieldContainer}>
            <Text style={[styles.fieldLabel, { color: isDark ? '#ccc' : '#333' }]}>Location :</Text>
            <TextInput
              style={[styles.textInput, { 
                backgroundColor: isDark ? '#444' : '#e9ecef',
                color: isDark ? 'white' : '#333',
                borderColor: isDark ? '#555' : '#127d96'
              }]}
              value={location}
              onChangeText={setLocation}
              placeholder="Enter your location"
              placeholderTextColor={isDark ? '#888' : '#666'}
            />
          </View>
        </View>
      </ScrollView>
      
      {/* Save Button */}
      <View style={[styles.buttonContainer, { backgroundColor: isDark ? '#333' : 'white' }]}>
        <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#127d96',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  titleContainer: {
    alignItems: 'flex-start',
  },
  titleUnderline: {
    width: 60,
    height: 2,
    backgroundColor: '#127d96',
    marginTop: 4,
  },
  placeholder: {
    width: 24,
  },
  profileImageSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#127d96',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#127d96',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  scrollContainer: {
    flex: 1,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  textInput: {
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#127d96',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 30,
  },
  saveButton: {
    backgroundColor: '#127d96',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
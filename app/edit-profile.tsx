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

export default function EditProfileScreen() {
  const { profileData, updateProfile } = useProfile();
  const [profileImage, setProfileImage] = useState(profileData.profileImage);
  const [name, setName] = useState(profileData.name);
  const [bio, setBio] = useState(profileData.bio);
  const [location, setLocation] = useState(profileData.location);

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
      name,
      bio,
      location,
      profileImage
    });
    router.back();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Image */}
        <View style={styles.profileImageSection}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
            <TouchableOpacity style={styles.editImageButton} onPress={pickImage}>
              <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Form Fields */}
        <View style={styles.formContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Name :</Text>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />
          </View>
          
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Bio :</Text>
            <TextInput
              style={styles.textInput}
              value={bio}
              onChangeText={setBio}
              placeholder="Enter your bio"
              multiline
            />
          </View>
          
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Location :</Text>
            <TextInput
              style={styles.textInput}
              value={location}
              onChangeText={setLocation}
              placeholder="Enter your location"
            />
          </View>
        </View>
      </ScrollView>
      
      {/* Save Button */}
      <View style={styles.buttonContainer}>
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
    backgroundColor: 'white',
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
  fieldContainer: {
    marginBottom: 25,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#e9ecef',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 2,
    borderColor: '#127d96',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 30,
    backgroundColor: 'white',
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
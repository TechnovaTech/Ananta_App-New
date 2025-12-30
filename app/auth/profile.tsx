import { StyleSheet, TextInput, TouchableOpacity, View, Image, ScrollView, KeyboardAvoidingView, Platform, Alert, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [birthday, setBirthday] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pinCode, setPinCode] = useState('');

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to select an image.');
      return;
    }

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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Profile</ThemedText>
        <View style={styles.placeholder} />
      </View>

    <KeyboardAvoidingView 
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
          <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
            <View style={styles.avatar}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <ThemedText style={styles.plusIcon}>+</ThemedText>
              )}
            </View>
            <ThemedText style={styles.galleryText}>Tap to select from gallery</ThemedText>
          </TouchableOpacity>
      
      <View style={styles.formContainer}>
        {/* Personal Information */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Personal Information</ThemedText>
          
          <View style={styles.inputContainer}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/561/561127.png' }} 
              style={styles.iconImage} 
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#666"
              value={userName}
              onChangeText={setUserName}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077012.png' }} 
              style={styles.iconImage} 
            />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#666"
              value={name}
              onChangeText={setName}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png' }} 
              style={styles.iconImage} 
            />
            <TextInput
              style={styles.input}
              placeholder="Gender"
              placeholderTextColor="#666"
              value={gender}
              onChangeText={setGender}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2693/2693507.png' }} 
              style={styles.iconImage} 
            />
            <TextInput
              style={styles.input}
              placeholder="Birthday (DD/MM/YYYY)"
              placeholderTextColor="#666"
              value={birthday}
              onChangeText={setBirthday}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3616/3616729.png' }} 
              style={styles.iconImage} 
            />
            <TextInput
              style={styles.input}
              placeholder="Bio / Hashtags"
              placeholderTextColor="#666"
              value={bio}
              onChangeText={setBio}
            />
          </View>
        </View>
        
        {/* Address Information */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Address Information</ThemedText>
          
          <View style={styles.inputContainer}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/684/684908.png' }} 
              style={styles.iconImage} 
            />
            <TextInput
              style={styles.input}
              placeholder="Address Line 1"
              placeholderTextColor="#666"
              value={addressLine1}
              onChangeText={setAddressLine1}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/684/684908.png' }} 
              style={styles.iconImage} 
            />
            <TextInput
              style={styles.input}
              placeholder="City"
              placeholderTextColor="#666"
              value={city}
              onChangeText={setCity}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/684/684908.png' }} 
              style={styles.iconImage} 
            />
            <TextInput
              style={styles.input}
              placeholder="State"
              placeholderTextColor="#666"
              value={state}
              onChangeText={setState}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/684/684908.png' }} 
              style={styles.iconImage} 
            />
            <TextInput
              style={styles.input}
              placeholder="Country"
              placeholderTextColor="#666"
              value={country}
              onChangeText={setCountry}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/684/684908.png' }} 
              style={styles.iconImage} 
            />
            <TextInput
              style={styles.input}
              placeholder="Pin Code"
              placeholderTextColor="#666"
              value={pinCode}
              onChangeText={setPinCode}
              keyboardType="numeric"
            />
          </View>
        </View>
        
        {/* Other Information */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Other Information</ThemedText>
          
          <View style={styles.inputContainer}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/684/684908.png' }} 
              style={styles.iconImage} 
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              placeholderTextColor="#666"
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>
      </View>
      
          <TouchableOpacity 
            style={styles.nextButtonContainer}
            onPress={() => router.push('/(tabs)')}
          >
            <LinearGradient
              colors={[Colors.light.primary, Colors.light.primaryDark]}
              style={styles.nextButton}
            >
              <ThemedText style={styles.buttonText}>Next</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
    </KeyboardAvoidingView>
    </View>
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
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#126996',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 24,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 150,
    backgroundColor: '#f8f9fa',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  plusIcon: {
    fontSize: 30,
    color: Colors.light.primary,
    fontWeight: 'bold',
  },
  galleryText: {
    fontSize: 12,
    color: Colors.light.primary,
    marginTop: 8,
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 25,
    backgroundColor: 'white',
    borderRadius: 15,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.primary,
    marginBottom: 20,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.light.primary,
    paddingBottom: 10,
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 55,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  iconImage: {
    width: 22,
    height: 22,
    marginRight: 15,
    tintColor: Colors.light.primary,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  nextButtonContainer: {
    marginTop: 30,
    marginBottom: 40,
    marginHorizontal: 20,
  },
  nextButton: {
    height: 55,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
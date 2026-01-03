import { StyleSheet, TextInput, TouchableOpacity, View, Image, ScrollView, KeyboardAvoidingView, Platform, Alert, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

export default function ProfileScreen() {
  const { isDark } = useTheme();
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
  
  // KYC states
  const [kycProfileImage, setKycProfileImage] = useState<string | null>(null);
  const [idImage, setIdImage] = useState<string | null>(null);
  const [document1, setDocument1] = useState<string | null>(null);
  const [document2, setDocument2] = useState<string | null>(null);

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

  const pickKycImage = async (type: 'profile' | 'id' | 'doc1' | 'doc2') => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to select an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      switch (type) {
        case 'profile':
          setKycProfileImage(uri);
          break;
        case 'id':
          setIdImage(uri);
          break;
        case 'doc1':
          setDocument1(uri);
          break;
        case 'doc2':
          setDocument2(uri);
          break;
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: isDark ? '#1a1a1a' : 'white', borderBottomColor: isDark ? '#333' : '#126996' }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={isDark ? 'white' : '#333'} />
        </TouchableOpacity>
        <ThemedText style={[styles.headerTitle, { color: isDark ? 'white' : '#333' }]}>Profile</ThemedText>
        <View style={styles.placeholder} />
      </View>

    <KeyboardAvoidingView 
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView 
        contentContainerStyle={[styles.scrollContainer, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
          <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
            <View style={[styles.avatar, { borderColor: isDark ? '#555' : Colors.light.primary }]}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <ThemedText style={[styles.plusIcon, { color: isDark ? '#555' : Colors.light.primary }]}>+</ThemedText>
              )}
            </View>
            <ThemedText style={[styles.galleryText, { color: isDark ? '#555' : Colors.light.primary }]}>Tap to select from gallery</ThemedText>
          </TouchableOpacity>
      
      <View style={styles.formContainer}>
        {/* Personal Information */}
        <View style={styles.sectionContainer}>
          <ThemedText style={[styles.sectionTitle, { color: isDark ? 'white' : Colors.light.primary }]}>Personal Information</ThemedText>
          
          <View style={[styles.inputContainer, { backgroundColor: isDark ? '#333' : '#f8f9fa', borderColor: isDark ? '#555' : '#e9ecef' }]}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/561/561127.png' }} 
              style={[styles.iconImage, { tintColor: isDark ? '#555' : Colors.light.primary }]} 
            />
            <TextInput
              style={[styles.input, { color: isDark ? 'white' : '#333' }]}
              placeholder="Username"
              placeholderTextColor={isDark ? '#888' : '#666'}
              value={userName}
              onChangeText={setUserName}
            />
          </View>
          
          <View style={[styles.inputContainer, { backgroundColor: isDark ? '#333' : '#f8f9fa', borderColor: isDark ? '#555' : '#e9ecef' }]}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077012.png' }} 
              style={[styles.iconImage, { tintColor: isDark ? '#555' : Colors.light.primary }]} 
            />
            <TextInput
              style={[styles.input, { color: isDark ? 'white' : '#333' }]}
              placeholder="Full Name"
              placeholderTextColor={isDark ? '#888' : '#666'}
              value={name}
              onChangeText={setName}
            />
          </View>
          
          <View style={[styles.inputContainer, { backgroundColor: isDark ? '#333' : '#f8f9fa', borderColor: isDark ? '#555' : '#e9ecef' }]}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png' }} 
              style={[styles.iconImage, { tintColor: isDark ? '#555' : Colors.light.primary }]} 
            />
            <TextInput
              style={[styles.input, { color: isDark ? 'white' : '#333' }]}
              placeholder="Gender"
              placeholderTextColor={isDark ? '#888' : '#666'}
              value={gender}
              onChangeText={setGender}
            />
          </View>
          
          <View style={[styles.inputContainer, { backgroundColor: isDark ? '#333' : '#f8f9fa', borderColor: isDark ? '#555' : '#e9ecef' }]}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2693/2693507.png' }} 
              style={[styles.iconImage, { tintColor: isDark ? '#555' : Colors.light.primary }]} 
            />
            <TextInput
              style={[styles.input, { color: isDark ? 'white' : '#333' }]}
              placeholder="Birthday (DD/MM/YYYY)"
              placeholderTextColor={isDark ? '#888' : '#666'}
              value={birthday}
              onChangeText={setBirthday}
            />
          </View>
          
          <View style={[styles.inputContainer, { backgroundColor: isDark ? '#333' : '#f8f9fa', borderColor: isDark ? '#555' : '#e9ecef' }]}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3616/3616729.png' }} 
              style={[styles.iconImage, { tintColor: isDark ? '#555' : Colors.light.primary }]} 
            />
            <TextInput
              style={[styles.input, { color: isDark ? 'white' : '#333' }]}
              placeholder="Bio / Hashtags"
              placeholderTextColor={isDark ? '#888' : '#666'}
              value={bio}
              onChangeText={setBio}
            />
          </View>
        </View>
        
        {/* Address Information */}
        <View style={styles.sectionContainer}>
          <ThemedText style={[styles.sectionTitle, { color: isDark ? 'white' : Colors.light.primary }]}>Address Information</ThemedText>
          
          <View style={[styles.inputContainer, { backgroundColor: isDark ? '#333' : '#f8f9fa', borderColor: isDark ? '#555' : '#e9ecef' }]}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/684/684908.png' }} 
              style={[styles.iconImage, { tintColor: isDark ? '#555' : Colors.light.primary }]} 
            />
            <TextInput
              style={[styles.input, { color: isDark ? 'white' : '#333' }]}
              placeholder="Address Line 1"
              placeholderTextColor={isDark ? '#888' : '#666'}
              value={addressLine1}
              onChangeText={setAddressLine1}
            />
          </View>
          
          <View style={[styles.inputContainer, { backgroundColor: isDark ? '#333' : '#f8f9fa', borderColor: isDark ? '#555' : '#e9ecef' }]}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/684/684908.png' }} 
              style={[styles.iconImage, { tintColor: isDark ? '#555' : Colors.light.primary }]} 
            />
            <TextInput
              style={[styles.input, { color: isDark ? 'white' : '#333' }]}
              placeholder="City"
              placeholderTextColor={isDark ? '#888' : '#666'}
              value={city}
              onChangeText={setCity}
            />
          </View>
          
          <View style={[styles.inputContainer, { backgroundColor: isDark ? '#333' : '#f8f9fa', borderColor: isDark ? '#555' : '#e9ecef' }]}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/684/684908.png' }} 
              style={[styles.iconImage, { tintColor: isDark ? '#555' : Colors.light.primary }]} 
            />
            <TextInput
              style={[styles.input, { color: isDark ? 'white' : '#333' }]}
              placeholder="State"
              placeholderTextColor={isDark ? '#888' : '#666'}
              value={state}
              onChangeText={setState}
            />
          </View>
          
          <View style={[styles.inputContainer, { backgroundColor: isDark ? '#333' : '#f8f9fa', borderColor: isDark ? '#555' : '#e9ecef' }]}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/684/684908.png' }} 
              style={[styles.iconImage, { tintColor: isDark ? '#555' : Colors.light.primary }]} 
            />
            <TextInput
              style={[styles.input, { color: isDark ? 'white' : '#333' }]}
              placeholder="Country"
              placeholderTextColor={isDark ? '#888' : '#666'}
              value={country}
              onChangeText={setCountry}
            />
          </View>
          
          <View style={[styles.inputContainer, { backgroundColor: isDark ? '#333' : '#f8f9fa', borderColor: isDark ? '#555' : '#e9ecef' }]}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/684/684908.png' }} 
              style={[styles.iconImage, { tintColor: isDark ? '#555' : Colors.light.primary }]} 
            />
            <TextInput
              style={[styles.input, { color: isDark ? 'white' : '#333' }]}
              placeholder="Pin Code"
              placeholderTextColor={isDark ? '#888' : '#666'}
              value={pinCode}
              onChangeText={setPinCode}
              keyboardType="numeric"
            />
          </View>
        </View>
        
        {/* Other Information */}
        <View style={styles.sectionContainer}>
          <ThemedText style={[styles.sectionTitle, { color: isDark ? 'white' : Colors.light.primary }]}>Other Information</ThemedText>
          
          <View style={[styles.inputContainer, { backgroundColor: isDark ? '#333' : '#f8f9fa', borderColor: isDark ? '#555' : '#e9ecef' }]}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/684/684908.png' }} 
              style={[styles.iconImage, { tintColor: isDark ? '#555' : Colors.light.primary }]} 
            />
            <TextInput
              style={[styles.input, { color: isDark ? 'white' : '#333' }]}
              placeholder="Location"
              placeholderTextColor={isDark ? '#888' : '#666'}
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>
        
        {/* KYC Section */}
        <View style={styles.sectionContainer}>
          <ThemedText style={[styles.sectionTitle, { color: isDark ? 'white' : Colors.light.primary }]}>KYC Verification</ThemedText>
          
          {/* Profile Photo */}
          <View style={[styles.kycSection, { backgroundColor: isDark ? '#333' : 'white', borderColor: isDark ? '#555' : '#e9ecef' }]}>
            <ThemedText style={[styles.kycSectionTitle, { color: isDark ? 'white' : '#333' }]}>Profile Photo</ThemedText>
            <TouchableOpacity 
              style={[styles.imageUpload, { borderColor: isDark ? '#555' : '#ddd' }]}
              onPress={() => pickKycImage('profile')}
            >
              {kycProfileImage ? (
                <Image source={{ uri: kycProfileImage }} style={styles.uploadedImage} />
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <Ionicons name="camera" size={30} color={isDark ? '#666' : '#999'} />
                  <ThemedText style={[styles.uploadText, { color: isDark ? '#666' : '#999' }]}>Tap to upload</ThemedText>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* ID Document */}
          <View style={[styles.kycSection, { backgroundColor: isDark ? '#333' : 'white', borderColor: isDark ? '#555' : '#e9ecef' }]}>
            <ThemedText style={[styles.kycSectionTitle, { color: isDark ? 'white' : '#333' }]}>ID Document Photo</ThemedText>
            <TouchableOpacity 
              style={[styles.imageUpload, { borderColor: isDark ? '#555' : '#ddd' }]}
              onPress={() => pickKycImage('id')}
            >
              {idImage ? (
                <Image source={{ uri: idImage }} style={styles.uploadedImage} />
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <Ionicons name="card" size={30} color={isDark ? '#666' : '#999'} />
                  <ThemedText style={[styles.uploadText, { color: isDark ? '#666' : '#999' }]}>Tap to upload ID</ThemedText>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Address Proof */}
          <View style={[styles.kycSection, { backgroundColor: isDark ? '#333' : 'white', borderColor: isDark ? '#555' : '#e9ecef' }]}>
            <ThemedText style={[styles.kycSectionTitle, { color: isDark ? 'white' : '#333' }]}>Address Proof</ThemedText>
            <TouchableOpacity 
              style={[styles.fileUpload, { borderColor: isDark ? '#555' : '#ddd', backgroundColor: isDark ? '#444' : '#f8f9fa' }]}
              onPress={() => pickKycImage('doc1')}
            >
              <Ionicons name="document" size={20} color={Colors.light.primary} />
              <ThemedText style={[styles.fileName, { color: isDark ? 'white' : '#333' }]}>
                {document1 ? 'Document uploaded' : 'Choose file'}
              </ThemedText>
              <Ionicons name="cloud-upload" size={16} color={isDark ? '#666' : '#999'} />
            </TouchableOpacity>
          </View>

          {/* Income Proof */}
          <View style={[styles.kycSection, { backgroundColor: isDark ? '#333' : 'white', borderColor: isDark ? '#555' : '#e9ecef' }]}>
            <ThemedText style={[styles.kycSectionTitle, { color: isDark ? 'white' : '#333' }]}>Income Proof</ThemedText>
            <TouchableOpacity 
              style={[styles.fileUpload, { borderColor: isDark ? '#555' : '#ddd', backgroundColor: isDark ? '#444' : '#f8f9fa' }]}
              onPress={() => pickKycImage('doc2')}
            >
              <Ionicons name="document-text" size={20} color={Colors.light.primary} />
              <ThemedText style={[styles.fileName, { color: isDark ? 'white' : '#333' }]}>
                {document2 ? 'Document uploaded' : 'Choose file'}
              </ThemedText>
              <Ionicons name="cloud-upload" size={16} color={isDark ? '#666' : '#999'} />
            </TouchableOpacity>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    borderBottomWidth: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
  },
  galleryText: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 55,
    marginBottom: 15,
    borderWidth: 1,
  },
  iconImage: {
    width: 22,
    height: 22,
    marginRight: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
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
  kycSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
  },
  kycSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageUpload: {
    height: 100,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  uploadPlaceholder: {
    alignItems: 'center',
  },
  uploadText: {
    marginTop: 5,
    fontSize: 12,
  },
  fileUpload: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    gap: 8,
  },
  fileName: {
    flex: 1,
    fontSize: 14,
  },
});
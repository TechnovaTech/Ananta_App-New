import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useTheme } from '../contexts/ThemeContext';

export default function VerificationScreen() {
  const { isDark } = useTheme();
  const [selectedDocType, setSelectedDocType] = useState('');
  const [documentImage, setDocumentImage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    documentNumber: '',
    dateOfBirth: '',
    address: '',
  });

  const documentTypes = [
    { id: 'aadhar', name: 'Aadhar Card', icon: 'card-outline' },
    { id: 'pan', name: 'PAN Card', icon: 'document-outline' },
  ];

  const pickDocument = async () => {
    if (!selectedDocType) {
      Alert.alert('Error', 'Please select document type first');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setDocumentImage(result.assets[0].uri);
    }
  };

  const submitVerification = () => {
    if (!selectedDocType || !documentImage || !formData.fullName || !formData.documentNumber) {
      Alert.alert('Error', 'Please fill all required fields and upload document');
      return;
    }
    Alert.alert('Success', 'Document submitted for verification!', [
      { text: 'OK', onPress: () => router.replace('/(tabs)/profile') }
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
      <View style={[styles.header, { backgroundColor: isDark ? '#333' : 'white', borderBottomColor: isDark ? '#555' : '#127d96' }]}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/profile')}>
          <Ionicons name="arrow-back" size={24} color={isDark ? 'white' : '#333'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? 'white' : '#333' }]}>KYC Verification</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={[styles.sectionTitle, { color: isDark ? 'white' : '#333' }]}>Select Document Type</Text>
        <View style={styles.documentTypes}>
          {documentTypes.map((doc) => (
            <TouchableOpacity
              key={doc.id}
              style={[
                styles.docTypeButton,
                selectedDocType === doc.id && styles.selectedDocType,
                { 
                  backgroundColor: selectedDocType === doc.id ? '#127d96' : (isDark ? '#444' : 'white'),
                  borderColor: isDark ? '#555' : '#127d96'
                }
              ]}
              onPress={() => setSelectedDocType(doc.id)}
            >
              <Ionicons 
                name={doc.icon} 
                size={20} 
                color={selectedDocType === doc.id ? '#fff' : (isDark ? 'white' : '#127d96')} 
              />
              <Text style={[
                styles.docTypeText,
                selectedDocType === doc.id && styles.selectedDocTypeText,
                { color: selectedDocType === doc.id ? '#fff' : (isDark ? 'white' : '#127d96') }
              ]}>
                {doc.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: isDark ? 'white' : '#333' }]}>Upload Document</Text>
        <TouchableOpacity style={[styles.uploadArea, { backgroundColor: isDark ? '#333' : 'white' }]} onPress={pickDocument}>
          {documentImage ? (
            <Image source={{ uri: documentImage }} style={styles.uploadedImage} />
          ) : (
            <View style={[styles.uploadPlaceholder, { 
              borderColor: isDark ? '#555' : '#dee2e6',
              backgroundColor: isDark ? '#444' : '#f8f9fa'
            }]}>
              <Ionicons name="cloud-upload-outline" size={40} color={isDark ? '#ccc' : '#666'} />
              <Text style={[styles.uploadText, { color: isDark ? '#ccc' : '#666' }]}>Tap to upload document</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, { color: isDark ? 'white' : '#333' }]}>Document Details</Text>
        <View style={[styles.form, { backgroundColor: isDark ? '#333' : 'white' }]}>
          <TextInput
            style={[styles.input, { 
              backgroundColor: isDark ? '#444' : '#f8f9fa',
              borderColor: isDark ? '#555' : '#dee2e6',
              color: isDark ? 'white' : '#333'
            }]}
            placeholder="Full Name *"
            placeholderTextColor={isDark ? '#888' : '#666'}
            value={formData.fullName}
            onChangeText={(text) => setFormData(prev => ({ ...prev, fullName: text }))}
          />
          
          <TextInput
            style={[styles.input, { 
              backgroundColor: isDark ? '#444' : '#f8f9fa',
              borderColor: isDark ? '#555' : '#dee2e6',
              color: isDark ? 'white' : '#333'
            }]}
            placeholder={`${selectedDocType === 'aadhar' ? 'Aadhar' : selectedDocType === 'pan' ? 'PAN' : 'License'} Number *`}
            placeholderTextColor={isDark ? '#888' : '#666'}
            value={formData.documentNumber}
            onChangeText={(text) => setFormData(prev => ({ ...prev, documentNumber: text }))}
          />
          
          <TextInput
            style={[styles.input, { 
              backgroundColor: isDark ? '#444' : '#f8f9fa',
              borderColor: isDark ? '#555' : '#dee2e6',
              color: isDark ? 'white' : '#333'
            }]}
            placeholder="Date of Birth (DD/MM/YYYY)"
            placeholderTextColor={isDark ? '#888' : '#666'}
            value={formData.dateOfBirth}
            onChangeText={(text) => setFormData(prev => ({ ...prev, dateOfBirth: text }))}
          />
          
          <TextInput
            style={[styles.input, styles.textArea, { 
              backgroundColor: isDark ? '#444' : '#f8f9fa',
              borderColor: isDark ? '#555' : '#dee2e6',
              color: isDark ? 'white' : '#333'
            }]}
            placeholder="Address"
            placeholderTextColor={isDark ? '#888' : '#666'}
            value={formData.address}
            onChangeText={(text) => setFormData(prev => ({ ...prev, address: text }))}
            multiline
            numberOfLines={3}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={submitVerification}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    borderBottomWidth: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
  },
  documentTypes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  docTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  selectedDocType: {
    backgroundColor: '#127d96',
  },
  docTypeText: {
    fontSize: 12,
    marginLeft: 5,
    fontWeight: '500',
  },
  selectedDocTypeText: {
    color: 'white',
  },
  uploadArea: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  uploadPlaceholder: {
    alignItems: 'center',
    paddingVertical: 40,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 10,
  },
  uploadText: {
    fontSize: 14,
    marginTop: 10,
  },
  uploadedImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  form: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#127d96',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
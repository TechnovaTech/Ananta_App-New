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

export default function VerificationScreen() {
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
    { id: 'license', name: 'Driving License', icon: 'car-outline' },
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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/profile')}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>KYC Verification</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Select Document Type</Text>
        <View style={styles.documentTypes}>
          {documentTypes.map((doc) => (
            <TouchableOpacity
              key={doc.id}
              style={[
                styles.docTypeButton,
                selectedDocType === doc.id && styles.selectedDocType
              ]}
              onPress={() => setSelectedDocType(doc.id)}
            >
              <Ionicons 
                name={doc.icon} 
                size={20} 
                color={selectedDocType === doc.id ? '#fff' : '#127d96'} 
              />
              <Text style={[
                styles.docTypeText,
                selectedDocType === doc.id && styles.selectedDocTypeText
              ]}>
                {doc.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Upload Document</Text>
        <TouchableOpacity style={styles.uploadArea} onPress={pickDocument}>
          {documentImage ? (
            <Image source={{ uri: documentImage }} style={styles.uploadedImage} />
          ) : (
            <View style={styles.uploadPlaceholder}>
              <Ionicons name="cloud-upload-outline" size={40} color="#666" />
              <Text style={styles.uploadText}>Tap to upload document</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Document Details</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Full Name *"
            value={formData.fullName}
            onChangeText={(text) => setFormData(prev => ({ ...prev, fullName: text }))}
          />
          
          <TextInput
            style={styles.input}
            placeholder={`${selectedDocType === 'aadhar' ? 'Aadhar' : selectedDocType === 'pan' ? 'PAN' : 'License'} Number *`}
            value={formData.documentNumber}
            onChangeText={(text) => setFormData(prev => ({ ...prev, documentNumber: text }))}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Date of Birth (DD/MM/YYYY)"
            value={formData.dateOfBirth}
            onChangeText={(text) => setFormData(prev => ({ ...prev, dateOfBirth: text }))}
          />
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Address"
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
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#127d96',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
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
    borderColor: '#127d96',
    backgroundColor: 'white',
  },
  selectedDocType: {
    backgroundColor: '#127d96',
  },
  docTypeText: {
    fontSize: 12,
    color: '#127d96',
    marginLeft: 5,
    fontWeight: '500',
  },
  selectedDocTypeText: {
    color: 'white',
  },
  uploadArea: {
    backgroundColor: 'white',
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
    borderColor: '#dee2e6',
    borderStyle: 'dashed',
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
  },
  uploadText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  uploadedImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  form: {
    backgroundColor: 'white',
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
    borderColor: '#dee2e6',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#f8f9fa',
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
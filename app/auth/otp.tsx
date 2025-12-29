import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { Inter_400Regular, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function OTPScreen() {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground 
      source={require('@/assets/images/auth-bg.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.overlay}>
            <ThemedView style={styles.content}>
          <ThemedText style={styles.title}>ANANTA</ThemedText>
          <ThemedText style={styles.subtitle}>Enter OTP</ThemedText>
          <ThemedText style={styles.description}>
            Enter The OTP Send To{'\n'}XXXXX XXXXX
          </ThemedText>
          
          <View style={styles.otpContainer}>
            {[0,1,2,3,4].map((index) => (
              <TextInput
                key={index}
                ref={(ref) => { inputRefs.current[index] = ref; }}
                style={styles.otpInput}
                maxLength={1}
                keyboardType="numeric"
                value={otp[index]}
                onChangeText={(value) => handleOtpChange(value, index)}
                selectionColor="#127D96"
              />
            ))}
          </View>
          
          <TouchableOpacity 
            style={styles.verifyButtonContainer}
            onPress={() => router.push('/auth/profile')}
          >
            <LinearGradient
              colors={[Colors.light.primary, Colors.light.primaryDark]}
              style={styles.verifyButton}
            >
              <ThemedText style={styles.buttonText}>Verify</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
            </ThemedView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: 20,
    minHeight: '100%',
  },
  content: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 12,
    marginBottom: 20,
    fontFamily: 'Inter_700Bold',
    lineHeight: 60,
    textAlign: 'center',
    paddingTop: 10,
  },
  subtitle: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
    fontFamily: 'Inter_700Bold',
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'Inter_400Regular',
  },
  otpContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 40,
  },
  otpInput: {
    width: 50,
    height: 50,
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
  },
  verifyButtonContainer: {
    width: '100%',
  },
  verifyButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter_700Bold',
  },
});
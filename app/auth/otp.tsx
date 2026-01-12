import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { Inter_400Regular, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, StatusBar, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function OTPScreen() {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [termsAccepted, setTermsAccepted] = useState(false);
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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LinearGradient
        colors={['#127d96', '#0a5d75', '#083d4f']}
        style={styles.gradient}
      >
        <View style={styles.backgroundShapes}>
          <View style={[styles.shape, styles.shape1]} />
          <View style={[styles.shape, styles.shape2]} />
          <View style={[styles.shape, styles.shape3]} />
          <View style={[styles.shape, styles.shape4]} />
          <View style={[styles.shape, styles.shape5]} />
        </View>
        <KeyboardAvoidingView 
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.content}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Ionicons name="diamond" size={40} color="white" />
              </View>
              <ThemedText style={styles.title}>ANANTA</ThemedText>
              {/* <ThemedText style={styles.subtitle}>Enter OTP</ThemedText> */}
              <ThemedText style={styles.description}>
                Enter the OTP sent to{"\n"}+91 XXXXX XXXXX
              </ThemedText>
            </View>
            
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
            
            <TouchableOpacity style={styles.termsContainer} onPress={() => setTermsAccepted(!termsAccepted)}>
              <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
                {termsAccepted && <Ionicons name="checkmark" size={16} color="white" />}
              </View>
              <ThemedText style={styles.termsText}>
                I agree to the <ThemedText style={styles.termsLink}>Terms & Conditions</ThemedText>
              </ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.verifyButtonContainer, !termsAccepted && styles.disabledButton]}
              onPress={() => termsAccepted && router.push('/auth/profile')}
              disabled={!termsAccepted}
            >
              <LinearGradient
                colors={termsAccepted ? ['#127d96', '#15a3c7'] : ['#666', '#888']}
                style={styles.verifyButton}
              >
                <ThemedText style={styles.buttonText}>Verify OTP</ThemedText>
                <Ionicons name="checkmark-circle" size={20} color="white" style={styles.buttonIcon} />
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.resendContainer}>
              <ThemedText style={styles.resendText}>Didn't receive OTP? </ThemedText>
              <ThemedText style={styles.resendLink}>Resend</ThemedText>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  backgroundShapes: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  shape: {
    position: 'absolute',
    borderRadius: 50,
    opacity: 0.1,
  },
  shape1: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    top: -50,
    right: -50,
    borderRadius: 100,
  },
  shape2: {
    width: 150,
    height: 150,
    backgroundColor: '#fff',
    bottom: 100,
    left: -30,
    borderRadius: 75,
  },
  shape3: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    top: 150,
    left: 50,
    borderRadius: 50,
  },
  shape4: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    bottom: 300,
    right: 30,
    borderRadius: 40,
  },
  shape5: {
    width: 120,
    height: 120,
    backgroundColor: '#fff',
    top: 300,
    right: -20,
    borderRadius: 60,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.08,
    paddingVertical: height * 0.02,
  },
  backButton: {
    position: 'absolute',
    top: height * 0.06,
    left: width * 0.05,
    padding: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  logoCircle: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  title: {
    fontSize: width * 0.09,
    fontWeight: '700',
    color: 'white',
    letterSpacing: width * 0.02,
    marginBottom: height * 0.03,
    fontFamily: 'Inter_700Bold',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: width * 0.06,
    color: 'white',
    marginBottom: height * 0.01,
    fontFamily: 'Inter_700Bold',
  },
  description: {
    fontSize: width * 0.04,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: height * 0.03,
    fontFamily: 'Inter_400Regular',
    lineHeight: width * 0.06,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: height * 0.03,
  },
  otpInput: {
    width: width * 0.12,
    height: width * 0.12,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  verifyButtonContainer: {
    width: '100%',
    marginBottom: height * 0.02,
  },
  verifyButton: {
    height: height * 0.065,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.045,
    fontWeight: '600',
    fontFamily: 'Inter_700Bold',
  },
  buttonIcon: {
    marginLeft: width * 0.025,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resendText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: width * 0.035,
    fontFamily: 'Inter_400Regular',
  },
  resendLink: {
    color: 'white',
    fontSize: width * 0.035,
    fontWeight: '600',
    fontFamily: 'Inter_700Bold',
    textDecorationLine: 'underline',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.02,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.8)',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#127d96',
    borderColor: '#127d96',
  },
  termsText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: width * 0.035,
    fontFamily: 'Inter_400Regular',
    flex: 1,
  },
  termsLink: {
    color: 'white',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  disabledButton: {
    opacity: 0.6,
  },
});
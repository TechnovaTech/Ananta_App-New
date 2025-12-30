import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { Inter_400Regular, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Alert, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, StatusBar, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  const handleGoogleSignIn = () => {
    Alert.alert(
      'Google Sign In',
      'Choose your Google account',
      [
        {
          text: 'user@gmail.com',
          onPress: () => {
            Alert.alert('Success', 'Signed in successfully!', [
              { text: 'OK', onPress: () => router.push('/(tabs)') }
            ]);
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
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
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Ionicons name="diamond" size={40} color="white" />
              </View>
              <ThemedText style={styles.title}>ANANTA</ThemedText>
              <ThemedText style={styles.subtitle}>Welcome Back!</ThemedText>
            </View>
            
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Ionicons name="call-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#666"
                  keyboardType="phone-pad"
                />
              </View>
              
              <TouchableOpacity 
                style={styles.otpButtonContainer}
                onPress={() => router.push('/auth/otp')}
              >
                <LinearGradient
                  colors={['#127d96', '#0a5d75']}
                  style={styles.otpButton}
                >
                  <ThemedText style={styles.buttonText}>Get OTP</ThemedText>
                  <Ionicons name="arrow-forward" size={20} color="white" style={styles.buttonIcon} />
                </LinearGradient>
              </TouchableOpacity>
              
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <ThemedText style={styles.orText}>OR</ThemedText>
                <View style={styles.dividerLine} />
              </View>
              
              <TouchableOpacity 
                style={styles.googleButton}
                onPress={handleGoogleSignIn}
              >
                <Image 
                  source={require('@/assets/images/Google-icon.png')}
                  style={styles.googleIcon}
                />
                <ThemedText style={styles.googleText}>Continue with Google</ThemedText>
              </TouchableOpacity>
            </View>
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
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  title: {
    fontSize: width * 0.09,
    fontWeight: '700',
    color: 'white',
    letterSpacing: width * 0.02,
    marginBottom: height * 0.01,
    fontFamily: 'Inter_700Bold',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputIcon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
    height: height * 0.065,
    fontSize: width * 0.04,
    fontFamily: 'Inter_400Regular',
    color: '#333',
  },
  otpButtonContainer: {
    width: '100%',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  otpButton: {
    height: height * 0.065,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter_700Bold',
  },
  buttonIcon: {
    marginLeft: 10,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  orText: {
    color: 'white',
    fontSize: 14,
    marginHorizontal: 20,
    fontFamily: 'Inter_400Regular',
  },
  googleButton: {
    width: '100%',
    height: height * 0.065,
    backgroundColor: 'white',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter_400Regular',
  },
});
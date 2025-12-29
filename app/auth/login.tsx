import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { Inter_400Regular, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Alert, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

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
          <ThemedText style={styles.subtitle}>Welcome To Ananta</ThemedText>
          
          <TextInput
            style={styles.input}
            placeholder="+91 | Enter Contact Number"
            placeholderTextColor="#666"
            keyboardType="phone-pad"
          />
          
          <TouchableOpacity 
            style={styles.otpButtonContainer}
            onPress={() => router.push('/auth/otp')}
          >
            <LinearGradient
              colors={[Colors.light.primary, Colors.light.primaryDark]}
              style={styles.otpButton}
            >
              <ThemedText style={styles.buttonText}>Get OTP</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
          
          <ThemedText style={styles.orText}>OR</ThemedText>
          
          <TouchableOpacity 
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
          >
            <View style={styles.googleContent}>
              <Image 
                source={require('@/assets/images/Google-icon.png')}
                style={styles.googleIcon}
              />
              <ThemedText style={styles.googleText}>Sign in with Google</ThemedText>
            </View>
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
    fontSize: 16,
    color: 'white',
    marginBottom: 60,
    fontFamily: 'Inter_400Regular',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#E5E5E5',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#333',
  },
  otpButtonContainer: {
    width: '100%',
    marginBottom: 30,
  },
  otpButton: {
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
  orText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
    fontFamily: 'Inter_400Regular',
  },
  googleButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter_400Regular',
  },
});
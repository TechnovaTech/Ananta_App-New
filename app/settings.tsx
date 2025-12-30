import { StyleSheet, ScrollView, TouchableOpacity, View, Dimensions, Text } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

const BackIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const ClockIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="#127D96"/>
  </Svg>
);

const HelpIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 19H11V17H13V19ZM15.07 11.25L14.17 12.17C13.45 12.9 13 13.5 13 15H11V14.5C11 13.4 11.45 12.4 12.17 11.67L13.41 10.41C13.78 10.05 14 9.55 14 9C14 7.9 13.1 7 12 7C10.9 7 10 7.9 10 9H8C8 6.79 9.79 5 12 5C14.21 5 16 6.79 16 9C16 9.88 15.64 10.68 15.07 11.25Z" fill="#127D96"/>
  </Svg>
);

const LevelIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M3 13H5V18H3V13ZM7 9H9V18H7V9ZM11 5H13V18H11V5ZM15 8H17V18H15V8ZM19 11H21V18H19V11Z" fill="#127D96"/>
  </Svg>
);

const TaskIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17 12H7V10H17V12ZM14 16H7V14H14V16ZM17 8H7V6H17V8Z" fill="#127D96"/>
  </Svg>
);

const AdminIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#127D96"/>
  </Svg>
);

const FrameIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M9 11H7V9H9V11ZM13 11H11V9H13V11ZM17 11H15V9H17V11ZM19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20Z" fill="#127D96"/>
  </Svg>
);

const BackpackIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M20 8V6C20 4.9 19.1 4 18 4H17C17 2.9 16.1 2 15 2H9C7.9 2 7 2.9 7 4H6C4.9 4 4 4.9 4 6V8C4 9.1 4.9 10 6 10V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V10C19.1 10 20 9.1 20 8ZM9 4H15V6H9V4ZM16 19H8V10H16V19Z" fill="#127D96"/>
  </Svg>
);

const SettingsIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.68 19.18 11.36 19.13 11.06L21.16 9.48C21.34 9.34 21.39 9.07 21.28 8.87L19.36 5.55C19.24 5.33 18.99 5.26 18.77 5.33L16.38 6.29C15.88 5.91 15.35 5.59 14.76 5.35L14.4 2.81C14.36 2.57 14.16 2.4 13.92 2.4H10.08C9.84 2.4 9.65 2.57 9.61 2.81L9.25 5.35C8.66 5.59 8.12 5.92 7.63 6.29L5.24 5.33C5.02 5.25 4.77 5.33 4.65 5.55L2.74 8.87C2.62 9.08 2.66 9.34 2.86 9.48L4.89 11.06C4.84 11.36 4.8 11.69 4.8 12C4.8 12.31 4.82 12.64 4.87 12.94L2.84 14.52C2.66 14.66 2.61 14.93 2.72 15.13L4.64 18.45C4.76 18.67 5.01 18.74 5.23 18.67L7.62 17.71C8.12 18.09 8.65 18.41 9.24 18.65L9.6 21.19C9.64 21.43 9.84 21.6 10.08 21.6H13.92C14.16 21.6 14.35 21.43 14.39 21.19L14.75 18.65C15.34 18.41 15.88 18.09 16.37 17.71L18.76 18.67C18.98 18.75 19.23 18.67 19.35 18.45L21.27 15.13C21.39 14.92 21.34 14.66 21.14 14.52L19.14 12.94ZM12 15.6C10.02 15.6 8.4 13.98 8.4 12C8.4 10.02 10.02 8.4 12 8.4C13.98 8.4 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z" fill="#127D96"/>
  </Svg>
);

const GiftIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M20 6H16.25C16.25 4.21 14.79 2.75 13 2.75C11.21 2.75 9.75 4.21 9.75 6H4C2.9 6 2 6.9 2 8V10C2 10.55 2.45 11 3 11H4V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V11H21C21.55 11 22 10.55 22 10V8C22 6.9 21.1 6 20 6ZM11.5 6C11.5 5.17 12.17 4.5 13 4.5C13.83 4.5 14.5 5.17 14.5 6H11.5ZM18 19H6V11H11V13H13V11H18V19Z" fill="#127D96"/>
  </Svg>
);

const LogoutIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="#127D96"/>
  </Svg>
);

export default function SettingsScreen() {
  const settingsItems = [
    { id: 2, title: 'Help & Feedback', icon: <HelpIcon /> },
    { id: 3, title: 'Level', icon: <LevelIcon /> },
    { id: 4, title: 'Daily tasks', icon: <TaskIcon /> },
    { id: 5, title: 'Room admin', icon: <AdminIcon /> },
    { id: 6, title: 'Entries & Fremes', icon: <FrameIcon /> },
    { id: 7, title: 'Invitation Rewards', icon: <GiftIcon /> },
    { id: 8, title: 'Logout', icon: <LogoutIcon /> },
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/(tabs)')}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingsItems.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.settingItem}
            onPress={() => {
              if (item.title === 'Help & Feedback') {
                router.push('/help-feedback');
              } else if (item.title === 'Level') {
                router.push('/level-management');
              } else if (item.title === 'Daily tasks') {
                router.push('/daily-tasks');
              } else if (item.title === 'Room admin') {
                router.push('/room-admin');
              } else if (item.title === 'Entries & Fremes') {
                router.push('/entries-frames');
              } else if (item.title === 'Back Pack') {
                router.push('/back-pack');
              } else if (item.title === 'Logout') {
                router.replace('/auth/login');
              } else if (item.title === 'Invitation Rewards') {
                router.push('/invitation-rewards');
              }
            }}
          >
            <View style={styles.iconContainer}>
              {item.icon}
            </View>
            <ThemedText style={styles.settingText}>{item.title}</ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#127d96',
  },
  backButton: {
    padding: 5,
  },
  placeholder: {
    width: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  iconContainer: {
    marginRight: 16,
  },
  settingText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
});
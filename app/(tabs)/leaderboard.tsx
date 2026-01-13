import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

const BackIcon = ({ isDark }: { isDark: boolean }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M15 18L9 12L15 6" stroke={isDark ? "white" : "black"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export default function LeaderboardScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('earning');
  const [timeFilter, setTimeFilter] = useState('today');

  const earningData = [
    { id: 1, name: 'Rachel James', location: 'Jamnagar, Gujarat, India', coins: 30600, rank: 1, color: '#D4AF37' },
    { id: 2, name: 'Micale clarke', location: 'Gujarat, India', coins: 29000, rank: 2, color: '#C0C0C0' },
    { id: 3, name: 'Sergio martin', location: 'Ahmedabad, Gujarat, India', coins: 24893, rank: 3, color: '#CD7F32' },
    { id: 4, name: 'John Doe', location: 'Mumbai, India', coins: 22000, rank: 4, color: '#D4AF37' },
    { id: 5, name: 'Jane Smith', location: 'Delhi, India', coins: 20000, rank: 5, color: '#D4AF37' },
    { id: 6, name: 'Mike Wilson', location: 'Pune, India', coins: 18000, rank: 6, color: '#D4AF37' },
  ];

  const liveData = [
    { id: 1, name: 'Alex Johnson', location: 'Bangalore, India', coins: 35000, rank: 1, color: '#D4AF37' },
    { id: 2, name: 'Sarah Connor', location: 'Chennai, India', coins: 32000, rank: 2, color: '#C0C0C0' },
    { id: 3, name: 'David Brown', location: 'Hyderabad, India', coins: 28000, rank: 3, color: '#CD7F32' },
    { id: 4, name: 'Emma Davis', location: 'Kolkata, India', coins: 25000, rank: 4, color: '#D4AF37' },
    { id: 5, name: 'Chris Evans', location: 'Surat, India', coins: 23000, rank: 5, color: '#D4AF37' },
    { id: 6, name: 'Lisa Anderson', location: 'Jaipur, India', coins: 21000, rank: 6, color: '#D4AF37' },
  ];

  const messageData = [
    { id: 1, name: 'Maria Garcia', location: 'Rajkot, Gujarat, India', coins: 28500, rank: 1, color: '#D4AF37', messages: 1250, lastMessage: 'Good morning! Ready for today\'s meeting?' },
    { id: 2, name: 'Tom Wilson', location: 'Vadodara, India', coins: 26000, rank: 2, color: '#C0C0C0', messages: 1180, lastMessage: 'Can we reschedule today\'s call?' },
    { id: 3, name: 'Anna Smith', location: 'Surat, Gujarat, India', coins: 23500, rank: 3, color: '#CD7F32', messages: 1050, lastMessage: 'Today\'s presentation went great!' },
    { id: 4, name: 'Peter Jones', location: 'Gandhinagar, India', coins: 21000, rank: 4, color: '#D4AF37', messages: 980, lastMessage: 'Let\'s catch up later today' },
    { id: 5, name: 'Lucy Brown', location: 'Bhavnagar, India', coins: 19500, rank: 5, color: '#D4AF37', messages: 890, lastMessage: 'Happy to help with today\'s project' },
    { id: 6, name: 'Mark Davis', location: 'Anand, India', coins: 17800, rank: 6, color: '#D4AF37', messages: 820, lastMessage: 'Today\'s weather is perfect for a walk' },
  ];

  const getCurrentData = () => {
    switch(activeTab) {
      case 'earning': return earningData;
      case 'live': return liveData;
      default: return earningData;
    }
  };

  const currentData = getCurrentData();

  const avatars = [
    require('@/assets/images/h1.png.png'),
    require('@/assets/images/h2.png.png'),
    require('@/assets/images/h3.png.png'),
    require('@/assets/images/h4.png.png'),
  ];

  return (
    <ThemedView style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : 'white' }]}>
      <View style={[styles.header, { backgroundColor: isDark ? '#1a1a1a' : 'white' }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <BackIcon isDark={isDark} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <ThemedText style={[styles.title, { color: isDark ? 'white' : 'black' }]}>Leaderboard</ThemedText>
          <View style={styles.titleUnderline} />
        </View>
      </View>

      {/* Main Navigation - Earning/Live */}
      <View style={[styles.mainNavContainer, { backgroundColor: isDark ? '#1a1a1a' : 'white', borderBottomColor: isDark ? '#333' : '#f0f0f0' }]}>
        <TouchableOpacity 
          style={[styles.mainNavTab, activeTab === 'earning' && styles.activeMainNav]}
          onPress={() => setActiveTab('earning')}
        >
          <ThemedText style={[styles.mainNavText, { color: isDark ? '#ccc' : '#666' }, activeTab === 'earning' && styles.activeMainNavText]}>Earning</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.mainNavTab, activeTab === 'live' && styles.activeMainNav]}
          onPress={() => setActiveTab('live')}
        >
          <ThemedText style={[styles.mainNavText, { color: isDark ? '#ccc' : '#666' }, activeTab === 'live' && styles.activeMainNavText]}>Live</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Time Filter */}
      <View style={[styles.filterContainer, { backgroundColor: isDark ? '#333' : '#f8f9fa' }]}>
        <TouchableOpacity 
          style={[styles.filterButton, timeFilter === 'today' && styles.activeFilter]}
          onPress={() => setTimeFilter('today')}
        >
          <ThemedText style={[styles.filterText, { color: isDark ? '#ccc' : '#666' }, timeFilter === 'today' && styles.activeFilterText]}>Today</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, timeFilter === 'weekly' && styles.activeFilter]}
          onPress={() => setTimeFilter('weekly')}
        >
          <ThemedText style={[styles.filterText, { color: isDark ? '#ccc' : '#666' }, timeFilter === 'weekly' && styles.activeFilterText]}>Weekly</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, timeFilter === 'monthly' && styles.activeFilter]}
          onPress={() => setTimeFilter('monthly')}
        >
          <ThemedText style={[styles.filterText, { color: isDark ? '#ccc' : '#666' }, timeFilter === 'monthly' && styles.activeFilterText]}>Monthly</ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {currentData.map((user, index) => (
          <View key={user.id} style={styles.userCard}>
            {user.rank <= 3 ? (
              <LinearGradient
                colors={[user.color, `${user.color}80`]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientCard}
              >
                  <View style={styles.leftRankSection}>
                    <ThemedText style={styles.leftRankNumber}>{user.rank}</ThemedText>
                  </View>
                  <Image source={avatars[index]} style={styles.userImage} />
                  <View style={styles.userInfo}>
                    <ThemedText style={styles.userName}>@{user.name}</ThemedText>
                    <ThemedText style={styles.userLocation}>{user.location}</ThemedText>
                    <View style={styles.coinBadge}>
                      <View style={styles.coinIcon}>
                        <ThemedText style={styles.dollarSign}>$</ThemedText>
                      </View>
                      <ThemedText style={styles.coinAmount}>{user.coins}</ThemedText>
                    </View>
                  </View>
                  <View style={styles.rightSection}>
                    <View style={styles.trophySection}>
                      <View style={styles.trophyContainer}>
                        <ThemedText style={styles.trophyIcon}>🏆</ThemedText>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              ) : (
                <View style={[styles.solidCard, { backgroundColor: user.color }]}>
                  <Image source={avatars[index]} style={styles.userImage} />
                  <View style={styles.userInfo}>
                    <ThemedText style={styles.userName}>@{user.name}</ThemedText>
                    <ThemedText style={styles.userLocation}>{user.location}</ThemedText>
                    <View style={styles.coinBadge}>
                      <View style={styles.coinIcon}>
                        <ThemedText style={styles.dollarSign}>$</ThemedText>
                      </View>
                      <ThemedText style={styles.coinAmount}>{user.coins}</ThemedText>
                    </View>
                  </View>
                  <View style={styles.rightSection}>
                    <View style={styles.trophySection}>
                      <View style={styles.trophyContainer}>
                        <ThemedText style={styles.trophyIcon}>🏆</ThemedText>
                      </View>
                    </View>
                  </View>
                </View>
              )}
          </View>
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
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  backButton: {
    marginRight: 20,
    padding: 5,
  },
  titleContainer: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 3,
    marginTop: 15,
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 17,
  },
  activeFilter: {
    backgroundColor: Colors.light.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeFilterText: {
    color: 'white',
  },
  mainNavContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  mainNavTab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeMainNav: {
    borderBottomColor: Colors.light.primary,
  },
  mainNavText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
  activeMainNavText: {
    color: Colors.light.primary,
  },
  titleUnderline: {
    width: 80,
    height: 2,
    backgroundColor: Colors.light.primary,
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    marginHorizontal: 20,
    borderRadius: 25,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: Colors.light.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userCard: {
    borderRadius: 15,
    marginBottom: 12,
    position: 'relative',
    overflow: 'visible',
    minHeight: 100,
    marginTop: 15,
  },
  gradientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    position: 'relative',
  },
  solidCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    position: 'relative',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  userLocation: {
    fontSize: 12,
    color: 'white',
    opacity: 0.9,
    marginBottom: 8,
  },
  coinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC107',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  coinIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  dollarSign: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 20,
  },
  coinAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  leftRankSection: {
    position: 'absolute',
    left: -10,
    top: -10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leftRankNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#127d96',
  },
  rightSection: {
    position: 'relative',
    width: 120,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 80,
    fontWeight: '900',
    color: 'rgba(255,255,255,0.4)',
    position: 'absolute',
    right: 10,
    top: -5,
    zIndex: 1,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  trophySection: {
    position: 'absolute',
    right: 15,
    bottom: 10,
    zIndex: 3,
    alignItems: 'center',
  },
  rankBadge: {
    position: 'absolute',
    right: 5,
    top: 5,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    borderWidth: 2,
    borderColor: '#127d96',
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#127d96',
  },
  trophyContainer: {
    backgroundColor: '#127d96',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  trophyIcon: {
    fontSize: 30,
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  star: {
    fontSize: 12,
    color: '#FF6B35',
    marginHorizontal: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  messageAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  messageInfo: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  messageUserName: {
    fontSize: 16,
    fontWeight: '600',
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  unreadBadge: {
    backgroundColor: '#127d96',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
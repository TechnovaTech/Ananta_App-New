import { StyleSheet, ScrollView, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

const BackIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export default function LeaderboardScreen() {
  const leaderboardData = [
    { id: 1, name: 'Rachel James', location: 'Jamnagar, Gujarat, India', coins: 30600, rank: 1, color: '#D4AF37' },
    { id: 2, name: 'Micale clarke', location: 'Gujarat, India', coins: 29000, rank: 2, color: '#C0C0C0' },
    { id: 3, name: 'Sergio martin', location: 'Ahmedabad, Gujarat, India', coins: 24893, rank: 3, color: '#CD7F32' },
    { id: 4, name: 'Sergio martin', location: 'Ahmedabad, Gujarat, India', coins: 24893, rank: 4, color: '#D4AF37' },
    { id: 5, name: 'Micale clarke', location: 'Gujarat, India', coins: 29000, rank: 5, color: '#D4AF37' },
    { id: 6, name: 'Micale clarke', location: 'Gujarat, India', coins: 29000, rank: 6, color: '#D4AF37' },
  ];

  const avatars = [
    require('@/assets/images/h1.png.png'),
    require('@/assets/images/h2.png.png'),
    require('@/assets/images/h3.png.png'),
    require('@/assets/images/h4.png.png'),
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <BackIcon />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <ThemedText style={styles.title}>Leaderboard</ThemedText>
          <View style={styles.titleUnderline} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {leaderboardData.slice(0, 3).map((user, index) => (
          <View key={user.id} style={[styles.userCard, { backgroundColor: user.color }]}>
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
              <View style={[styles.rankBadge, { backgroundColor: '#FFD700' }]}>
                <ThemedText style={styles.rankText}>{user.rank}</ThemedText>
              </View>
              <View style={styles.trophySection}>
                <View style={styles.trophyContainer}>
                  <ThemedText style={styles.trophyIcon}>🏆</ThemedText>
                </View>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.divider} />

        {leaderboardData.slice(3).map((user, index) => (
          <View key={user.id} style={[styles.userCard, { backgroundColor: user.color }]}>
            <Image source={avatars[(index + 1) % avatars.length]} style={styles.userImage} />
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
  titleUnderline: {
    width: 80,
    height: 2,
    backgroundColor: Colors.light.primary,
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    marginBottom: 12,
    position: 'relative',
    overflow: 'hidden',
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
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  dollarSign: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  coinAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  rightSection: {
    position: 'relative',
    width: 60,
    height: 60,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: 15,
  },
  rankNumber: {
    fontSize: 48,
    fontWeight: '900',
    color: 'rgba(255,255,255,0.4)',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  trophySection: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    zIndex: 2,
    alignItems: 'center',
  },
  rankBadge: {
    position: 'absolute',
    right: 5,
    top: 5,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  rankText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  trophyContainer: {
    backgroundColor: '#127d96',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trophyIcon: {
    fontSize: 20,
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  star: {
    fontSize: 8,
    color: '#FFD700',
    marginHorizontal: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
});
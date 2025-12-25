import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const bannerImages = [
    require('@/assets/images/xvv 1.png'),
    require('@/assets/images/h1.png.png'),
    require('@/assets/images/h2.png.png'),
    require('@/assets/images/h3.png.png'),
  ];

  const videos = [
    { id: 1, title: '#joy with life partner', user: 'Rachel James', location: 'India', views: '23K', image: require('@/assets/images/h1.png.png') },
    { id: 2, title: '#Alone Life', user: 'Micale Johans', location: 'India', views: '26B', image: require('@/assets/images/h2.png.png') },
    { id: 3, title: '#Smile can win', user: 'Dwayen jack', location: 'U.S.A', views: '23K', image: require('@/assets/images/h3.png.png') },
    { id: 4, title: '#Fashion adda', user: 'Jenny styler', location: 'Spain', views: '26B', image: require('@/assets/images/h4.png.png') },
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Ananta</ThemedText>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <ThemedText style={[styles.icon, {color: '#127D96'}]}>🔍</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <ThemedText style={[styles.icon, {color: '#127D96'}]}>⚙️</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <ThemedText style={[styles.icon, {color: '#127D96'}]}>🔔</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <ThemedText style={styles.activeTabText}>Video Live</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <ThemedText style={styles.tabText}>Audio Live</ThemedText>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled style={styles.bannerContainer}>
          {bannerImages.map((image, index) => (
            <View key={index} style={styles.featuredVideo}>
              <Image source={image} style={styles.featuredImage} />
              <TouchableOpacity style={styles.playButton}>
                <Image source={require('@/assets/images/Group.png')} style={styles.playButtonImage} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        
        <View style={styles.videoGrid}>
          {videos.map((video, index) => (
            <View key={video.id} style={styles.videoCard}>
              <Image source={video.image} style={styles.videoImage} />
              <View style={styles.videoOverlay}>
                <View style={styles.viewCount}>
                  <ThemedText style={styles.viewText}>👁 {video.views}</ThemedText>
                </View>
                <View style={styles.videoInfo}>
                  <ThemedText style={styles.videoTitle}>{video.title}</ThemedText>
                  <View style={styles.userInfo}>
                    <Image source={video.image} style={styles.userAvatar} />
                    <View>
                      <ThemedText style={styles.userName}>{video.user}</ThemedText>
                      <ThemedText style={styles.userLocation}>{video.location}</ThemedText>
                    </View>
                    <TouchableOpacity style={styles.followButton}>
                      <ThemedText style={styles.followText}>Follow</ThemedText>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E2E2',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  iconButton: {
    padding: 5,
  },
  icon: {
    fontSize: 20,
    color: '#127D96',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginRight: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.light.primary,
  },
  activeTabText: {
    color: Colors.light.primary,
    fontWeight: '600',
  },
  tabText: {
    color: '#666',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bannerContainer: {
    marginBottom: 20,
  },
  featuredVideo: {
    width: width - 40,
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 15,
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 24,
    marginLeft: 3,
  },
  playButtonImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  videoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  videoCard: {
    width: '47%',
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  videoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  videoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
  },
  viewCount: {
    position: 'absolute',
    top: -180,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  viewText: {
    color: 'white',
    fontSize: 12,
  },
  videoInfo: {
    gap: 5,
  },
  videoTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  userName: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  userLocation: {
    color: 'white',
    fontSize: 8,
  },
  followButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 'auto',
  },
  followText: {
    color: 'white',
    fontSize: 10,
  },
});
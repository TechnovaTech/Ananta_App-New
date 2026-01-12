import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

const SearchIcon = ({ color, isDark }: { color: string; isDark?: boolean }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke={isDark ? '#127D96' : color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const SettingsIcon = ({ color, isDark }: { color: string; isDark?: boolean }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke={isDark ? '#127D96' : color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.2569 9.77251 19.9859C9.5799 19.7148 9.31074 19.5067 9 19.385C8.69838 19.2522 8.36381 19.2125 8.03941 19.2713C7.71502 19.3301 7.41568 19.4848 7.18 19.715L7.12 19.775C6.93425 19.961 6.71368 20.1085 6.47088 20.2091C6.22808 20.3098 5.96783 20.3616 5.705 20.3616C5.44217 20.3616 5.18192 20.3098 4.93912 20.2091C4.69632 20.1085 4.47575 19.961 4.29 19.775C4.10405 19.5893 3.95653 19.3687 3.85588 19.1259C3.75523 18.8831 3.70343 18.6228 3.70343 18.36C3.70343 18.0972 3.75523 17.8369 3.85588 17.5941C3.95653 17.3513 4.10405 17.1307 4.29 16.945L4.35 16.885C4.58054 16.6493 4.73519 16.35 4.794 16.0256C4.85282 15.7012 4.81312 15.3666 4.68 15.065C4.55324 14.7692 4.34276 14.517 4.07447 14.3393C3.80618 14.1616 3.49179 14.0663 3.17 14.065H3C2.46957 14.065 1.96086 13.8543 1.58579 13.4792C1.21071 13.1041 1 12.5954 1 12.065C1 11.5346 1.21071 11.0259 1.58579 10.6508C1.96086 10.2757 2.46957 10.065 3 10.065H3.09C3.42099 10.0573 3.742 9.95012 4.01309 9.75751C4.28417 9.5649 4.49226 9.29574 4.614 8.985C4.74676 8.68338 4.78646 8.34881 4.72765 8.02441C4.66883 7.70002 4.51418 7.40068 4.284 7.165L4.224 7.105C4.03805 6.91925 3.89053 6.69868 3.78988 6.45588C3.68923 6.21308 3.63743 5.95283 3.63743 5.69C3.63743 5.42717 3.68923 5.16692 3.78988 4.92412C3.89053 4.68132 4.03805 4.46075 4.224 4.275C4.40975 4.08905 4.63032 3.94153 4.87312 3.84088C5.11592 3.74023 5.37617 3.68843 5.639 3.68843C5.90183 3.68843 6.16208 3.74023 6.40488 3.84088C6.64768 3.94153 6.86825 4.08905 7.054 4.275L7.114 4.335C7.34968 4.56554 7.649 4.72019 7.97339 4.779C8.29779 4.83782 8.63236 4.79812 8.934 4.665H9C9.29577 4.53824 9.54802 4.32776 9.72569 4.05947C9.90337 3.79118 9.99872 3.47679 10 3.155V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.635 19.206 7.95939C19.1472 8.28379 19.1869 8.61836 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke={isDark ? '#127D96' : color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const BellIcon = ({ color, isDark }: { color: string; isDark?: boolean }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke={isDark ? '#127D96' : color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke={isDark ? '#127D96' : color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const WalletIcon = ({ color, isDark }: { color: string; isDark?: boolean }) => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path d="M17 9V7C17 5.89543 16.1046 5 15 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V11C21 9.89543 20.1046 9 19 9H17Z" stroke={isDark ? '#FF6B35' : color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M17 9H19C20.1046 9 21 9.89543 21 11V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5H15C16.1046 5 17 5.89543 17 7V9Z" stroke={isDark ? '#FF6B35' : color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Circle cx="18" cy="14" r="1" fill={isDark ? '#FF6B35' : color}/>
  </Svg>
);

export default function HomeScreen() {
  const { isDark } = useTheme();
  const [followedUsers, setFollowedUsers] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'video' | 'audio'>('video');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [currentLeftCardIndex, setCurrentLeftCardIndex] = useState(0);
  const bannerScrollRef = useRef<ScrollView>(null);

  const handleFollow = (userId: number) => {
    setFollowedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };
  
  const bannerImages = [
    require('@/assets/images/xvv 1.png'),
    require('@/assets/images/h1.png.png'),
    require('@/assets/images/h2.png.png'),
    require('@/assets/images/h3.png.png'),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % bannerImages.length;
        bannerScrollRef.current?.scrollTo({
          x: nextIndex * width,
          animated: true,
        });
        return nextIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const videos = [
    { id: 1, title: '#joy with life partner', user: 'Rachel James', location: 'India', views: '23K', image: require('@/assets/images/h1.png.png') },
    { id: 2, title: '#Alone Life', user: 'Micale Johans', location: 'India', views: '26B', image: require('@/assets/images/h2.png.png') },
    { id: 3, title: '#Smile can win', user: 'Dwayen jack', location: 'U.S.A', views: '23K', image: require('@/assets/images/h3.png.png') },
    { id: 4, title: '#Fashion adda', user: 'Jenny styler', location: 'Spain', views: '26B', image: require('@/assets/images/h4.png.png') },
    { id: 5, title: '#New Star', user: 'Michel Saray', location: 'USA', views: '802', image: require('@/assets/images/h1.png.png') },
    { id: 6, title: '#Global Show', user: 'Yullia Globe', location: 'UK', views: '7413', image: require('@/assets/images/h2.png.png') },
    { id: 7, title: '#Click for fun', user: 'Erika Y', location: 'Spain', views: '1433', image: require('@/assets/images/h3.png.png') },
    { id: 8, title: '#Haz clic para divertir', user: 'Anny Lu', location: 'Mexico', views: '539', image: require('@/assets/images/h4.png.png') },
    { id: 9, title: '#Click for fun', user: 'Itsari_bitc1', location: 'Canada', views: '590', image: require('@/assets/images/h1.png.png') },
  ];

  const audioStreams = [
    { id: 1, title: 'Morning Meditation', user: 'Sarah Wilson', location: 'India', listeners: '1.2K', image: require('@/assets/images/h1.png.png') },
    { id: 2, title: 'Jazz Evening', user: 'Mike Johnson', location: 'USA', listeners: '850', image: require('@/assets/images/h2.png.png') },
    { id: 3, title: 'Podcast Talk', user: 'Emma Davis', location: 'UK', listeners: '2.1K', image: require('@/assets/images/h3.png.png') },
    { id: 4, title: 'Music Lounge', user: 'Alex Chen', location: 'Canada', listeners: '950', image: require('@/assets/images/h4.png.png') },
    { id: 5, title: 'Night Stories', user: 'Lisa Garcia', location: 'Spain', listeners: '1.5K', image: require('@/assets/images/h1.png.png') },
    { id: 6, title: 'Tech Talk', user: 'David Brown', location: 'Germany', listeners: '780', image: require('@/assets/images/h2.png.png') },
    { id: 7, title: 'Music Mix', user: 'Anna Smith', location: 'France', listeners: '1.1K', image: require('@/assets/images/h3.png.png') },
    { id: 8, title: 'Daily News', user: 'Tom Wilson', location: 'Australia', listeners: '920', image: require('@/assets/images/h4.png.png') },
    { id: 9, title: 'Chill Vibes', user: 'Maria Garcia', location: 'Mexico', listeners: '1.3K', image: require('@/assets/images/h1.png.png') },
  ];


  useEffect(() => {
    const leftCardInterval = setInterval(() => {
      setCurrentLeftCardIndex(prevIndex => {
        const currentData = activeTab === 'video' ? videos : audioStreams;
        return (prevIndex + 1) % currentData.length;
      });
    }, 3000);

    return () => clearInterval(leftCardInterval);
  }, [activeTab]);

  return (
    <ThemedView style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : 'white' }]}>
      <View style={[styles.header, { backgroundColor: isDark ? '#1a1a1a' : 'white' }]}>
        <View style={styles.titleContainer}>
          <ThemedText style={[styles.title, { color: isDark ? 'white' : 'black' }]}>Ananta</ThemedText>
          <View style={styles.titleUnderline} />
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push('/search')}
          >
            <SearchIcon color="#127D96" isDark={isDark} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/notification')}>
            <BellIcon color="#127D96" isDark={isDark} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/wallet')}>
            <WalletIcon color="#127D96" isDark={isDark} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'video' && styles.activeTab]}
          onPress={() => setActiveTab('video')}
        >
          <ThemedText style={[styles.tabText, { color: isDark ? '#ccc' : '#666' }, activeTab === 'video' && styles.activeTabText]}>Video Live</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'audio' && styles.activeTab]}
          onPress={() => setActiveTab('audio')}
        >
          <ThemedText style={[styles.tabText, { color: isDark ? '#ccc' : '#666' }, activeTab === 'audio' && styles.activeTabText]}>Audio Live</ThemedText>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <ScrollView 
          ref={bannerScrollRef}
          horizontal 
          showsHorizontalScrollIndicator={false} 
          pagingEnabled 
          style={styles.bannerContainer}
          contentContainerStyle={styles.bannerContent}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentBannerIndex(newIndex);
          }}
        >
          {bannerImages.map((image, index) => (
            <View key={index} style={styles.featuredVideo}>
              <Image source={image} style={styles.featuredImage} />
              <TouchableOpacity style={styles.playButton}>
                <Image source={require('@/assets/images/Group.png')} style={styles.playButtonImage} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        
        {(activeTab === 'video' || activeTab === 'audio') && (
          <View>
            {/* First 3 cards special layout */}
            <View style={styles.specialGrid}>
              <View style={styles.leftColumn}>
                {(() => {
                  const currentData = activeTab === 'video' ? videos : audioStreams;
                  const item = currentData[currentLeftCardIndex % currentData.length];
                  return (
                    <TouchableOpacity 
                      key={item.id} 
                      style={styles.largeCard}
                      onPress={() => {
                        if (activeTab === 'video') {
                          router.push({
                            pathname: '/live/video',
                            params: {
                              title: item.title,
                              user: item.user,
                              location: item.location,
                              views: (item as any).views,
                              image: item.id.toString()
                            }
                          });
                        } else {
                          router.push({
                            pathname: '/live/audio',
                            params: {
                              title: item.title,
                              user: item.user,
                              location: item.location,
                              listeners: (item as any).listeners,
                              image: item.id.toString()
                            }
                          });
                        }
                      }}
                    >
                      {activeTab === 'video' && <Image source={item.image} style={styles.videoImage} />}
                      {activeTab === 'audio' && (
                        <View style={styles.audioOverlay}>
                          <View style={styles.audioProfileContainer}>
                            <Image source={item.image} style={styles.audioProfileImage} />
                            <View style={styles.liveIndicator}>
                              <ThemedText style={styles.liveText}>LIVE</ThemedText>
                            </View>
                          </View>
                        </View>
                      )}
                      <View style={styles.videoOverlay}>
                        <View style={styles.viewCount}>
                          <ThemedText style={styles.viewText}>
                            {activeTab === 'video' ? `👁 ${(item as any).views}` : `🎧 ${(item as any).listeners}`}
                          </ThemedText>
                        </View>
                        <View style={styles.videoInfo}>
                          <ThemedText style={styles.videoTitle}>{item.title}</ThemedText>
                          <View style={styles.userInfo}>
                            <Image source={item.image} style={styles.userAvatar} />
                            <View style={styles.userDetails}>
                              <ThemedText style={styles.userName}>{item.user}</ThemedText>
                              <ThemedText style={styles.userLocation}>{item.location}</ThemedText>
                            </View>
                            <TouchableOpacity 
                              style={[
                                styles.followButton,
                                followedUsers.includes(item.id) && styles.followingButton
                              ]}
                              onPress={() => handleFollow(item.id)}
                            >
                              <ThemedText style={styles.followText}>
                                {followedUsers.includes(item.id) ? 'Following' : 'Follow'}
                              </ThemedText>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })()}
              </View>
              
              <View style={styles.rightColumn}>
                {(activeTab === 'video' ? videos : audioStreams).slice(1, 3).map((item, index) => (
                  <TouchableOpacity 
                    key={item.id} 
                    style={styles.smallCard}
                    onPress={() => {
                      if (activeTab === 'video') {
                        router.push({
                          pathname: '/live/video',
                          params: {
                            title: item.title,
                            user: item.user,
                            location: item.location,
                            views: (item as any).views,
                            image: item.id.toString()
                          }
                        });
                      } else {
                        router.push({
                          pathname: '/live/audio',
                          params: {
                            title: item.title,
                            user: item.user,
                            location: item.location,
                            listeners: (item as any).listeners,
                            image: item.id.toString()
                          }
                        });
                      }
                    }}
                  >
                    {activeTab === 'video' && <Image source={item.image} style={styles.videoImage} />}
                    {activeTab === 'audio' && (
                      <View style={styles.audioOverlay}>
                        <View style={styles.audioProfileContainer}>
                          <Image source={item.image} style={styles.audioProfileImage} />
                          <View style={styles.liveIndicator}>
                            <ThemedText style={styles.liveText}>LIVE</ThemedText>
                          </View>
                        </View>
                      </View>
                    )}
                    <View style={styles.smallCardOverlay}>
                      <ThemedText style={styles.smallCardTitle}>{item.user}</ThemedText>
                      <TouchableOpacity 
                        style={styles.smallFollowButton}
                        onPress={() => handleFollow(item.id)}
                      >
                        <ThemedText style={styles.smallFollowText}>
                          {followedUsers.includes(item.id) ? 'Following' : 'Follow'}
                        </ThemedText>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Remaining cards in normal grid */}
            <View style={styles.videoGrid}>
              {(activeTab === 'video' ? videos : audioStreams).slice(3).map((item, index) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.videoCard}
                  onPress={() => {
                    if (activeTab === 'video') {
                      router.push({
                        pathname: '/live/video',
                        params: {
                          title: item.title,
                          user: item.user,
                          location: item.location,
                          views: (item as any).views,
                          image: item.id.toString()
                        }
                      });
                    } else {
                      router.push({
                        pathname: '/live/audio',
                        params: {
                          title: item.title,
                          user: item.user,
                          location: item.location,
                          listeners: (item as any).listeners,
                          image: item.id.toString()
                        }
                      });
                    }
                  }}
                >
                  {activeTab === 'video' && <Image source={item.image} style={styles.videoImage} />}
                  {activeTab === 'audio' && (
                    <View style={styles.audioOverlay}>
                      <View style={styles.audioProfileContainer}>
                        <Image source={item.image} style={styles.audioProfileImage} />
                        <View style={styles.liveIndicator}>
                          <ThemedText style={styles.liveText}>LIVE</ThemedText>
                        </View>
                      </View>
                    </View>
                  )}
                  <View style={styles.videoOverlay}>
                    <View style={styles.viewCount}>
                      <ThemedText style={styles.viewText}>
                        {activeTab === 'video' ? `👁 ${(item as any).views}` : `🎧 ${(item as any).listeners}`}
                      </ThemedText>
                    </View>
                    <View style={styles.videoInfo}>
                      <ThemedText style={styles.videoTitle}>{item.title}</ThemedText>
                      <View style={styles.userInfo}>
                        <Image source={item.image} style={styles.userAvatar} />
                        <View style={styles.userDetails}>
                          <ThemedText style={styles.userName}>{item.user}</ThemedText>
                          <ThemedText style={styles.userLocation}>{item.location}</ThemedText>
                        </View>
                        <TouchableOpacity 
                          style={[
                            styles.followButton,
                            followedUsers.includes(item.id) && styles.followingButton
                          ]}
                          onPress={() => handleFollow(item.id)}
                        >
                          <ThemedText style={styles.followText}>
                            {followedUsers.includes(item.id) ? 'Following' : 'Follow'}
                          </ThemedText>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
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
  titleContainer: {
    alignItems: 'flex-start',
  },
  titleUnderline: {
    width: 100,
    height: 3,
    backgroundColor: Colors.light.primary,
    marginTop: 2,
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
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
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
    fontSize: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  bannerContainer: {
    marginBottom: 20,
  },
  bannerContent: {
    alignItems: 'center',
  },
  featuredVideo: {
    width: width - 32,
    height: (width - 32) * 0.4,
    borderRadius: 16,
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
  specialGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
    gap: 8,
  },
  largeCard: {
    width: '100%',
    height: (width - 48) / 2 * 1.3,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  smallCard: {
    width: '100%',
    height: ((width - 48) / 2 * 1.3 - 8) / 2,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  smallCardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smallCardTitle: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  smallFollowButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  smallFollowText: {
    color: 'white',
    fontSize: 8,
    fontWeight: '600',
  },
  videoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  videoCard: {
    width: (width - 48) / 2,
    height: (width - 48) / 2 * 1.3,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 12,
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  userDetails: {
    flex: 1,
    gap: 2,
  },
  userAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginTop: 2,
  },
  userName: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 14,
  },
  userLocation: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 9,
    lineHeight: 12,
  },
  followButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    minWidth: 55,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  followText: {
    color: 'white',
    fontSize: 9,
    fontWeight: '600',
    textAlign: 'center',
  },
  followingButton: {
    backgroundColor: Colors.light.primary,
  },
  audioOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioProfileContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  audioProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: Colors.light.primary,
  },
  liveIndicator: {
    position: 'absolute',
    bottom: -5,
    backgroundColor: '#FF4444',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  liveText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
  },
  emptyState: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  },
  usersList: {
    width: '100%',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userNameContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  profileUsername: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  messageButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  messageText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AudioLiveScreen() {
  const params = useLocalSearchParams();
  const title = params.title as string || '#Love me like you do';
  const user = params.user as string || 'Micale clarke';
  const location = params.location as string || 'Location';
  const listeners = params.listeners as string || '1.2K';
  
  const [liveComments, setLiveComments] = useState<any[]>([
    { id: 1, user: 'Johnson joy', message: 'Great stream!', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50' },
    { id: 2, user: 'Henny', message: 'Love this song', avatar: 'https://images.unsplash.com/photo-1494790108755-2616c9c0e0e0?w=50' },
    { id: 3, user: 'Mike', message: 'Amazing performance!', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50' }
  ]);
  const [messageText, setMessageText] = useState('');
  const [floatingHearts, setFloatingHearts] = useState<any[]>([]);
  
  const comments = [
    { id: 1, user: 'Johnson joy', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50' },
    { id: 2, user: 'Johnson joy', message: 'Hi micale john', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50' },
    { id: 3, user: 'Henny', message: 'Hi', avatar: 'https://images.unsplash.com/photo-1494790108755-2616c9c0e0e0?w=50' },
    { id: 4, user: 'Johnson joy', message: 'How are you?', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50' },
    { id: 5, user: 'Henny', message: 'Im good, How are you?', avatar: 'https://images.unsplash.com/photo-1494790108755-2616c9c0e0e0?w=50' },
  ];

  const addFloatingHeart = () => {
    const newHeart = {
      id: Date.now(),
      bottom: Math.random() * 200 + 100,
      right: Math.random() * 50 + 20,
    };
    setFloatingHearts(prev => [...prev, newHeart]);
    
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
    }, 3000);
  };

  const sendMessage = () => {
    if (messageText.trim()) {
      const newComment = {
        id: Date.now(),
        user: 'You',
        message: messageText.trim(),
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50'
      };
      setLiveComments(prev => [...prev, newComment].slice(-5));
      setMessageText('');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomComment = comments[Math.floor(Math.random() * comments.length)];
      const newComment = { ...randomComment, id: Date.now() };
      setLiveComments(prev => [...prev, newComment].slice(-5));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616c9c0e0e0?w=400' }}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      <View style={styles.overlay}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }}
            style={styles.userAvatar}
          />
          <View>
            <ThemedText style={styles.username}>@{user}</ThemedText>
            <ThemedText style={styles.liveText}>{title}</ThemedText>
          </View>
          <TouchableOpacity style={styles.followButton}>
            <ThemedText style={styles.followText}>Follow</ThemedText>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <ThemedText style={styles.closeText}>×</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <ThemedText style={styles.statIcon}>💛</ThemedText>
          <ThemedText style={styles.statText}>15k</ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText style={styles.statIcon}>🎯</ThemedText>
          <ThemedText style={styles.statText}>55</ThemedText>
        </View>
      </View>

      <View style={styles.audioVisualization}>
        <View style={styles.profileContainer}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }}
            style={styles.hostImage}
          />
          <View style={styles.profileBorder}></View>
          <View style={styles.audioRing}></View>
        </View>
      </View>

      <View style={styles.commentsSection}>
        {liveComments.map((comment) => (
          <View key={comment.id} style={styles.liveCommentItem}>
            <Image source={{ uri: comment.avatar }} style={styles.liveCommentAvatar} />
            <Text style={styles.liveCommentUser}>@{comment.user}: </Text>
            <Text style={styles.liveCommentText}>{comment.message}</Text>
          </View>
        ))}
      </View>

      <View style={styles.floatingHeartsContainer}>
        {floatingHearts.map((heart) => (
          <View 
            key={heart.id} 
            style={[
              styles.floatingHeart,
              { bottom: heart.bottom, right: heart.right }
            ]}
          >
            <Text style={styles.heartEmoji}>❤️</Text>
          </View>
        ))}
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder="Say Something..."
            placeholderTextColor="rgba(0,0,0,0.5)"
            value={messageText}
            onChangeText={setMessageText}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <ThemedText style={styles.sendIcon}>▶</ThemedText>
          </TouchableOpacity>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <ThemedText style={styles.actionIcon}>🎤</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <ThemedText style={styles.actionIcon}>🎁</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={addFloatingHeart}>
            <ThemedText style={styles.actionIcon}>❤️</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  liveText: {
    color: 'black',
    fontSize: 12,
    opacity: 0.8,
  },
  followButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginLeft: 10,
  },
  followText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  stats: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  statText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
  },
  audioVisualization: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: -100 }],
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hostImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: 'white',
  },
  profileBorder: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 4,
    borderColor: '#00FF00',
    opacity: 0.8,
  },
  audioRing: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 2,
    borderColor: '#00FF00',
    opacity: 0.5,
  },
  commentsSection: {
    position: 'absolute',
    bottom: 100,
    left: 5,
    right: 5,
    height: 200,
    justifyContent: 'flex-end',
  },
  liveCommentItem: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'center',
  },
  liveCommentAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 6,
  },
  liveCommentContent: {
    flex: 1,
  },
  liveCommentUser: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  liveCommentText: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: 14,
    flex: 1,
  },
  floatingHeartsContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 100,
    pointerEvents: 'none',
  },
  floatingHeart: {
    position: 'absolute',
    opacity: 0.8,
  },
  heartEmoji: {
    fontSize: 24,
    color: '#FF6B6B',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 30,
    backgroundColor: 'rgba(243, 222, 222, 0.9)',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  messageInput: {
    flex: 1,
    color: 'black',
    fontSize: 14,
    paddingVertical: 10,
  },
  sendButton: {
    padding: 5,
  },
  sendIcon: {
    color: 'black',
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 18,
  },
});
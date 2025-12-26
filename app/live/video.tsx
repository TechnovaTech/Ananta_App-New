import { StyleSheet, TouchableOpacity, View, Image, TextInput, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { router, useLocalSearchParams } from 'expo-router';

export default function VideoLiveScreen() {
  const params = useLocalSearchParams();
  const title = params.title as string || '#Love me like you do';
  const user = params.user as string || 'Micale clarke';
  const location = params.location as string || 'Location';
  const views = params.views as string || '20';
  
  const comments = [
    { id: 1, user: 'Johnson joy', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50' },
    { id: 2, user: 'Johnson joy', message: 'Hi micale john', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50' },
    { id: 3, user: 'Johnson joy', message: 'Hi micale john', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50' },
    { id: 4, user: 'Henny', message: 'Hi', avatar: 'https://images.unsplash.com/photo-1494790108755-2616c9c0e0e0?w=50' },
    { id: 5, user: 'Johnson joy', message: 'How are you?', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50' },
    { id: 6, user: 'Henny', message: 'Im good, How are you?', avatar: 'https://images.unsplash.com/photo-1494790108755-2616c9c0e0e0?w=50' },
  ];

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616c9c0e0e0?w=400' }}
        style={styles.backgroundImage}
      />
      
      <View style={styles.overlay}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616c9c0e0e0?w=50' }}
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
            <ThemedText style={styles.statIcon}>👁</ThemedText>
            <ThemedText style={styles.statText}>{views} Viewers</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statIcon}>💛</ThemedText>
            <ThemedText style={styles.statText}>15k</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statIcon}>🎯</ThemedText>
            <ThemedText style={styles.statText}>55</ThemedText>
          </View>
        </View>

        <View style={styles.commentsSection}>
          <ScrollView style={styles.commentsList}>
            {comments.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <Image source={{ uri: comment.avatar }} style={styles.commentAvatar} />
                <View style={styles.commentContent}>
                  <ThemedText style={styles.commentUser}>@{comment.user}</ThemedText>
                  <ThemedText style={styles.commentText}>{comment.message}</ThemedText>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.messageInput}
              placeholder="Say Something..."
              placeholderTextColor="rgba(255,255,255,0.7)"
            />
            <TouchableOpacity style={styles.sendButton}>
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
            <TouchableOpacity style={styles.actionButton}>
              <ThemedText style={styles.actionIcon}>❤️</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
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
    backgroundColor: 'rgba(0,0,0,0.3)',
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
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  liveText: {
    color: 'white',
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  stats: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statIcon: {
    fontSize: 14,
    marginRight: 5,
  },
  statText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  commentsSection: {
    flex: 1,
    marginBottom: 20,
  },
  commentsList: {
    flex: 1,
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  commentAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentUser: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  commentText: {
    color: 'white',
    fontSize: 12,
    opacity: 0.9,
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  messageInput: {
    flex: 1,
    color: 'white',
    fontSize: 14,
    paddingVertical: 10,
  },
  sendButton: {
    padding: 5,
  },
  sendIcon: {
    color: 'white',
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
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 18,
  },
});
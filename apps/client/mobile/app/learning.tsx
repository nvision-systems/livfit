import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Modal, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { blogRepository, BlogPost } from '@livfit/lib';
import { ChevronLeft, BookOpen, Video, Play, Clock, Sparkles, X, Heart, ShieldAlert } from 'lucide-react-native';
import VideoPlayer from '../components/VideoPlayer';

const { width } = Dimensions.get('window');

const mockVideos = [
  { id: 1, title: "Prehab Core Prep & Strength Workouts", category: "Exercise", duration: "8:45", isShort: false, videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4", author: "Coach Vikram" },
  { id: 2, title: "Nutrition: Navigating Sodium Intake with NAFLD", category: "Dietary", duration: "12:10", isShort: false, videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4", author: "Dr. Sarah Smith" },
  { id: 3, title: "Low-impact Squat Compliance Quick Tip", category: "Daily Prehab", duration: "0:58", isShort: true, videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4", author: "Coach Vikram" },
  { id: 4, title: "Clinical FAQ: MELD Progression Guide", category: "Surgical Prep", duration: "1:00", isShort: true, videoUrl: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4", author: "Liver Care Team" }
];

export default function LearningScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'articles' | 'videos'>('articles');
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const posts = await blogRepository.getAll(true);
        setBlogs(posts);
      } catch (err) {
        console.error("Failed to load mobile blogs", err);
      } finally {
        setLoadingBlogs(false);
      }
    }
    loadBlogs();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft color="#1C1C1E" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Education Hub</Text>
        <View style={{ width: 40 }} /> {/* Spacer to balance Back button */}
      </View>

      {/* Segmented Controls */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'articles' && styles.activeTabButton]}
          onPress={() => setActiveTab('articles')}
        >
          <BookOpen color={activeTab === 'articles' ? '#FFFFFF' : '#8E8E93'} size={18} style={{ marginRight: 8 }} />
          <Text style={[styles.tabText, activeTab === 'articles' && styles.activeTabText]}>Articles</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'videos' && styles.activeTabButton]}
          onPress={() => setActiveTab('videos')}
        >
          <Video color={activeTab === 'videos' ? '#FFFFFF' : '#8E8E93'} size={18} style={{ marginRight: 8 }} />
          <Text style={[styles.tabText, activeTab === 'videos' && styles.activeTabText]}>Video Lessons</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      {activeTab === 'articles' ? (
        loadingBlogs ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#2D5AF0" />
            <Text style={styles.loadingText}>Fetching prep literature...</Text>
          </View>
        ) : (
          <FlatList
            data={blogs}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.scrollList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <ShieldAlert color="#AEAEB2" size={48} />
                <Text style={styles.emptyText}>No education modules published yet.</Text>
              </View>
            }
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.blogCard}
                onPress={() => router.push({ pathname: '/learning/blog', params: { id: item.id.toString() } } as any)}
              >
                <View style={styles.blogCategoryRow}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{(item as any).category || "Clinical"}</Text>
                  </View>
                  <View style={styles.sparkleRow}>
                    <Sparkles size={12} color="#FF9500" style={{ marginRight: 4 }} />
                    <Text style={styles.prepScore}>Prehab Approved</Text>
                  </View>
                </View>
                
                <Text style={styles.blogTitle}>{item.title}</Text>
                
                <Text style={styles.blogSnippet} numberOfLines={2}>
                  {item.content.replace(/<[^>]*>/g, '')}
                </Text>
                
                <View style={styles.blogFooter}>
                  <Text style={styles.blogAuthor}>By {(item as any).author || "Dr. Sarah Smith"}</Text>
                  <Text style={styles.blogDate}>
                    {new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )
      ) : (
        <ScrollView contentContainerStyle={styles.scrollGrid} showsVerticalScrollIndicator={false}>
          {/* Horizontal Layout Section */}
          <Text style={styles.sectionHeading}>Interactive Masterclasses</Text>
          {mockVideos.filter(v => !v.isShort).map((video) => (
            <TouchableOpacity 
              key={video.id} 
              style={styles.horizontalCard}
              onPress={() => setSelectedVideo(video)}
            >
              <View style={styles.hThumbnail}>
                <View style={styles.hPlayIcon}>
                  <Play color="#FFFFFF" size={16} fill="#FFFFFF" />
                </View>
                <View style={styles.hDuration}>
                  <Text style={styles.hDurationText}>{video.duration}</Text>
                </View>
              </View>
              <View style={styles.hDetails}>
                <Text style={styles.videoCategory}>{video.category}</Text>
                <Text style={styles.videoTitle} numberOfLines={2}>{video.title}</Text>
                <Text style={styles.videoAuthor}>By {video.author}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* Vertical Layout Section (Shorts) */}
          <Text style={[styles.sectionHeading, { marginTop: 24 }]}>Daily Shorts & Facts</Text>
          <View style={styles.shortsGrid}>
            {mockVideos.filter(v => v.isShort).map((video) => (
              <TouchableOpacity 
                key={video.id} 
                style={styles.verticalCard}
                onPress={() => setSelectedVideo(video)}
              >
                <View style={styles.vThumbnail}>
                  <View style={styles.vPlayIcon}>
                    <Play color="#FFFFFF" size={14} fill="#FFFFFF" />
                  </View>
                  <View style={styles.vShortBadge}>
                    <Text style={styles.vShortText}>FACT</Text>
                  </View>
                  <View style={styles.vDuration}>
                    <Text style={styles.vDurationText}>{video.duration}</Text>
                  </View>
                </View>
                <View style={styles.vDetails}>
                  <Text style={styles.videoCategory}>{video.category}</Text>
                  <Text style={styles.vTitle} numberOfLines={2}>{video.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

      {/* Video Modal Player */}
      {selectedVideo && (
        <Modal
          visible={true}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setSelectedVideo(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalCategory}>{selectedVideo.category}</Text>
                  <Text style={styles.modalTitle} numberOfLines={1}>{selectedVideo.title}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.closeModalButton} 
                  onPress={() => setSelectedVideo(null)}
                >
                  <X color="#1C1C1E" size={20} />
                </TouchableOpacity>
              </View>
              
              <VideoPlayer url={selectedVideo.videoUrl} />
              
              <View style={styles.modalMeta}>
                <Text style={styles.modalAuthor}>Instructor: {selectedVideo.author}</Text>
                <View style={styles.clockRow}>
                  <Clock size={12} color="#8E8E93" style={{ marginRight: 4 }} />
                  <Text style={styles.modalDuration}>{selectedVideo.duration} Lesson</Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1C1C1E',
    letterSpacing: -0.5,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 16,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
  },
  activeTabButton: {
    backgroundColor: '#2D5AF0',
    shadowColor: '#2D5AF0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  scrollList: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  scrollGrid: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  blogCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F2F2F7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  blogCategoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: '#F0F4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  categoryText: {
    color: '#2D5AF0',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  sparkleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prepScore: {
    color: '#FF9500',
    fontSize: 10,
    fontWeight: '800',
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1C1C1E',
    marginBottom: 8,
    lineHeight: 24,
  },
  blogSnippet: {
    fontSize: 13,
    color: '#8E8E93',
    lineHeight: 18,
    fontWeight: '500',
    marginBottom: 16,
  },
  blogFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
    paddingTop: 12,
  },
  blogAuthor: {
    fontSize: 11,
    color: '#8E8E93',
    fontWeight: '700',
  },
  blogDate: {
    fontSize: 11,
    color: '#AEAEB2',
    fontWeight: '600',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1C1C1E',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  horizontalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    flexDirection: 'row',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F2F2F7',
  },
  hThumbnail: {
    width: 100,
    height: 68,
    borderRadius: 12,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  hPlayIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(45, 90, 240, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hDuration: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  hDurationText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
  },
  hDetails: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  videoCategory: {
    fontSize: 9,
    fontWeight: '800',
    color: '#2D5AF0',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1C1C1E',
    marginBottom: 4,
    lineHeight: 18,
  },
  videoAuthor: {
    fontSize: 10,
    color: '#8E8E93',
    fontWeight: '600',
  },
  shortsGrid: {
    flexDirection: 'row',
    marginHorizontal: -6,
  },
  verticalCard: {
    flex: 1,
    paddingHorizontal: 6,
  },
  vThumbnail: {
    aspectRatio: 9 / 16,
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  vPlayIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(45, 90, 240, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vShortBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF9500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  vShortText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },
  vDuration: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  vDurationText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
  },
  vDetails: {
    marginTop: 8,
    paddingHorizontal: 4,
  },
  vTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1C1C1E',
    lineHeight: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalCategory: {
    fontSize: 10,
    fontWeight: '800',
    color: '#2D5AF0',
    textTransform: 'uppercase',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1C1C1E',
    marginTop: 2,
    maxWidth: width * 0.65,
  },
  closeModalButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
    paddingTop: 12,
  },
  modalAuthor: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '700',
  },
  clockRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalDuration: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '600',
  },
});

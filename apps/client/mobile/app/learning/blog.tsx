import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { blogRepository, BlogPost } from '@livfit/lib';
import { ChevronLeft, Calendar, User, Sparkles, ShieldCheck } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Premium custom lightweight HTML formatter for Mobile react-native text layouts
export function HTMLRenderer({ html }: { html: string }) {
  if (!html) return null;

  const blocks = html.split(/<\/(?:p|h1|h2|h3|li|ul|ol)>/i);

  return (
    <View style={rendererStyles.container}>
      {blocks.map((block, index) => {
        let text = block;
        let isHeading = false;
        let isListItem = false;

        if (/<h[1-3]/i.test(text)) {
          isHeading = true;
          text = text.replace(/<h[1-3][^>]*>/i, '');
        } else if (/<li/i.test(text)) {
          isListItem = true;
          text = text.replace(/<li[^>]*>/i, '');
        } else {
          text = text.replace(/<p[^>]*>/i, '');
        }

        const cleanText = text
          .replace(/<[^>]*>/g, '') 
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .trim();

        if (!cleanText) return null;

        if (isHeading) {
          return (
            <Text key={index} style={rendererStyles.heading}>
              {cleanText}
            </Text>
          );
        }

        if (isListItem) {
          return (
            <View key={index} style={rendererStyles.listItemRow}>
              <Text style={rendererStyles.bullet}>•</Text>
              <Text style={rendererStyles.listItemText}>{cleanText}</Text>
            </View>
          );
        }

        return (
          <Text key={index} style={rendererStyles.paragraph}>
            {cleanText}
          </Text>
        );
      })}
    </View>
  );
}

export default function BlogDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlog() {
      if (!id) return;
      try {
        const data = await blogRepository.getById(parseInt(id as string));
        setBlog(data);
      } catch (err) {
        console.error("Failed to load blog detail", err);
      } finally {
        setLoading(false);
      }
    }
    loadBlog();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2D5AF0" />
        <Text style={styles.loadingText}>Structuring clinical text...</Text>
      </View>
    );
  }

  if (!blog) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ChevronLeft color="#1C1C1E" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Article Not Found</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.centered}>
          <Text style={styles.errorText}>This medical resource could not be found or has been draft-retired.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft color="#1C1C1E" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{(blog as any).category || "Clinical Article"}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Verification Banner */}
        <View style={styles.verifiedBanner}>
          <ShieldCheck size={16} color="#34C759" style={{ marginRight: 6 }} />
          <Text style={styles.verifiedText}>LIVFIT Clinically Verified Resource</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>{blog.title}</Text>

        {/* Meta Row */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <User size={14} color="#8E8E93" style={{ marginRight: 6 }} />
            <Text style={styles.metaText}>{(blog as any).author || "Dr. Sarah Smith"}</Text>
          </View>
          <View style={styles.metaItem}>
            <Calendar size={14} color="#8E8E93" style={{ marginRight: 6 }} />
            <Text style={styles.metaText}>
              {new Date(blog.created_at || (blog as any).date || new Date()).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </Text>
          </View>
        </View>

        {/* Separator */}
        <View style={styles.separator} />

        {/* HTML Rendered Content */}
        <HTMLRenderer html={blog.content} />

        {/* Back Button Footer */}
        <TouchableOpacity style={styles.footerButton} onPress={() => router.back()}>
          <Text style={styles.footerButtonText}>Back to Education Hub</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const rendererStyles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  paragraph: {
    fontSize: 15,
    color: '#3A3A3C',
    lineHeight: 23,
    marginBottom: 16,
    fontWeight: '500',
  },
  heading: {
    fontSize: 19,
    fontWeight: '900',
    color: '#1C1C1E',
    marginTop: 18,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  listItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingLeft: 8,
  },
  bullet: {
    fontSize: 16,
    color: '#2D5AF0',
    marginRight: 8,
    lineHeight: 20,
  },
  listItemText: {
    flex: 1,
    fontSize: 15,
    color: '#3A3A3C',
    lineHeight: 20,
    fontWeight: '500',
  },
});

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
    fontSize: 16,
    fontWeight: '800',
    color: '#1C1C1E',
    letterSpacing: -0.5,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
    paddingBottom: 60,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '600',
  },
  errorText: {
    fontSize: 14,
    color: '#FF3B30',
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  verifiedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEFBF3',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  verifiedText: {
    color: '#34C759',
    fontSize: 10,
    fontWeight: '800',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1C1C1E',
    lineHeight: 32,
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaText: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#F2F2F7',
    marginBottom: 20,
  },
  footerButton: {
    backgroundColor: '#F2F2F7',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 32,
  },
  footerButtonText: {
    color: '#2D5AF0',
    fontWeight: '800',
    fontSize: 14,
  },
});

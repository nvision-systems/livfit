import React, { useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Play, Pause } from 'lucide-react-native';

interface VideoPlayerProps {
  url: string;
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<any>({});
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      <Video
        ref={video as any}
        style={styles.video}
        source={{ uri: url }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
      />
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#2D5AF0" />
        </View>
      )}
      {!status.isPlaying && !loading && (
        <TouchableOpacity 
          style={styles.playButton} 
          onPress={() => video.current?.playAsync()}
        >
          <Play color="white" size={40} fill="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    position: 'absolute',
    backgroundColor: 'rgba(45, 90, 240, 0.8)',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

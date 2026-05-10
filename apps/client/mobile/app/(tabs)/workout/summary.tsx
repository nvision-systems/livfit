import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { getWorkoutInsights, uploadWorkoutVideo } from '../../lib/api';
import { commonStyles as styles } from '../../styles';

export default function WorkoutSummaryScreen() {
  const [insights, setInsights] = useState(null);

  React.useEffect(() => {
    getWorkoutInsights().then(setInsights);
  }, []);

  const handleUploadVideo = () => {
    // Mock video upload
    uploadWorkoutVideo('mock-uri').then(() => Alert.alert('Success', 'Video uploaded'));
  };

  if (!insights) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Summary</Text>
      <Text style={styles.insight}>Average Heart Rate: {insights.averageHR} bpm</Text>
      <Text style={styles.insight}>Average Borg Scale: {insights.averageBorg}</Text>
      <Text style={styles.insight}>Total Duration: {insights.totalDuration} min</Text>
      <TouchableOpacity style={styles.button} onPress={handleUploadVideo}>
        <Text style={styles.buttonText}>Upload Workout Video</Text>
      </TouchableOpacity>
    </View>
  );
}
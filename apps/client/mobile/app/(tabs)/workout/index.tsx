import React, { useEffect, useState, Fragment } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput, StyleSheet } from 'react-native';
import { Play, CheckCircle, XCircle, Video, Info } from 'lucide-react-native';
import { getTodaysWorkout, markWorkoutDone, skipWorkout, uploadWorkoutVideo } from '@livfit/lib';
import WorkoutCard from '../../../components/WorkoutCard';
import { commonStyles } from '../../../styles';

export default function FitnessScreen() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [duration, setDuration] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [borgScale, setBorgScale] = useState('');
  const [showLogForm, setShowLogForm] = useState(false);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    const data = await getTodaysWorkout();
    setWorkouts(data);
  };

  const handleMarkDone = async () => {
    if (!duration || !heartRate) {
      Alert.alert('Error', 'Please fill in the duration and heart rate.');
      return;
    }
    const isAerobics = workouts.some(w => w.type === 'Aerobics');
    if (isAerobics && !borgScale) {
      Alert.alert('Error', 'Borg Scale is required for Aerobics workouts.');
      return;
    }

    await markWorkoutDone(1, parseInt(duration), parseInt(heartRate), isAerobics ? parseInt(borgScale) : undefined);
    Alert.alert('Success', 'Workout session logged successfully!');
    setShowLogForm(false);
    setDuration('');
    setHeartRate('');
    setBorgScale('');
  };

  const handleVideoUpload = () => {
    Alert.alert('Video Upload', 'Select a video from your gallery to share with your dietician/admin.');
    // Logic for video upload would go here
  };

  return (
    <ScrollView style={commonStyles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Header Section */}
      <View style={localStyles.header}>
        <Text style={localStyles.dateText}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
        <Text style={localStyles.title}>Today's Routine</Text>
      </View>

      {/* Workout List */}
      <View style={localStyles.listSection}>
        {workouts.map((workout, index) => (
          <Fragment key={workout.id || `workout-${index}`}>
            <WorkoutCard {...workout} />
          </Fragment>
        ))}
      </View>

      {/* Action Section */}
      {!showLogForm ? (
        <View style={localStyles.actionCard}>
          <Text style={localStyles.actionTitle}>Finished your session?</Text>
          <Text style={localStyles.actionSubtitle}>Log your metrics to track your progress and MELD improvements.</Text>
          <TouchableOpacity style={localStyles.mainButton} onPress={() => setShowLogForm(true)}>
            <Text style={localStyles.mainButtonText}>Log Session Metrics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={localStyles.secondaryButton} onPress={handleVideoUpload}>
            <Video size={14} color="#2D5AF0" style={{ marginRight: 8 }} />
            <Text style={localStyles.secondaryButtonText}>Upload Progress Video</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={localStyles.formCard}>
          <View style={localStyles.formHeader}>
            <Text style={localStyles.formTitle}>Session Metrics</Text>
            <TouchableOpacity onPress={() => setShowLogForm(false)}>
              <XCircle size={18} color="#8E8E93" />
            </TouchableOpacity>
          </View>

          <View style={localStyles.inputRow}>
            <View style={[localStyles.inputGroup, { flex: 1, marginRight: 12 }]}>
              <Text style={localStyles.label}>Duration (min)</Text>
              <TextInput 
                style={localStyles.input} 
                placeholder="0" 
                value={duration} 
                onChangeText={setDuration} 
                keyboardType="numeric" 
              />
            </View>
            <View style={[localStyles.inputGroup, { flex: 1 }]}>
              <Text style={localStyles.label}>Avg Heart Rate</Text>
              <TextInput 
                style={localStyles.input} 
                placeholder="BPM" 
                value={heartRate} 
                onChangeText={setHeartRate} 
                keyboardType="numeric" 
              />
            </View>
          </View>

          {workouts.some(w => w.type === 'Aerobics') && (
            <View style={localStyles.inputGroup}>
              <Text style={localStyles.label}>Borg Scale (6-20)</Text>
              <Text style={localStyles.subLabel}>Perceived exertion level for aerobics.</Text>
              <TextInput 
                style={localStyles.input} 
                placeholder="13 (Somewhat hard)" 
                value={borgScale} 
                onChangeText={setBorgScale} 
                keyboardType="numeric" 
              />
            </View>
          )}

          <TouchableOpacity style={localStyles.submitButton} onPress={handleMarkDone}>
            <Text style={localStyles.submitButtonText}>Submit Report</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Admin Videos Placeholder */}
      <View style={localStyles.videoSection}>
        <Text style={localStyles.sectionTitle}>Instructional Videos</Text>
        <TouchableOpacity style={localStyles.videoCard}>
          <View style={localStyles.playIcon}>
            <Play size={12} color="#FFFFFF" fill="#FFFFFF" />
          </View>
          <View>
            <Text style={localStyles.videoName}>Correct Squat Form</Text>
            <Text style={localStyles.videoMeta}>Admin Upload • 2:45</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  header: {
    marginTop: 8,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 13,
    color: '#8E8E93',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1C1C1E',
    marginTop: 4,
  },
  listSection: {
    marginBottom: 24,
  },
  actionCard: {
    backgroundColor: '#F2F2F7',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  mainButton: {
    backgroundColor: '#2D5AF0',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  mainButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    padding: 8,
  },
  secondaryButtonText: {
    color: '#2D5AF0',
    fontWeight: '600',
    fontSize: 14,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 24,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3A3A3C',
    marginBottom: 8,
  },
  subLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F2F2F7',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    color: '#1C1C1E',
  },
  submitButton: {
    backgroundColor: '#34C759',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  videoSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  videoCard: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  playIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2D5AF0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  videoName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  videoMeta: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  }
});
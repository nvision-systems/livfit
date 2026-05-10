export const validateWorkoutMetrics = (metrics: any) => {
  if (metrics.heartRate > 200) return { valid: false, error: 'Abnormal heart rate detected' };
  if (metrics.duration < 0) return { valid: false, error: 'Invalid duration' };
  return { valid: true };
};

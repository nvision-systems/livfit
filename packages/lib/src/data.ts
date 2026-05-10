export const mockDemoUsers = {
  admin: {
    id: 'admin-1',
    name: 'System Admin',
    email: 'admin@livfit.app',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
  },
  superadmin: {
    id: 'super-1',
    name: 'Super User',
    email: 'super@livfit.app',
    role: 'superadmin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=super'
  },
  dietician: {
    id: 'dietician-1',
    name: 'Dr. Sarah Smith',
    email: 'sarah@livfit.app',
    role: 'dietician',
    specialty: 'Hepatology Nutrition',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
  },
  patient: {
    id: 'patient-1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'patient',
    age: 30,
    diagnosis: 'Cirrhosis',
    meldScore: 12,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
  }
};

export const mockUser = mockDemoUsers.patient;

export const mockWorkouts = [
  { id: 1, name: 'Push-ups', type: 'Strength', sets: 3, reps: 10, duration: 0 },
  { id: 2, name: 'Squats', type: 'Strength', sets: 3, reps: 15, duration: 0 },
  { id: 3, name: 'Plank', type: 'Balance', sets: 3, duration: 30, reps: 0 },
  { id: 4, name: 'Jogging', type: 'Aerobics', sets: 1, duration: 20, reps: 0 },
];

export const mockMeals = [
  { id: 1, name: 'Breakfast', calories: 400, protein: 20, carbs: 50, fats: 15, items: ['Oatmeal', 'Banana', 'Coffee'] },
  { id: 2, name: 'Lunch', calories: 600, protein: 30, carbs: 60, fats: 20, items: ['Grilled Chicken', 'Salad', 'Rice'] },
  { id: 3, name: 'Dinner', calories: 500, protein: 25, carbs: 40, fats: 18, items: ['Fish', 'Vegetables', 'Quinoa'] },
];

export const mockSummary = {
  workoutCompleted: false,
  caloriesConsumed: 1500,
  caloriesGoal: 2000,
  proteinConsumed: 75,
  proteinGoal: 100,
  carbsConsumed: 150,
  carbsGoal: 200,
  fatsConsumed: 50,
  fatsGoal: 70,
  fluidsConsumed: 1.5,
  fluidsGoal: 2.0,
};

export const mockFoodDatabase = [
  { id: 1, name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fats: 0.3 },
  { id: 2, name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fats: 3.6 },
  { id: 3, name: 'Rice', calories: 130, protein: 2.7, carbs: 28, fats: 0.3 },
];

export const mockMealPlans = [
  { id: 1, name: 'Weight Loss Plan', meals: mockMeals, status: 'active' },
];

export const mockRecipes = [
  { id: 1, name: 'Grilled Chicken Salad', ingredients: ['Chicken', 'Lettuce', 'Tomato'], instructions: 'Grill chicken, mix with veggies.' },
];

export const mockChatHistory = [
  { id: 1, sender: 'Dietician', message: 'How are you feeling today?', timestamp: '2023-10-01T10:00:00Z' },
  { id: 2, sender: 'User', message: 'Feeling good, thanks!', timestamp: '2023-10-01T10:05:00Z' },
];

export const mockWorkoutInsights = {
  averageHR: 120,
  averageBorg: 12,
  totalDuration: 45,
};

export const mockDieticians = [
  { id: 1, name: 'Dr. Smith', email: 'smith@dietician.com' },
];

export const mockBlogPosts = [
  { 
    id: 1, 
    title: 'Managing Sodium Intake with NAFLD', 
    content: 'Reducing sodium is critical for managing liver health...', 
    author: 'Dr. Smith', 
    date: '2023-10-25',
    category: 'Nutrition',
    videoUrl: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' // Mock video
  },
  { 
    id: 2, 
    title: 'The Importance of Low-Impact Exercise', 
    content: 'For patients with cirrhosis, low-impact exercise is the safest way to build strength...', 
    author: 'LivFit Team', 
    date: '2023-10-20',
    category: 'Exercise',
    videoUrl: null
  }
];

export const mockLabResults = [
  { id: 1, date: '2023-10-01', bilirubin: 1.2, inr: 1.1, creatinine: 0.9, sodium: 140, albumin: 3.5 },
  { id: 2, date: '2023-10-15', bilirubin: 1.5, inr: 1.2, creatinine: 1.0, sodium: 138, albumin: 3.2 },
  { id: 3, date: '2023-11-01', bilirubin: 1.8, inr: 1.3, creatinine: 1.1, sodium: 136, albumin: 3.0 },
];

export const mockMeldHistory = [
  { date: '2023-10-01', score: 10, status: 'Stable' },
  { date: '2023-10-15', score: 12, status: 'Monitor' },
  { date: '2023-11-01', score: 15, status: 'Critical' },
];

export const meldThresholds = {
  stable: { min: 0, max: 10, color: '#10b981', label: 'Stable' },
  monitor: { min: 11, max: 18, color: '#f59e0b', label: 'Monitor' },
  serious: { min: 19, max: 24, color: '#f97316', label: 'Serious' },
  critical: { min: 25, max: 40, color: '#ef4444', label: 'Critical' },
};

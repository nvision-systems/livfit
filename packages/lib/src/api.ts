import { mockUser, mockWorkouts, mockMeals, mockSummary, mockFoodDatabase, mockMealPlans, mockRecipes, mockChatHistory, mockWorkoutInsights, mockDieticians, mockBlogPosts } from './data';
import { getWorkoutIntensity, WORKOUT_TEMPLATES } from './core';

// Blog API
export const getBlogPosts = () => Promise.resolve(mockBlogPosts);

export const getBlogPostById = (id: number) => {
  const post = mockBlogPosts.find(p => p.id === id);
  return Promise.resolve(post);
};

export const createBlogPost = (postData: any) => {
  const newPost = { id: mockBlogPosts.length + 1, date: new Date().toISOString().split('T')[0], ...postData };
  mockBlogPosts.push(newPost);
  return Promise.resolve({ success: true, post: newPost });
};

export const updateBlogPost = (id: number, postData: any) => {
  const index = mockBlogPosts.findIndex(p => p.id === id);
  if (index !== -1) {
    mockBlogPosts[index] = { ...mockBlogPosts[index], ...postData };
    return Promise.resolve({ success: true, post: mockBlogPosts[index] });
  }
  return Promise.resolve({ success: false, error: 'Post not found' });
};

export const deleteBlogPost = (id: number) => {
  const index = mockBlogPosts.findIndex(p => p.id === id);
  if (index !== -1) {
    mockBlogPosts.splice(index, 1);
    return Promise.resolve({ success: true });
  }
  return Promise.resolve({ success: false, error: 'Post not found' });
};

// Workout API
export const getWorkoutPlans = () => Promise.resolve(mockWorkouts);

export const generateWorkoutPlan = (meldScore: number) => {
  const intensity = getWorkoutIntensity(meldScore);
  const plan = WORKOUT_TEMPLATES[intensity];
  // In a real app, this would save to DB
  return Promise.resolve(plan);
};

export const logWorkoutCompletion = (workoutId: number, metrics: { duration: number; heartRate: number; borgScale?: number }) => {
  mockSummary.workoutCompleted = true;
  // Log to audit/activity
  return Promise.resolve({ success: true, timestamp: new Date().toISOString() });
};

export const skipWorkoutSession = (reason: string) => {
  // Log skip reason for clinical review
  return Promise.resolve({ success: true, reason });
};

// Nutrition API
export const getNutritionPlans = () => Promise.resolve(mockMealPlans);

export const updateNutritionPlan = (planId: number, planData: any) => {
  // In a real app, this would update the database
  const index = mockMealPlans.findIndex(p => p.id === planId);
  if (index !== -1) {
    mockMealPlans[index] = { ...mockMealPlans[index], ...planData };
  } else {
    mockMealPlans.push({ id: mockMealPlans.length + 1, ...planData });
  }
  return Promise.resolve({ success: true, plan: planData });
};

export const getActiveMealPlan = () => {
  const active = mockMealPlans.find((p: any) => p.status === 'active') || mockMealPlans[0];
  return Promise.resolve(active);
};


export const getUser = () => Promise.resolve(mockUser);

export const getTodaysWorkout = () => Promise.resolve(mockWorkouts);

export const getMealPlan = () => Promise.resolve(mockMeals);

export const getSummary = () => Promise.resolve(mockSummary);

export const markWorkoutDone = (workoutId: number, duration: number, heartRate: number, borgScale?: number) => {
  mockSummary.workoutCompleted = true;
  return Promise.resolve({ success: true });
};

export const skipWorkout = () => {
  return Promise.resolve({ success: true });
};

export const logMeal = (mealId: number) => {
  return Promise.resolve({ success: true });
};

export const searchFood = (query: string) => {
  return Promise.resolve(mockFoodDatabase.filter(food => food.name.toLowerCase().includes(query.toLowerCase())));
};

export const getMealPlans = () => Promise.resolve(mockMealPlans);

export const getRecipes = () => Promise.resolve(mockRecipes);

export const getChatHistory = () => Promise.resolve(mockChatHistory);

export const sendMessage = (message: string) => {
  const newMessage = { id: mockChatHistory.length + 1, sender: 'User', message, timestamp: new Date().toISOString() };
  mockChatHistory.push(newMessage);
  return Promise.resolve({ success: true });
};

export const requestDieticianConnection = () => {
  mockUser.isConnectedToDietician = true;
  return Promise.resolve({ success: true });
};

export const getWorkoutInsights = () => Promise.resolve(mockWorkoutInsights);

export const uploadWorkoutVideo = (videoUri: string) => {
  return Promise.resolve({ success: true });
};

// MELD calculation is handled in core.ts

import { supabase } from './supabase/client';

// Auth API
import { isSupabaseConfigured } from './supabase/client';
import { mockDemoUsers } from './data';

export const login = async (email: string, password: string) => {
  console.log("LIB: [LOGIN_ATTEMPT]", { email, isSupabaseConfigured });
  if (!isSupabaseConfigured) {
    // Demo Mode: Map emails to specific professional profiles
    let mockUser: any = mockDemoUsers.patient;
    const normalizedEmail = email.toLowerCase();
    
    if (normalizedEmail.includes('super')) {
      mockUser = mockDemoUsers.superadmin;
    } else if (normalizedEmail.includes('alice') || normalizedEmail.includes('hep')) {
      mockUser = mockDemoUsers.hepatologist;
    } else if (normalizedEmail.includes('admin') || normalizedEmail.includes('staff')) {
      mockUser = mockDemoUsers.admin;
    } else if (normalizedEmail.includes('sarah') || normalizedEmail.includes('diet')) {
      mockUser = mockDemoUsers.dietician;
    } else if (normalizedEmail.includes('jane') || normalizedEmail.includes('edit')) {
      mockUser = mockDemoUsers.editor;
    }
    
    const sessionData = { 
      user: { ...mockUser, email: normalizedEmail, app_metadata: { role: mockUser.role } }, 
      session: { access_token: 'demo-' + Math.random().toString(36).substr(2, 9) } 
    };
    
    console.log("LIB: [LOGIN_MOCK] Selected User:", mockUser.role);
    
    // Persist mock session
    if (typeof window !== 'undefined') {
      localStorage.setItem('livfit_demo_session', JSON.stringify(sessionData));
      console.log("LIB: [STORAGE_SYNC] Session persisted to localStorage");
    }
    
    return sessionData;
  }
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

export const signup = async (email: string, password: string, metadata: any) => {
  if (!isSupabaseConfigured) {
    return { user: { email, user_metadata: metadata }, session: { access_token: 'demo' } };
  }
  const { data, error } = await supabase.auth.signUp({ 
    email, 
    password, 
    options: { data: metadata } 
  });
  if (error) throw error;
  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return { success: true };
};

export const getCurrentSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
};

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
  return data;
};

export const verifyOTP = async (otp: string) => {
  console.log("LIB: [OTP_VERIFICATION]", otp);
  // Demo Mode: Allow any 6-digit code for testing compliance
  if (otp.length === 6) {
    return { success: true };
  }
  return { success: false, error: "Invalid OTP format" };
};

// ... remaining mock functions (getUser, etc.)
import { mockMealPlans, mockMeals } from '../data';

export class DietRepository {
  async getPlans() {
    return mockMealPlans;
  }

  async getActivePlan() {
    return mockMealPlans.find((p: any) => p.status === 'active') || mockMealPlans[0];
  }

  async updatePlan(planId: number, planData: any) {
    const index = mockMealPlans.findIndex(p => p.id === planId);
    if (index !== -1) {
      mockMealPlans[index] = { ...mockMealPlans[index], ...planData };
    } else {
      mockMealPlans.push({ id: mockMealPlans.length + 1, ...planData });
    }
    return { success: true, plan: planData };
  }
}

export const dietRepository = new DietRepository();

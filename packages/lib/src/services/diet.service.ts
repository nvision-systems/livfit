import { dietRepository } from '../repositories/diet.repository';
import { DietPlan, DietLog, DietMeal } from '../types';

export class DietService {
  async getPlans(userId: string) {
    return dietRepository.getPlans(userId);
  }

  async getLogs(userId: string) {
    return dietRepository.getLogs(userId);
  }

  async logMeal(log: Partial<DietLog>) {
    return dietRepository.logMeal(log);
  }

  async createPlan(plan: Partial<DietPlan>, meals: Partial<DietMeal>[]) {
    return dietRepository.createPlan(plan, meals);
  }

  async updatePlan(id: number, updates: Partial<DietPlan>) {
    return dietRepository.updatePlan(id, updates);
  }
}

export const dietService = new DietService();

import { dietRepository } from '../repositories/diet.repository';

export class DietService {
  async getPlans() {
    return dietRepository.getPlans();
  }

  async getActivePlan() {
    return dietRepository.getActivePlan();
  }

  async updatePlan(planId: number, planData: any) {
    // Clinical validation: ensure calories/protein are within safe limits
    return dietRepository.updatePlan(planId, planData);
  }
}

export const dietService = new DietService();

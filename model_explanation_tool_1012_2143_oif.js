// 代码生成时间: 2025-10-12 21:43:43
 * interactions with the tool.
 */

import Service from '@ember/service';
import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { error } from '@ember/debug';
import { A } from '@ember/array';

// ModelService provides explanation logic for different model types
export default class ModelService extends Service {
  // Generate a generic explanation for a given model type
  explainModel(modelType) {
    try {
      switch (modelType) {
        case 'linear':
          return 'Linear models use a linear equation to predict outcomes.';
        case 'decisionTree':
          return 'Decision trees make decisions based on a series of conditions.';
        case 'neuralNetwork':
          return 'Neural networks mimic the way the brain works to learn patterns.';
        default:
          throw new Error(`Unknown model type: ${modelType}`);
      }
    } catch (error) {
      console.error('Error explaining model:', error);
      return `Error: ${error.message}`;
    }
  }
}

// Route for handling model explanation requests
export default class ModelExplanationRoute extends Route {
  @service modelService; // Inject the model service

  // Route lifecycle method to handle model explanation requests
  model() {
    return A(['linear', 'decisionTree', 'neuralNetwork']);
  }

  // Action to handle the explanation request from the user
  @action
  async explainModelRequest(modelType) {
    try {
      const explanation = await this.modelService.explainModel(modelType);
      this.modelService.set('currentModelExplanation', explanation);
      console.log('Model explanation:', explanation);
    } catch (error) {
      error('ModelExplanationRoute', error);
      this.modelService.set('currentModelExplanation', `Error: ${error.message}`);
    }
  }
}

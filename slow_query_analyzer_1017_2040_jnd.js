// 代码生成时间: 2025-10-17 20:40:30
 * It provides a simple interface to collect and analyze slow queries.
 *
 * @author Your Name
 * @version 1.0
 */

import Ember from 'ember';
import { assert } from '@ember/debug';
import { isEmpty } from '@ember/utils';

// Define a service to handle slow query analysis
export default Ember.Service.extend({
  // Configuration for the slow query threshold
  slowQueryThreshold: 100, // milliseconds

  // Method to analyze a query based on its duration
  analyzeQuery(query) {
    assert('query must be an object with a duration property',
      query && typeof query === 'object' && 'duration' in query
    );

    const duration = query.duration;
    if (duration > this.get('slowQueryThreshold')) {
      return {
        isError: true,
        message: `Query took too long: ${duration}ms`,
      };
    }
    return {
      isError: false,
      message: `Query duration is acceptable: ${duration}ms`,
    };
  },

  // Method to analyze multiple queries
  analyzeQueries(queries) {
    assert('queries must be an array', Array.isArray(queries));

    const results = queries.map(query => this.analyzeQuery(query));
    return results;
  },

  // Method to reset the slow query threshold
  resetSlowQueryThreshold(newThreshold) {
    assert('newThreshold must be a number', typeof newThreshold === 'number');

    this.set('slowQueryThreshold', newThreshold);
  }
});
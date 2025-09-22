// 代码生成时间: 2025-09-23 00:48:37
 * This tool allows users to calculate hash values for strings using various algorithms.
 *
 * @author Your Name
 * @version 1.0
 */

import Ember from 'ember';
import { sha256 } from 'js-sha256';
import { sha512 } from 'js-sha512';

// A component for the hash calculator
export default Ember.Component.extend({
  // The input string for which the hash will be calculated
  inputString: '',

  // The selected algorithm for calculating the hash
  selectedAlgorithm: 'sha256',

  // The computed hash value
  hashValue: Ember.computed('inputString', 'selectedAlgorithm', function() {
    const input = this.get('inputString') || '';
    let hash = '';

    // Check the selected algorithm and calculate the hash accordingly
    switch (this.get('selectedAlgorithm')) {
      case 'sha256':
        hash = sha256(input);
        break;
      case 'sha512':
        hash = sha512(input);
        break;
      default:
        // Handle unsupported algorithms
        this.set('hashValue', 'Unsupported algorithm');
        return;
    }

    // Set the computed hash value
    this.set('hashValue', hash);
  }),

  // Action to handle input changes
  updateHash: function() {
    this.notifyPropertyChange('hashValue');
  }.observes('inputString'),

  // Action to handle algorithm selection changes
  selectAlgorithm: function() {
    this.notifyPropertyChange('hashValue');
  }.observes('selectedAlgorithm'),

  // Error handling for unsupported algorithms
  actions: {
    handleUnsupportedAlgorithm() {
      alert('Unsupported algorithm selected. Please choose SHA-256 or SHA-512.');
    },
  },

  // Documentation for the component properties and methods
  documentation: {
    inputString: 'The string that will be hashed.',
    selectedAlgorithm: 'The algorithm used for hashing.',
    hashValue: 'The result of the hash calculation.',
    updateHash: 'Updates the hash value when the input string changes.',
    selectAlgorithm: 'Updates the hash value when the algorithm selection changes.',
    actions: {
      handleUnsupportedAlgorithm: 'Displays an alert for unsupported algorithms.'
    }
  }
});
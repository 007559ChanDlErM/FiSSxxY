// 代码生成时间: 2025-10-07 03:22:17
import Ember from 'ember';
import DS from 'ember-data';
import { inject as service } from '@ember/service';
import { get, set, computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { A } from '@ember/array';
import { resolve } from 'rsvp';

// Define a service to handle data backup and restore
export default Ember.Service.extend({
  // Inject the store service to persist data
  store: service('store'),

  // Backup data to a JSON string
  backupData: function(data) {
    try {
      if (isEmpty(data)) {
        throw new Error('Data is empty. Nothing to backup.');
      }
      const jsonData = JSON.stringify(data);
      console.log('Data successfully backed up:', jsonData);
      return resolve(jsonData);
    } catch (error) {
      console.error('Error backing up data:', error);
      return resolve(error);
    }
  },

  // Restore data from a JSON string
  restoreData: function(jsonData) {
    try {
      if (isEmpty(jsonData)) {
        throw new Error('JSON data is empty. Nothing to restore.');
      }
      const data = JSON.parse(jsonData);
      console.log('Data successfully restored:', data);
      return resolve(data);
    } catch (error) {
      console.error('Error restoring data:', error);
      return resolve(error);
    }
  }
});

// 代码生成时间: 2025-10-06 02:41:28
 * It includes error handling and follows best practices for maintainability and scalability.
 */

import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import { action, computed } from '@ember/object';
import { A } from '@ember/array';

export default class FirmwareUpdateService extends Service {
  @service('firmware-api') firmwareAPI;

  constructor() {
    super(...arguments);
    this.updateStatus = 'idle'; // idle, checking, updating, error
    this.errors = A();
  }

  // Check for updates available for a device
  checkForUpdates(device) {
    if (this.updateStatus !== 'idle') {
      this.errors.pushObject('An update process is already running.');
      return;
    }

    this.updateStatus = 'checking';
    try {
      // Simulate API call to check for updates
      let updates = this.firmwareAPI.checkForUpdates(device);
      this.handleUpdateAvailability(updates, device);
    } catch (error) {
      this.handleError(error);
    } finally {
      this.updateStatus = 'idle';
    }
  }

  // Handle updates availability
  handleUpdateAvailability(updates, device) {
    if (isEmpty(updates)) {
      this.errors.pushObject('No updates available for this device.');
      return;
    }

    // Update logic here
    this.performUpdate(device, updates);
  }

  // Perform the firmware update
  performUpdate(device, updates) {
    if (this.updateStatus !== 'checking') {
      this.errors.pushObject('Invalid update status.');
      return;
    }

    this.updateStatus = 'updating';
    try {
      // Simulate API call to perform the update
      this.firmwareAPI.updateFirmware(device, updates);
      this.updateStatus = 'idle';
      this.errors.clear(); // Clear errors on successful update
    } catch (error) {
      this.handleError(error);
    }
  }

  // Handle any errors that occur during the update process
  handleError(error) {
    this.updateStatus = 'error';
    this.errors.pushObject(error.message);
    console.error('Firmware update error:', error); // Log to console for debugging
  }

  // Getter for update status
  @computed('updateStatus')
  get updateStatusText() {
    const statusMap = {
      idle: 'Idle',
      checking: 'Checking for updates',
      updating: 'Updating',
      error: 'Error'
    };
    return statusMap[this.updateStatus] || 'Unknown';
  }
}

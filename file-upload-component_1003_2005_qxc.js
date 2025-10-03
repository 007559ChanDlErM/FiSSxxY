// 代码生成时间: 2025-10-03 20:05:40
 * It's designed to be easy to understand and maintain.
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import { v4 as uuidv4 } from 'uuid';

export default class FileUploadComponent extends Component {
  @service store; // Service to store file data
  @tracked file; // Tracked file property
  @tracked error; // Tracked error message property
  @tracked isLoading = false; // Tracked loading state property
  @tracked fileName; // Tracked file name property

  // Function to handle file input change
  @action
  onFileChange(event) {
    const files = event.target.files;
    if (files.length) {
      this.file = files[0]; // Set the first file as the current file
      this.fileName = this.file.name; // Set the file name
    }
  }

  // Function to handle file upload
  @action
  async uploadFile() {
    this.isLoading = true;
    this.error = null; // Reset error message

    try {
      // Generate a unique identifier for the file
      const fileId = uuidv4();
      // Create a formData object to hold the file data
      let formData = new FormData();
      formData.append('file', this.file);
      formData.append('fileId', fileId);

      // Simulate a file upload process (this should be replaced with actual upload logic)
      // Assuming the store service has an upload method that returns a promise
      await this.store.upload(formData);

      // Handle successful upload
      this.isLoading = false;
      this.fileName = null; // Reset file name after upload
    } catch (error) {
      // Handle error
      this.error = error.message;
      this.isLoading = false;
    }
  }

  // Function to reset the component state
  @action
  reset() {
    this.file = null;
    this.fileName = null;
    this.error = null;
    this.isLoading = false;
  }
}

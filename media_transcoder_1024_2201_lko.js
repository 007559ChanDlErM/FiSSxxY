// 代码生成时间: 2025-10-24 22:01:07
 * It provides a simple interface for users to upload media files and select transcoding settings.
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { isPresent } from '@ember/utils';
import { A } from '@ember/array';
import { isEmpty } from '@ember/runloop';
import { task, timeout } from 'ember-concurrency';

export default class MediaTranscoderComponent extends Component {
  @service mediaService; // Service to handle media operations
  @tracked files = A(); // Array to store uploaded files
  @tracked transcodingOptions = {}; // Object to store selected transcoding options
  @tracked transcodingState = 'idle'; // State to track the status of the transcoding process
  @tracked errorMessage = ''; // Error message to display if an error occurs

  // Called when the user selects files to upload
  @action
  onFileSelected(event) {
    const files = event.target.files;
    if (files.length === 0) {
      this.files.clear();
      return;
    }

    this.files = A([...this.files, ...Array.from(files)]);
  }

  // Starts the transcoding process
  @action
  startTranscoding() {
    if (isEmpty(this.files)) {
      this.errorMessage = 'Please select a file to transcode.';
      return;
    }

    this.transcodingState = 'processing';
    this.errorMessage = '';
    this.transcodeTask.perform();
  }

  // Task to handle the transcoding process
  @task({ drop: true })
  *transcodeTask() {
    try {
      // Perform transcoding logic here, this is a placeholder
      yield timeout(5000); // Simulate a long-running task
      this.transcodingState = 'completed';
    } catch (error) {
      this.transcodingState = 'error';
      this.errorMessage = error.message;
    }
  }

  // Resets the component to its initial state
  @action
  resetTranscoder() {
    this.files.clear();
    this.transcodingOptions = {};
    this.transcodingState = 'idle';
    this.errorMessage = '';
  }
}

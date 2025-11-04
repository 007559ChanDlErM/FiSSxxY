// 代码生成时间: 2025-11-04 11:36:59
 * Usage:
 * Include this script in your Ember application and ensure that your image
 * tags have a 'data-src' attribute containing the actual image URL and an
 * 'src' attribute containing a placeholder or low-quality image.
 */

import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { on } from '@ember/object/evented';
import { observer } from '@ember/object/observers';
import { run } from '@ember/runloop';
import { isBlank } from '@ember/utils';

export default EmberObject.extend({
  // An array to keep track of images that have been loaded.
  loadedImages: A(),

  // A method to load an image.
  loadImage: function(image) {
    if (isBlank(image) || this.get('loadedImages').includes(image.src)) {
      // If the image is blank or already loaded, do nothing.
      return;
    }
    try {
      // Try to load the image and add it to the loaded images array.
      const img = new Image();
      img.onload = () => {
        this.set('loadedImages', this.get('loadedImages').pushObject(image.src));
      };
      img.src = image.src;
    } catch (error) {
      // Handle any error that occurs during image loading.
      console.error('Error loading image:', error);
    }
  },

  // A method to check if an image is in the viewport and load it if necessary.
  checkImage: function(image) {
    if (image.complete || image.src === image.dataset.src) {
      // If the image is complete or already showing the actual image, do nothing.
      return;
    }
    // Calculate the viewport dimensions and the image's position.
    const rect = image.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
      // If the image is in the viewport, load it.
      this.loadImage(image);
    }
  },

  // An observer that checks all images when the window scrolls or resizes.
  onScrollOrResize: observer('loadedImages.[]', function() {
    run(() => {
      document.querySelectorAll('img[data-src]').forEach((image) => {
        this.checkImage(image);
      });
    });
  }),

  // A method to initiate the lazy loading process.
  initLazyLoad: function() {
    // Attach event listeners for scroll and resize.
    window.addEventListener('scroll', this.onScrollOrResize);
    window.addEventListener('resize', this.onScrollOrResize);

    // Check images on initial load.
    this.onScrollOrResize();
  }
});
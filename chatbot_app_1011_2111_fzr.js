// 代码生成时间: 2025-10-11 21:11:47
 * This application provides a simple chatbot interface for users to interact with.
 * It handles user input and processes it, simulating a conversation.
 */

import Ember from 'ember';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Chatbot extends Ember.Component {
  @tracked messages = [];
  @tracked userInput = '';
  @tracked error = null;
  @tracked isLoading = false;
  
  // Define sample responses for demonstration purposes.
  responses = {
    'hello': 'Hi there! How can I help you?',
    'help': 'I\'m here to assist you. What do you need help with?',
    'goodbye': 'Goodbye! Have a great day!',
  };
  
  // Handle user input and process it.
  @action
  sendMessage() {
    if (this.userInput.trim() === '') {
      return;
    }
    
    this.isLoading = true;
    this.error = null;
    this.messages.push({
      from: 'user',
      text: this.userInput,
    });
    
    // Simulate API call with setTimeout to mimic network delay.
    setTimeout(() => {
      // Check if the message is in the predefined responses.
      const response = this.responses[this.userInput.toLowerCase()];
      if (response) {
        this.messages.push({
          from: 'bot',
          text: response,
        });
      } else {
        this.messages.push({
          from: 'bot',
          text: 'I\'m not sure how to respond to that.',
        });
      }
      this.userInput = '';
      this.isLoading = false;
    }, 1000);
  }
  
  // Clear the user input field.
  @action
  clearInput() {
    this.userInput = '';
  }
  
  // Handle the input field change and update the user input state.
  @action
  onInput(event) {
    this.userInput = event.target.value;
  }
}

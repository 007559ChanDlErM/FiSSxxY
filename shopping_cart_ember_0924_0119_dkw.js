// 代码生成时间: 2025-09-24 01:19:57
import Ember from 'ember';
import { computed } from '@ember/object';
import { A } from '@ember/array';

// Define the CartItem model
const CartItem = Ember.Object.extend({
  id: null,
  name: null,
  price: null,
  quantity: 1,

  // Computed property to calculate the total price of the item
  totalPrice: computed('price', 'quantity', function() {
    return this.get('quantity') * this.get('price');
  }),

  // Increase the quantity of the item by 1
  incrementQuantity() {
    this.set('quantity', this.get('quantity') + 1);
  },

  // Decrease the quantity of the item by 1
  decrementQuantity() {
    this.set('quantity', Math.max(this.get('quantity') - 1, 1));
  },

  // Remove the item from the cart
  remove() {
    this.destroy();
  },
});

// Define the Cart model
const Cart = Ember.Service.extend({
  items: A(),
  total: null,

  init() {
    this._super(...arguments);
    this.set('total', 0);
  },

  // Add an item to the cart
  addItem(itemData) {
    let item = this.items.findBy('id', itemData.id);
    if (item) {
      item.incrementQuantity();
    } else {
      item = CartItem.create(itemData);
      this.get('items').addObject(item);
    }
    this.updateTotal();
  },

  // Remove an item from the cart
  removeItem(itemId) {
    let item = this.items.findBy('id', itemId);
    if (item) {
      item.remove();
      this.updateTotal();
    } else {
      // Handle error if item not found
      throw new Error(`Item with id ${itemId} not found in cart`);
    }
  },

  // Update the total price of the cart
  updateTotal() {
    let total = this.get('items').reduce((sum, item) => sum + item.get('totalPrice'), 0);
    this.set('total', total);
  },

  // Clear the cart
  clearCart() {
    this.get('items').clear();
    this.set('total', 0);
  },
});

// Register Cart service
export default Cart;

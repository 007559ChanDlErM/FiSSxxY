// 代码生成时间: 2025-10-30 03:43:56
import Ember from 'ember';

// Define a model to represent study progress
const StudyProgress = Ember.Object.extend({
  courses: Ember.A([]),

  // Adds a new course to the study progress
  addCourse(course) {
    this.get('courses').pushObject(course);
  },

  // Removes a course from the study progress
  removeCourse(course) {
    this.get('courses').removeObject(course);
  },

  // Updates the progress of a course
  updateCourseProgress(courseId, progress) {
    let course = this.get('courses').findBy('id', courseId);
    if (course) {
      course.set('progress', progress);
    } else {
      throw new Error(`Course with ID ${courseId} not found`);
    }
  },

  // Returns the total progress across all courses
  getTotalProgress() {
    return this.get('courses').reduce((total, course) => {
      return total + course.get('progress');
    }, 0);
  }
});

// Define a controller to manage study progress
export default Ember.Controller.extend({
  studyProgress: Ember.computed(function() {
    return StudyProgress.create();
  }),

  actions: {
    // Action to add a new course
    addCourseAction(course) {
      try {
        this.get('studyProgress').addCourse(course);
      } catch (error) {
        console.error('Error adding course:', error.message);
      }
    },

    // Action to remove a course
    removeCourseAction(course) {
      try {
        this.get('studyProgress').removeCourse(course);
      } catch (error) {
        console.error('Error removing course:', error.message);
      }
    },

    // Action to update course progress
    updateProgressAction(courseId, progress) {
      try {
        this.get('studyProgress').updateCourseProgress(courseId, progress);
      } catch (error) {
        console.error('Error updating progress:', error.message);
      }
    }
  }
});
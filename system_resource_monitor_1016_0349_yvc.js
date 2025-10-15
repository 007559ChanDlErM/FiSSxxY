// 代码生成时间: 2025-10-16 03:49:17
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

// Service to interact with system resources
import SystemResourceService from '../services/system-resource';

// Component to display system resources
export default class SystemResourceMonitorComponent extends Component {
  // Inject the system resource service
  @service systemResourceService;

  // Tracked properties to store system resource data
  @tracked cpuUsage = 0;
  @tracked memoryUsage = 0;
  @tracked diskUsage = 0;

  // Initialize the component
  constructor() {
    super(...arguments);
    this.fetchSystemResources();
  }

  // Method to fetch system resources
  async fetchSystemResources() {
    try {
      // Fetch CPU, memory, and disk usage
      const resources = await this.systemResourceService.getSystemResources();
      this.cpuUsage = resources.cpu;
      this.memoryUsage = resources.memory;
      this.diskUsage = resources.disk;
    } catch (error) {
      // Handle errors gracefully
      console.error('Failed to fetch system resources:', error);
    }
  }

  // Action to refresh system resources
  @action
  refreshResources() {
    this.fetchSystemResources();
  }
}
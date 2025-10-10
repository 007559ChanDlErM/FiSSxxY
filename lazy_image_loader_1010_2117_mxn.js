// 代码生成时间: 2025-10-10 21:17:38
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { DEBUG } from '@glimmer/env';

// 图片懒加载组件
export default class LazyImageLoader extends Component {
  // 跟踪属性，用于存储图片是否已加载
  @tracked isImageLoaded = false;
  @tracked intersectionObserver;

  // 组件初始化时创建IntersectionObserver
  constructor() {
    super(...arguments);
    // 创建IntersectionObserver实例
    this.intersectionObserver = new IntersectionObserver(this.handleIntersect.bind(this), {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
  }

  // IntersectionObserver回调函数，判断图片是否在视口中
  handleIntersect(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadImage();
        observer.unobserve(entry.target); // 图片加载后取消观察
      }
    });
  }

  // 加载图片
  @action
  loadImage() {
    try {
      if (this.isImageLoaded) {
        return; // 如果图片已加载，则不重复加载
      }
      const img = this.args.src; // 获取图片源地址
      const image = new Image();
      image.src = img;
      image.onload = () => {
        this.isImageLoaded = true; // 图片加载完成，更新状态
      };
      image.onerror = () => {
        if (DEBUG) {
          console.error(`Failed to load image: ${img}`); // 错误处理
        }
      };
    } catch (error) {
      if (DEBUG) {
        console.error('Error loading image:', error); // 错误处理
      }
    }
  }

  // 组件销毁时取消所有IntersectionObserver观察
  willDestroy() {
    super.willDestroy(...arguments);
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }
}

// 代码生成时间: 2025-09-29 22:02:17
import Ember from 'ember';
import RSVP from 'rsvp';
import fetch from 'fetch'; // 假设已经有一个fetch polyfill可以使用

// 微服务通信中间件
const MicroserviceMiddleware = Ember.Service.extend({

  // 发送请求到微服务
  async sendMessage(serviceName, message) {
    try {
      // 定义微服务的基础URL，这里需要根据实际情况进行配置
      const baseUrl = `http://${serviceName}.local`;

      // 发送POST请求到微服务
      const response = await fetch(`${baseUrl}/api/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      // 检查响应状态
      if (!response.ok) {
        throw new Error(`Failed to send message to ${serviceName}`);
      }

      // 获取响应数据
      const data = await response.json();

      // 返回响应数据
      return data;

    } catch (error) {
      // 错误处理
      console.error(`Error sending message to ${serviceName}: ${error.message}`);
      throw error;
    }
  },

  // 接收来自微服务的消息
  onMessage(serviceName, callback) {
    // 定义WebSocket连接的URL
    const url = `ws://${serviceName}.local/ws`;

    // 创建WebSocket连接
    const socket = new WebSocket(url);

    // 监听WebSocket消息
    socket.onmessage = (event) => {
      try {
        // 解析接收到的消息
        const message = JSON.parse(event.data);

        // 调用回调函数处理消息
        callback(message);
      } catch (error) {
        // 错误处理
        console.error(`Error parsing message from ${serviceName}: ${error.message}`);
      }
    };

    // 监听WebSocket错误
    socket.onerror = (error) => {
      console.error(`WebSocket error: ${error.message}`);
    };
  },
});

// 注册服务
export default MicroserviceMiddleware;

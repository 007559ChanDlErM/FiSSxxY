// 代码生成时间: 2025-09-24 16:35:27
import Ember from 'ember';

export default Ember.Component.extend({
    // 输入的JSON数据
    inputJson: null,
    // 输出的JSON数据
    outputJson: null,

    // 转换JSON数据
    actions: {
        transform() {
            try {
                // 尝试解析输入的JSON数据
                let parsedInput = JSON.parse(this.get('inputJson'));
                // 将解析后的数据转换为字符串
                let output = JSON.stringify(parsedInput, null, 2);
                // 设置输出的JSON数据
                this.set('outputJson', output);
            } catch (error) {
                // 错误处理
                this.set('outputJson', 'Invalid JSON input');
                console.error('JSON parse error:', error);
            }
        }
    }
});
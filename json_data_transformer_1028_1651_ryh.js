// 代码生成时间: 2025-10-28 16:51:28
const { isEmpty } = Ember;

/**
 * 转换器类，用于处理JSON数据格式转换
 *
 * @class JsonDataTransformer
 * @constructor
 */
export default class JsonDataTransformer {

  /**
   * 将JSON数据从一个格式转换为另一个格式
   *
   * @method transform
   * @param {Object} rawData 原始JSON数据对象
   * @param {Object} schema 转换规则对象
   * @return {Object} 转换后的JSON数据对象
   * @throws {Error} 如果输入数据为空或无效
   */
  transform(rawData, schema) {
    if (isEmpty(rawData) || isEmpty(schema)) {
      throw new Error('Invalid input data or schema');
    }

    let transformedData = {};
    for (let key in schema) {
      if (schema.hasOwnProperty(key)) {
        let targetKey = schema[key];
        if (rawData.hasOwnProperty(targetKey)) {
          transformedData[key] = rawData[targetKey];
        } else {
          // 如果原始数据中缺少对应键，可以选择抛出错误或设置默认值
          throw new Error(`Missing key in rawData: ${targetKey}`);
        }
      }
    }

    return transformedData;
  }

}

// 使用示例
const rawData = {
  "name": "John",
  "age": 30,
  "city": "New York"
};

const schema = {
  "userName": "name",
  "userAge": "age"
};

try {
  const transformer = new JsonDataTransformer();
  const transformedData = transformer.transform(rawData, schema);
  console.log(transformedData); // { userName: 'John', userAge: 30 }
} catch (error) {
  console.error(error);
}

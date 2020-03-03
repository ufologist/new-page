import Validator from 'validatorjs';

// Error messages with multilingual support
// Error messages are in English by default
// Validator.useLang('zh');

/**
 * 简化 validatorjs 用于验证单个值
 * 
 * 从 JSON 数据格式规范中理解的最抽象的数据类型都表达了什么
 * - 有
 *   - 单元
 *     - 字符: string
 *     - 数字: number
 *     - 布尔: boolean
 *   - 组合
 *     - 无序: object
 *     - 有序: array
 * - 没有
 *   - 空: null
 * 
 * @param {*} value 
 * @param {object} rules
 * @param {object} [customErrorMessages]
 * 
 * @return {string} errorMessage 当验证通过时, 返回的错误信息为空字符串
 * @see https://github.com/skaterdav85/validatorjs#basic-usage
 * @see https://github.com/skaterdav85/validatorjs#available-rules
 */
export default function(value, rules, customErrorMessages) {
    var validator = new Validator({
        value: value
    }, {
        value: rules
    }, customErrorMessages);
    validator.setAttributeNames({
        value: ''
    });

    var errorMessage = '';
    // 验证失败取错误信息
    if (validator.fails()) {
        // 在 customErrorMessages 中设置规则的自定义错误信息
        // - 为 number/true/false/undefined/object/array 时, validator.errors 拿到的 errorMessage 是 undefined
        // - 为空字符串时, validator.errors 拿到的 errorMessage 是空字符串, 需要设置为 undefined
        // - 为 null 时, 会造成 validator.fails 执行报错
        errorMessage = validator.errors.first('value') || undefined;
    }

    return String(errorMessage);
};
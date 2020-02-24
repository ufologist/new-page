import Validator from 'validatorjs';

/**
 * 简化 validatorjs 用于验证单个值
 * 
 * @param {*} value 
 * @param {*} rules
 * @see https://github.com/skaterdav85/validatorjs#available-rules
 */
export default function(value, rules) {
    return new Validator({
        value: value
    }, {
        value: rules
    }).passes();
};
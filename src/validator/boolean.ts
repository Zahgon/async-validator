import { isEmptyValue } from '../util';
import rules from '../rule';
import { ExecuteValidator } from '../interface';

const boolean: ExecuteValidator = (rule, value, callback, source, options) => {
    throw new Error("STUB");
};

export default boolean;

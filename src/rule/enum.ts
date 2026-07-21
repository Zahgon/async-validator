import { ExecuteRule } from '../interface';
import { format } from '../util';

const ENUM = 'enum' as const;

const enumerable: ExecuteRule = (rule, value, source, errors, options) => {
    throw new Error("STUB");
};

export default enumerable;

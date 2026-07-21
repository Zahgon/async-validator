import { ExecuteValidator } from '../interface';
import rules from '../rule';
import { isEmptyValue } from '../util';

const ENUM = 'enum' as const;

const enumerable: ExecuteValidator = (
  rule,
  value,
  callback,
  source,
  options,
) => {
    throw new Error("STUB");
};

export default enumerable;

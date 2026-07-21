import {
  format,
  complementError,
  asyncMap,
  warning,
  deepMerge,
  convertFieldsError,
} from './util';
import validators from './validator/index';
import { messages as defaultMessages, newMessages } from './messages';
import {
  InternalRuleItem,
  InternalValidateMessages,
  Rule,
  RuleItem,
  Rules,
  ValidateCallback,
  ValidateMessages,
  ValidateOption,
  Values,
  RuleValuePackage,
  ValidateError,
  ValidateFieldsError,
  SyncErrorType,
  ValidateResult,
} from './interface';

export * from './interface';

/**
 *  Encapsulates a validation schema.
 *
 *  @param descriptor An object declaring validation rules
 *  for this schema.
 */
class Schema {
  // ========================= Static =========================
  static register = function register(type: string, validator) {
      throw new Error("STUB");
  };

  static warning = warning;

  static messages = defaultMessages;

  static validators = validators;

  // ======================== Instance ========================
  rules: Record<string, RuleItem[]> = null;
  _messages: InternalValidateMessages = defaultMessages;

  constructor(descriptor: Rules) {
      throw new Error("STUB");
  }

  define(rules: Rules) {
      throw new Error("STUB");
  }

  messages(messages?: ValidateMessages) {
    if (messages) {
      this._messages = deepMerge(newMessages(), messages);
    }
    return this._messages;
  }

  validate(
    source: Values,
    option?: ValidateOption,
    callback?: ValidateCallback,
  ): Promise<Values>;
  validate(source: Values, callback: ValidateCallback): Promise<Values>;
  validate(source: Values): Promise<Values>;

  validate(source_: Values, o: any = {}, oc: any = () => {
      throw new Error("STUB");
  }): Promise<Values> {
    let source: Values = source_;
    let options: ValidateOption = o;
    let callback: ValidateCallback = oc;
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback(null, source);
      }
      return Promise.resolve(source);
    }

    function complete(results: (ValidateError | ValidateError[])[]) {
      let errors: ValidateError[] = [];
      let fields: ValidateFieldsError = {};

      function add(e: ValidateError | ValidateError[]) {
        if (Array.isArray(e)) {
          errors = errors.concat(...e);
        } else {
          errors.push(e);
        }
      }

      for (let i = 0; i < results.length; i++) {
        add(results[i]);
      }
      if (!errors.length) {
        callback(null, source);
      } else {
        fields = convertFieldsError(errors);
        (callback as (
          errors: ValidateError[],
          fields: ValidateFieldsError,
        ) => void)(errors, fields);
      }
    }

    if (options.messages) {
      let messages = this.messages();
      if (messages === defaultMessages) {
        messages = newMessages();
      }
      deepMerge(messages, options.messages);
      options.messages = messages;
    } else {
      options.messages = this.messages();
    }

    const series: Record<string, RuleValuePackage[]> = {};
    const keys = options.keys || Object.keys(this.rules);
    keys.forEach(z => {
        throw new Error("STUB");
    });
    const errorFields = {};
    return asyncMap(
      series,
      options,
      (data, doIt) => {
          throw new Error("STUB");
      },
      results => {
          throw new Error("STUB");
      },
      source,
    );
  }

  getType(rule: InternalRuleItem) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern';
    }
    if (
      typeof rule.validator !== 'function' &&
      rule.type &&
      !validators.hasOwnProperty(rule.type)
    ) {
      throw new Error(format('Unknown rule type %s', rule.type));
    }
    return rule.type || 'string';
  }

  getValidationMethod(rule: InternalRuleItem) {
    if (typeof rule.validator === 'function') {
      return rule.validator;
    }
    const keys = Object.keys(rule);
    const messageIndex = keys.indexOf('message');
    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }
    if (keys.length === 1 && keys[0] === 'required') {
      return validators.required;
    }
    return validators[this.getType(rule)] || undefined;
  }
}

export default Schema;

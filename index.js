class ArgumentParser {
  constructor() {
    this.meta = {};
    this.args = {};
    this.argRegex = /^--[a-z]+(-[a-z]+)*$/;
  }

  add_argument(arg, opt = {}) {
    if (!arg) {
      throw new Error('Missing argument');
    }
    if (typeof arg !== 'string' || !this.argRegex.test(arg)) {
      throw new Error(`Invalid argument: ${arg}`);
    }
    const { type, default: defaultValue, help = '' } = opt;
    
    if (type && !['string', 'boolean', 'number'].includes(type)) {
      throw new Error(`Invalid type value: ${type}`);
    }
    if (type && defaultValue && typeof defaultValue !== type) {
      throw new Error(`Invalid type of default value: ${defaultValue}`);
    }
    if (help && typeof help !== 'string') {
      throw new Error(`Invalid type of help message: ${help}`);
    }
    arg = this._parseArgument(arg);
    this.meta[arg] = { type, default: defaultValue, help };
    this.args[arg] = defaultValue;
  }

  parse_args() {
    const args = process.argv || [];
    let currentArg = null;
    args.forEach((arg) => {
      if (this.argRegex.test(arg)) {
        arg = this._parseArgument(arg);

        if (!this.meta[arg]) {
          throw new Error(`Argument ${arg} unsupported`);
        }

        currentArg = arg;
        return
      }

      if (currentArg) {
        const type = this.meta[currentArg].type;
        if (type === 'number') {
          arg = Number.parseFloat(arg);
        } else if (type === 'boolean') {
          if (arg !== 'true' && arg !== 'false') {
            throw new Error(`Invalid value for boolean, should be either true or false but received ${arg}`);
          }
          arg = arg === 'true';
        }
        this.args[currentArg] = arg;
        currentArg = null;
      }
    });
    return this.args;
  }

  _parseArgument(arg) {
    return arg.slice(2).replace(/-/g, '_');
  }
}

module.exports = ArgumentParser;

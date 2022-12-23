import FormConfig from "../types/interfaces/FormConfig.interface";
import {ConfigError} from "../errors/config-error";
import {Phormal} from "../Phormal";

export class ConfigResolver {

  constructor(
    private config: FormConfig,
    private phormal: Phormal
  ) {
    this.validateConfig()
    this.setConfig()
  }

  validateConfig() {
    if (!this.config.el)
      throw new ConfigError('Missing required config property "el"')

    const elNotValidSelector = !this.config.el.startsWith('.') && !this.config.el.startsWith('#');
    if (this.config.el && elNotValidSelector)
      throw new ConfigError('Config property "el", needs to be a unique HTML selector')

    if (![undefined, 'active', 'passive'].includes(this.config.validation))
      throw new ConfigError(`Invalid value for config option "validation": ${this.config.validation}`)
    
    if (![undefined, 'basic', 'material'].includes(this.config.theme))
      throw new ConfigError(`Unknown theme name: ${this.config.theme}`)
  }

  setConfig() {
    this.phormal._config = {
      ...this.config,
      validation: this.config.validation || 'active',
      language: this.config.language || 'en',
      theme: this.config.theme || 'basic'
    };
  }
}
import FormConfig, {FormFieldConfig} from "../types/interfaces/FormConfig.interface";
import {ConfigError} from "../errors/config-error";
import {Phormal} from "../Phormal";

export class ConfigResolver {

  constructor(
    private config: FormConfig,
    private fields: Record<string, FormFieldConfig>,
    private phormal: Phormal
  ) {
    this.validateConfig()
    this.setConfig()
  }

  validateConfig() {
    Object.entries(this.fields).forEach(field => {
      const [fieldName,] = field
      const forbiddenFieldNames = ['_init', '$values', '$validate', '_setValue', '_getValue', '_config', '_unprocessedFields', '_fields']
      if (forbiddenFieldNames.includes(fieldName))
        throw new ConfigError(
          'The following words are reserved by the library, and cannot be used as field names: '
          + forbiddenFieldNames.join(', ')
        )
    })

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
      fallbackLanguage: this.config.fallbackLanguage || 'en',
      theme: this.config.theme || 'basic'
    };
  }
}

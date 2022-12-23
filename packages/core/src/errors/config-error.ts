export class ConfigError extends Error {

  constructor(
    errorMessage: string
  ) {
    super();
    this.name = 'ConfigError'
    this.message = `[Phormal] ${errorMessage}`
  }
}
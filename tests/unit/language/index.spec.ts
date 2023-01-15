import {describe, expect, it} from "vitest";
import {useRegex, useLength, useRequired, useValidZip, useEmail, useUrl, useMinMax} from "../../../packages/core/src";
import {ErrorMessageObject} from "@phormal/core/src/types/globals";

const allSupportedLanguages = [
  'en', // English
  'ru', // Russian
  'es', // Spanish
  'tr', // Turkish
  // 'fa', // Persian
  'fr', // French
  'de', // German
  'ja', // Japanese
  'it', // Italian
  'pt', // Portuguese
  'zh', // Chinese
  'vi', // Vietnamese
];

const testThatAllLanguagesAreTranslated = (errorMessages: ErrorMessageObject[]) => {
  for (const errorMessage of errorMessages) {
    for (const language of allSupportedLanguages) {
      if (!errorMessage[language]) {
        throw new Error(`Language "${language}" is not translated for error message where "en" === "${errorMessage.en}"`);
      }

      expect(errorMessage[language]).toBeDefined()
    }
  }
}

describe('Translations objects', () => {
  it('Has a translation for all languages  in in use-email', () => {
    const errorMessages = [
      useEmail().errorMessages?.email as ErrorMessageObject
    ]
    testThatAllLanguagesAreTranslated(errorMessages)
  })

  it('Has a translation for all languages in use-length', () => {
    const errorMessages = [
      useLength(1).errorMessages?.length as ErrorMessageObject,
      useLength(1, 2).errorMessages?.minLength as ErrorMessageObject,
      useLength(null, 2).errorMessages?.maxLength as ErrorMessageObject,
    ]
    testThatAllLanguagesAreTranslated(errorMessages)
  })

  it('Has a translation for all languages in use-regex', () => {
    const errorMessages = [
      useRegex(/.*/).errorMessages?.regex as ErrorMessageObject,
      useRegex(/.*/, 'XXX').errorMessages?.regexReadableFormat as ErrorMessageObject,
    ]
    testThatAllLanguagesAreTranslated(errorMessages)
  })

  it('Has a translation for all languages in use-required', () => {
    const errorMessages = [
      useRequired().errorMessages?.required as ErrorMessageObject,
    ]
    testThatAllLanguagesAreTranslated(errorMessages)
  })

  it('Has a translation for all languages in use-valid-zip', () => {
    const errorMessages = [
      useValidZip().errorMessages?.zip as ErrorMessageObject,
    ]
    testThatAllLanguagesAreTranslated(errorMessages)
  })

  it('Has a translation for all languages in use-url', () => {
    const errorMessages = [
      useUrl().errorMessages?.url as ErrorMessageObject,
      useUrl({allowedHosts: ['example.com']}).errorMessages?.url_host as ErrorMessageObject,
      useUrl({allowedProtocols: ['https']}).errorMessages?.url_protocol as ErrorMessageObject,
    ]
    testThatAllLanguagesAreTranslated(errorMessages)
  })

  it('Has a translation for all languages in use-min-max', () => {
    const errorMessages = [
      useMinMax(1).errorMessages?.min_value as ErrorMessageObject,
      useMinMax(undefined, 2).errorMessages?.max_value as ErrorMessageObject,
      useMinMax(1, 2).errorMessages?.between_values as ErrorMessageObject,
    ]
    testThatAllLanguagesAreTranslated(errorMessages)
  })
})

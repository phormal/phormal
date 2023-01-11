# Supported languages

Created at: 2023-01-10

## Adding a language

Error messages and eventual other texts of this library need to be translated to different languages. Every time a new language is added, two things need to be considered:

1. The language needs to be added to the list of supported languages in `tests/unit/language/index.spec.ts`.
2. Translations for the language need to be added to **all** texts available in the library. A list of where to add translations is found below in this document. Don't worry too much though, about potentially missing out on a text to translate; the unit tests will fail if a translation is missing, notifying you where to add the missing translation.

### Side note on initial language selection

The initial selection of languages, was based on the 12 most used languages in the web, as of January 2023: https://w3techs.com/technologies/overview/content_language

## List of texts

* `packages/use-email/src/use-email.ts` 1 text
* `packages/use-length/src/use-length.ts` 3 texts
* `packages/use-regex/src/use-regex.ts` 2 texts
* `packages/use-required/src/use-required.ts` 1 text
* `packages/use-valid-zip/src/use-valid-zip.ts` 1 text


## Adding a text

When adding a new text, the following steps need to be taken:

1. All languages defined in `tests/unit/language/index.spec.ts` need to have their own translation for the new text.
2. A unit test needs to be added in that very same file. Simply import the object for the new text, and run the `testThatAllLanguagesAreTranslated` function on it. This will ensure that all languages are translated, and that no language is missing a translation.
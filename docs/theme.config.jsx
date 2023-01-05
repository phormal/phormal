export default {
  logo: <span>Phormal</span>,
  project: {
    link: 'https://github.com/phormal/phormal',
  },
  docsRepositoryBase: 'https://github.com/phormal/phormal/tree/master/docs',
  feedback: {
    content: null,
  },
  darkMode: false,
  footer: {
    text: <span>
      MIT {new Date().getFullYear()} © <a href="https://github.com/tomosterlund" target="_blank">Tom Österlund</a>.
    </span>,
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Phormal',
      description: 'Form generator with built in validation and theming. Can be used with React, Vue, Svelte or any other JavaScript framework.',
    }
  },
}
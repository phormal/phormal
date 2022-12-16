<script lang="ts">
import {SuperForm} from '../packages/core/src'
import {useRequired} from '../packages/core/src'
import {useLength} from '../packages/core/src'
import useAutoCapitalize from "../packages/use-auto-capitalize/src";
import useValidZip from "../packages/use-valid-zip/src";
import useEmail from "../packages/use-email/src";

export default {
  name: 'App',

  data() {
    return {
      form: undefined,

      formFields: {
        firstName: {
          label: 'First name',
          hooks: [useRequired(), useLength(1, 155), useAutoCapitalize()],
          value: 'John',
          handleOnBlur: () => this.firstNameBlurN++,
          hideIf: {
            lastName: 'empty'
          }
        },
        lastName: {
          label: 'Last name',
          hooks: [useRequired(), useLength(1, 155)],
          value: 'Doe',
          handleOnFocus: () => this.lastNameFocusN += 1,
        },
        yyyy: {
          value: '',
          label: 'YYYY',
          row: 'birthdate',
        },
        mm: {
          value: '',
          label: 'MM',
          row: 'birthdate',
        },
        dd: {
          value: '',
          label: 'DD',
          row: 'birthdate',
        },
        country: {
          type: 'select',
          label: 'Country',
          hooks: [useRequired()],
          value: 'US',
          options: [
            {value: 'US', label: 'United States'},
            {value: 'CA', label: 'Canada'},
            {value: 'MX', label: 'Mexico'},
            {value: 'FR', label: 'France'},
            {value: 'DE', label: 'Germany'},
          ],
        },
        zip: {
          label: 'ZIP code',
          hooks: [useRequired(), useValidZip()],
          // value: '51378',
        },
        email: {
          label: 'Email',
          hooks: [useRequired(), useEmail()],
          value: ''
        },
        newsletter: {
          type: 'checkbox',
          label: 'Newsletter',
          hooks: [],
          value: true,
        },
      },

      lastNameFocusN: 0,
      firstNameBlurN: 0,
    }
  },

  mounted() {
    this.form = new SuperForm(this.formFields, {
      el: '#super-form',
      validation: 'active',
      language: 'de',
      theme: 'material',
    })

    this.form.init()
  },

  methods: {
    runValidation() {
      this.form.validate()
    },

    getValues() {
      console.log(this.form.values())
      // console.log(this.form.firstName)
      // console.log(this.form.lastName)
    }
  },
}
</script>

<template>
  <div>
    <h1>SuperForm</h1>
  </div>
  <div id="super-form"></div>

  <button @click="runValidation">Validate</button>
  <button @click="getValues">Get values</button>

  <p>First name was blurred {{ firstNameBlurN }} times</p>
  <p>Last name was focused {{ lastNameFocusN }} times</p>
</template>

<style>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

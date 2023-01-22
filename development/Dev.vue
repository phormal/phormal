<script lang="ts">
import {Phormal, useEmail, useLength, useRequired, useValidZip, useAutoCapitalize} from '../packages/core/src'

export default {
  name: 'App',

  components: {
    Phormal,
  },

  data() {
    return {
      form: undefined,

      formFields: {
        firstName: {
          label: 'First name',
          hooks: [useRequired(), useLength(1, 155), useAutoCapitalize()],
          value: 'John',
          handleOnBlur: () => this.firstNameBlurN++,
          focus: true,
          // hideIf: {
          //   lastName: 'empty'
          // }
        },
        date: {
          type: 'date',
          label: 'Date',
          hooks: [useRequired()],
          min: '2023-01-01',
          max: '2023-01-31',
        },
        datetimeLocal: {
          type: 'datetime-local',
          label: 'Datetime',
          hooks: [useRequired()],
          value: '2023-01-01T00:00',
          min: '2023-01-01T00:00',
          max: '2023-03-20T00:00',
        },
        time: {
          type: 'time',
          label: 'Time',
          hooks: [useRequired()],
          value: '00:00',
        },
        newsletter: {
          type: 'checkbox',
          label: 'Do you want to receive our newsletter?',
          hooks: [],
          disabled: true,
          value: true,
        },
        acceptTerms: {
          type: 'checkbox',
          label: 'Accept Terms & conditions for this site',
          value: false,
        },
        lastName: {
          label: 'Last name',
          hooks: [useRequired(), useLength(1, 155)],
          value: '',
          handleOnFocus: () => this.lastNameFocusN += 1,
          disabled: true,
        },
        yyyy: {
          value: '',
          label: 'YYYY',
          row: 'birthdate',
          placeholder: 'YYYY',
        },
        mm: {
          value: '',
          label: 'MM',
          row: 'birthdate',
          placeholder: 'MM',
        },
        dd: {
          value: '',
          label: 'DD',
          row: 'birthdate',
          placeholder: 'DD',
        },
        country: {
          type: 'select',
          label: 'Country',
          hooks: [useRequired()],
          value: 'DE',
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
          value: '',
        },
        delivery: {
          type: 'radiogroup',
          label: 'Delivery to',
          value: 'packstation',
          options: [
            { label: 'Billing', value: 'billing' },
            { label: 'Shipping', value: 'shipping', disabled: true },
            { label: 'Packstation', value: 'packstation' },
          ],
        },
        field3: {
          label: 'Baz',
          type: 'select',
          options: [
            {value: '1', label: 'One'},
            {value: '2', label: 'Two'},
            {value: '3', label: 'Three'},
          ],
          disabled: true,
          // value: '',
        },
      },

      lastNameFocusN: 0,
      firstNameBlurN: 0,
      values: {},
    }
  },

  mounted() {
    this.form = new Phormal(this.formFields, {
      el: '#phormal',
      validation: 'active',
      language: 'de',
      theme: 'material',
      // theme: 'basic',
    })

    this.values = this.form.$values()
  },

  methods: {
    runValidation() {
      console.log(this.form.$validate())
      // console.log(this.form.$isDirty);
      if (this.$refs.phormal) {
        this.$refs.phormal.$validate()
      }
    },

    getValues() {
      if (this.$refs.phormal) {
        this.values = this.$refs.phormal.$values()
      } else {
        console.log(this.form.$values())
        this.values = this.form.$values()
      }
    }
  },
}
</script>

<template>
  <div class="wrapper">
    <div>
      <h1>SuperForm</h1>
    </div>

<!--    <Phormal ref="phormal" :fields="formFields" :config="{ theme: 'basic' }" />-->
    <div id="phormal"></div>

    <button @click="runValidation">Validate</button>
    <button @click="getValues">Get values</button>
    <button @click="form.$destroy()">Destroy</button>

    <p>First name was blurred {{ firstNameBlurN }} times</p>
    <p>Last name was focused {{ lastNameFocusN }} times</p>

    <code>
      <pre>{{ values }}</pre>
    </code>
  </div>
</template>

<style>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

pre {
  background: #000;
  color:yellow;
  padding: 1em;
}

.wrapper {
  margin: 0 auto;
  max-width: 90%;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

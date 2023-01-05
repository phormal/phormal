<script lang="ts">
import {Phormal} from '../packages/core/src'
import useRequired from "../packages/use-required/src";
import useLength from "../packages/use-length/src";
import useAutoCapitalize from "../packages/use-auto-capitalize/src";
import useValidZip from "../packages/use-valid-zip/src";
import useEmail from "../packages/use-email/src";
// import {Phormal} from "../packages/component-vue3/src";

export default {
  name: 'App',

  components: {
    Phormal,
  },

  data() {
    return {
      form: undefined,

      formFields: {
        newsletter: {
          type: 'checkbox',
          label: 'Newsletter',
          hooks: [],
          // disabled: true,
          // value: true,
        },
        firstName: {
          // label: 'First name',
          hooks: [useRequired(), useLength(1, 155), useAutoCapitalize()],
          value: 'John',
          handleOnBlur: () => this.firstNameBlurN++,
          // hideIf: {
          //   lastName: 'empty'
          // }
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
            { label: 'Shipping', value: 'shipping' },
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

<script lang="ts">

import useRequired from "../../packages/use-required/src";
import useLength from "../../packages/use-length/src";
import {PhormalVue3} from "../../packages/component-vue3/src";

export default {
  name: 'Vue3Component',

  components: {
    PhormalVue3,
  },

  data() {
    return {
      formFields: {
        field1: {
          label: 'Foo',
          hooks: [useLength(undefined, 10), useRequired()],
          value: 'John',
        },
        field2: {
          type: 'checkbox',
          label: 'Bar',
          value: '',
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
      config: {
        theme: 'basic'
      },
      values: {},
    }
  },

  methods: {
    getValues() {
      this.values = this.$refs.phormal.$values()
    },

    validate() {
      this.$refs.phormal.$validate()
    }
  }
}

</script>


<template>
  <PhormalVue3 ref="phormal" :config="config" :fields="formFields" />

  <button id="getvalues" @click="getValues">Get values</button>
  <button id="validate-button" @click="validate">Validate</button>

  <code>
    <pre id="values">
      {{ values }}
    </pre>
  </code>
</template>

<style>
pre {
  background: #000;
  color:yellow;
  padding: 1em;
}

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


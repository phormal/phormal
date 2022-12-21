<script lang="ts">

import useRequired from "../../packages/use-required/src";
import useLength from "../../packages/use-length/src";
import {Phormal} from '../../packages/core/src'

export default {
  name: 'App',

  data() {
    return {
      form: undefined,

      formFields: {
        field1: {
          label: 'First name',
          hooks: [useLength(undefined, 10)],
          value: 'John',
        },
        field2: {
          label: 'Last name',
          hooks: [useLength(5)],
          value: '',
        },
        field3: {
          label: 'Hubba bubba',
          hooks: [useLength(5, 10)],
          value: '',
        },
      },
    }
  },

  mounted() {
    this.form = new Phormal(this.formFields, {
      el: '#phormal',
      validation: 'active'
    })

    this.form.init()
  },
}

</script>


<template>
  <div id="phormal"></div>
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


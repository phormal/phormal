<script lang="ts">

import {useRequired} from '../../packages/core/src'
import {useLength} from '../../packages/core/src'
import {SuperForm} from '../../packages/core/src'

export default {
  name: 'App',

  data() {
    return {
      form: undefined,

      formFields: {
        field1: {
          label: 'First name',
          hooks: [useRequired(), useLength(1, 155)],
          value: 'John',
          disabledIf: {
            field2: /test/,
          }
        },
        field2: {
          label: 'Last name',
          hooks: [useRequired(), useLength(1, 155)],
          value: '',
          disabledIf: {
            field1: 'empty'
          }
        },

        field3: {
          label: 'Disabled field',
          disabled: true,
        },

        disableIfField1IsNotEmpty: {
          label: 'Disabled if field1 is empty',
          disabledIf: {
            field1: 'not-empty'
          }
        },

        hideThisIfField1IsEmpty: {
          label: 'Hide this if field1 is empty',
          hideIf: {
            field1: 'empty'
          }
        },
      },
    }
  },

  mounted() {
    this.form = new SuperForm(this.formFields, {
      el: '#super-form',
      validation: 'active'
    })

    this.form.init()
  },
}

</script>


<template>
  <div id="super-form"></div>
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


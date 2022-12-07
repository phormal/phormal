<script lang="ts">

import {useRequired} from '../../packages/core/src'
import {useLength} from '../../packages/core/src'
import useAutoCapitalize from "../../packages/hooks/use-auto-capitalize/src";
import useValidZip from "../../packages/hooks/use-valid-zip/src";
import {SuperForm} from '../../packages/core/src'

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
				},
				lastName: {
					label: 'Last name',
					hooks: [useRequired(), useLength(1, 155)],
					value: 'Doe',
					handleOnFocus: (event, field) => this.lastNameFocusN += 1,
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
					hooks: [useRequired(), useLength(1, 155), useValidZip()],
					value: '51378',
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
			validation: 'active'
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
		<h2>First name was blurred {{ firstNameBlurN }} times</h2>
		<h2>Last name was focus {{ lastNameFocusN }} times</h2>
	</div>
	<div id="super-form"></div>

	<button @click="runValidation">Validate</button>
	<button @click="getValues">Get values</button>
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


<script lang="ts">
import SuperForm from '../lib'
import {useRequired} from '../lib/hooks/use-required'
import {useLength} from '../lib/hooks/use-length'
import {useAutoCapitalize} from '../lib/hooks/use-auto-capitalize'

export default {
	name: 'App',

	data() {
		return {
			form: new SuperForm(
				{
					firstName: {
						label: 'First name',
						hooks: [useRequired(), useLength(1, 155), useAutoCapitalize()],
						value: 'John'
					},
					lastName: {
						label: 'Last name',
						hooks: [useRequired(), useLength(1, 155)],
						value: 'Doe'
					},
				},
				{
					el: '#super-form',
					validation: 'passive'
				}
			)
		}
	},

	mounted() {
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

<script lang="ts">
import SuperForm from '../lib'
import {useRequired} from '../lib/hooks/use-required'
import {useLength} from '../lib/hooks/use-length'

export default {
	name: 'App',

	mounted() {
		new SuperForm({
			fields: [
				{ placeholder: 'First name', type: 'text', hooks: [useRequired(), useLength(1, 155)] },
				{ placeholder: 'Last name', type: 'text', hooks: [useRequired(), useLength(1, 155)] }
			],
			el: '#super-form'
		}).init()
	}
}

</script>

<template>
	<div>
		<h1>SuperForm</h1>
	</div>
	<div id="super-form"></div>
</template>

<style scoped>
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

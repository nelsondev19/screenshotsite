<script lang="ts">
	import Home from '../components/Home/Home.svelte';
	import Modal from '../components/Modal/Modal.svelte';

	import { deviceSelected } from '../store/device';

	let device = '';

	deviceSelected.subscribe((value) => {
		device = value;
	});
</script>

<Home />

{#if device !== ''}
	<Modal />
{/if}

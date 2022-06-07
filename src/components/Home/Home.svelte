<script lang="ts">
	import { deviceSelected } from '../../store/device';
	import { website } from '../../store/website';
	import Notification from '../Notification/Notification.svelte';

	export const showModal = false;
	let showNotification = false;
	let websiteValue = '';
	let errorUrl = false;
	website.subscribe((value) => {
		websiteValue = value;
	});

	function setDeviceSelected(value: string) {
		deviceSelected.set(value);
	}

	const updateWebsite = (
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		try {
			// @ts-ignore
			let value = e.target.value;
			let url = new URL(value);

			website.set(url.href);
			errorUrl = false;
		} catch (error) {
			errorUrl = true;
		}
	};

	const showNotificationFunc = () => {
		showNotification = true;
		setTimeout(() => {
			showNotification = false;
		}, 2800);
	};
</script>

<Notification show={showNotification} />
<main class="box-shawdow">
	<h1 class="text-center font-bold text-5xl p-2">Screenshot Site</h1>

	<p class="text-gray-300 text-center text-xl">Download screenshots of your website in any resolution</p>

	<div class="font-sans text-black flex justify-center mt-5">
		<div class="border rounded overflow-hidden flex shakeX">
			<input
				type="text"
				class={`px-4 py-2 ${errorUrl ? 'bg-red-800 text-white' : ''}`}
				placeholder="https://www.example.com/"
				on:input={updateWebsite}
			/>
			<button class="flex items-center justify-center px-4 border-l">
				<svg
					class="h-4 w-4 text-grey-dark"
					fill="white"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					><path
						d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
					/></svg
				>
			</button>
		</div>
	</div>
	<br />
	{#if websiteValue !== ''}
		<div class="flex justify-center">
			<div class="grid md:grid-cols-3 gap-2 xs:grid-cols-1">
				<div
					on:click={() => {
						if (websiteValue === '') {
							showNotificationFunc();
						} else {
							setDeviceSelected('tablet');
						}
					}}
					class="cursor-pointer box hover:border-indigo-800 h-40 w-72 p-5 bg-blue-900 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 "
				>
					<div class="flex justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1"
							height="70px"
							width="70px"
							class="stroke-white"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
							/>
						</svg>
					</div>
					<div class="flex justify-center mt-4">
						<p>Tablet</p>
					</div>
				</div>

				<div
					on:click={() => {
						if (websiteValue === '') {
							showNotificationFunc();
						} else {
							setDeviceSelected('phone');
						}
					}}
					class="cursor-pointer box hover:border-indigo-800 h-40 w-72 p-5 bg-blue-900 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 "
				>
					<div class="flex justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1"
							height="70px"
							width="70px"
							class="stroke-white"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
							/>
						</svg>
					</div>
					<div class="flex justify-center mt-4">
						<p>Phone</p>
					</div>
				</div>

				<div
					on:click={() => {
						if (websiteValue === '') {
							showNotificationFunc();
						} else {
							setDeviceSelected('desktop');
						}
					}}
					class="cursor-pointer box hover:border-indigo-800 h-40 w-72 p-5 bg-blue-900 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 "
				>
					<div class="flex justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1"
							height="70px"
							width="70px"
							class="stroke-white"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
					</div>
					<div class="flex justify-center mt-4">
						<p>Desktop</p>
					</div>
				</div>
			</div>
		</div>
	{/if}
</main>

<script lang="ts">
	import {
		phonesApple,
		phonesAndroid,
		tabletsApple,
		tabletsAndroid,
		desktops
	} from '../../resolutions';
	import { deviceSelected } from '../../store/device';
	import { website } from '../../store/website';

	import axios from 'axios';

	let device = '';

	let typeSelected = 'Apple';
	let loadingDownload = false;
	function setDeviceSelected(value: string) {
		deviceSelected.set(value);
	}
	deviceSelected.subscribe((value) => {
		device = value;
	});

	let body = {
		website: '',
		width: '1920',
		height: '1080',
		fullPage: false
	};
	website.subscribe((value) => {
		body.website = value;
	});

	const controller = new AbortController();

	const downloadImage = () => {
		loadingDownload = true;
		axios({
			url: `http://localhost:3000/todos?website=${body.website}&width=${body.width}&height=${body.height}&fullPage=${body.fullPage}`,
			method: 'GET',
			responseType: 'blob',
			signal: controller.signal,
			onDownloadProgress: (progress) => {
				const percentage = Math.round((progress.loaded * 100) / progress.total);
				if (percentage === 100 || Infinity) {
					loadingDownload = false;
				}
			}
		}).then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', `screenshot-${body.width}x${body.height}.png`); //or any other extension
			document.body.appendChild(link);
			link.click();
		});
	};
</script>

<div
	class="bg-slate-800 px-32 py-32 bg-opacity-20 backdrop-blur-sm flex justify-center items-center absolute top-0 right-0 bottom-0 left-0"
>
	<div class="bg-white px-16 py-36 rounded-md text-center">
		<div class={device === 'desktop' ? '' : 'grid grid-cols-2'}>
			<div class="inline-block relative w-5/6">
				<label class="block text-black text-sm mb-2">
					Resolution
					<select
						on:change={(e) => {
							// @ts-ignore
							const value = e.target?.value.split('x');
							const width = value[0];
							const height = value[1];

							body.height = height;
							body.width = width;
						}}
						class="block appearance-none w-full px-4 py-2 pr-8 rounded text-black"
					>
						{#if device === 'phone' && typeSelected === 'Apple'}
							<p>is greater than 10</p>

							{#each phonesApple as device}
								<option value={`${device?.width}x${device?.height}`}
									>{device?.name} - {device?.width} x {device?.height}</option
								>
							{/each}
						{/if}

						{#if device === 'phone' && typeSelected === 'Android'}
							<p>is greater than 10</p>

							{#each phonesAndroid as device}
								<option value={`${device?.width}x${device?.height}`}
									>{device?.name} - {device?.width} x {device?.height}</option
								>
							{/each}
						{/if}

						{#if device === 'tablet' && typeSelected === 'Android'}
							<p>is greater than 10</p>

							{#each tabletsAndroid as device}
								<option value={`${device?.width}x${device?.height}`}
									>{device?.name} - {device?.width} x {device?.height}</option
								>
							{/each}
						{/if}
						{#if device === 'tablet' && typeSelected === 'Apple'}
							<p>is greater than 10</p>

							{#each tabletsApple as device}
								<option value={`${device?.width}x${device?.height}`}
									>{device?.name} - {device?.width} x {device?.height}</option
								>
							{/each}
						{/if}
						{#if device === 'desktop'}
							<p>is greater than 10</p>

							{#each desktops as device}
								<option value={`${device?.width}x${device?.height}`}
									>{device?.name} - {device?.width} x {device?.height}</option
								>
							{/each}
						{/if}
					</select>
				</label>
				<div
					class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
				>
					<svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
						<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
					</svg>
				</div>
			</div>

			{#if device !== 'desktop'}
				<div class="inline-block relative w-5/6">
					<label class="block text-black text-sm mb-2">
						Device Type
						<select
							on:change={(e) => {
								// @ts-ignore
								typeSelected = e.target?.value;
							}}
							class="block appearance-none w-full px-4 py-2 pr-8 rounded text-black"
						>
							{#if device === 'phone' || device === 'tablet'}
								<p>is greater than 10</p>

								{#each ['Apple', 'Android'] as brand}
									<option value={brand}>{brand}</option>
								{/each}
							{/if}
						</select>
					</label>
					<div
						class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
					>
						<svg
							class="fill-current h-4 w-4"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<path
								d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
							/>
						</svg>
					</div>
				</div>
			{/if}
		</div>
		<br />
		<div class={device === 'desktop' ? 'ml-10' : ' ml-2'}>
			<label for="default-toggle" class="flex justify-start w-32 relative  cursor-pointer">
				<input
					bind:checked={body.fullPage}
					type="checkbox"
					id="default-toggle"
					class="sr-only peer"
					on:change={(e) => {
						// @ts-ignore
						body.fullPage = e.target.checked;
						console.log(body);
					}}
				/>
				<div
					class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
				/>
				<span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Full Size</span>
			</label>
		</div>

		<br />
		<h1 class="text-xl mb-4 font-bold text-slate-500">Get Screenshot</h1>

		<button
			on:click={() => {
				if (loadingDownload) {
					// cancel the request
					controller.abort();
					loadingDownload = false;
					setDeviceSelected('');
				} else {
					setDeviceSelected('');
				}
			}}
			type="button"
			class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="inline w-4 h-4 mr-3 text-white"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/>
			</svg>
			{#if loadingDownload}
				Cancel
			{:else}
				Exit
			{/if}
		</button>

		{#if loadingDownload}
			<button
				on:click={downloadImage}
				disabled
				type="button"
				class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
			>
				<svg
					role="status"
					class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600"
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor"
					/>
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="#1C64F2"
					/>
				</svg>
				Loading
			</button>
		{:else}
			<button
				on:click={downloadImage}
				type="button"
				class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="inline w-4 h-4 mr-2"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
				Download
			</button>
		{/if}
	</div>
</div>

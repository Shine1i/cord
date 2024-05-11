<script>
	let isModalVisible = false;
	let audioElement;
	
	$: {
		if (isModalVisible && audioElement) {
			audioElement.play();
		}
		if (!isModalVisible && audioElement) {
			audioElement.pause();
			audioElement.currentTime = 0; // Reset the audio to the start
		}
	}
	
	function setAudioElement(node) {
		audioElement = node;
		audioElement.volume = 0.20;
	}
</script>

<button onclick={() => isModalVisible = !isModalVisible}>
	Toggle Modal
</button>

<div
	class="relative  {isModalVisible ? 'pointer-events-auto': 'pointer-events-none'} z-50"
	aria-labelledby="modal-title" role="dialog" aria-modal="true">
	<div
		class="fixed inset-0 bg-gray-500/35 backdrop-blur-sm {isModalVisible ? 'backdropEnter': 'backdropLeave'} bg-opacity-75 transition-opacity"></div>
	<div class="fixed  inset-0 z-10 w-screen overflow-y-auto">
		<div
			class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
			
			<div
				class="relative border border-slate-500/70 {isModalVisible ? 'modalEnter': 'modalLeave'} transform overflow-hidden rounded-lg bg-slate-500/35 backdrop-blur-lg px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
				<audio src="/lofi2.webm" use:setAudioElement></audio>
				<div>
					<div
						class="mx-auto flex h-12 w-12 items-center justify-center relative rounded-full bg-green-100">
						<div
							class="w-16 h-16 bg-slate-400 rounded-full absolute z-20 animate-pulse"></div>
						<div
							class="w-20 h-20 bg-slate-500 rounded-full absolute z-10 animate-pulse"></div>
						
						<img
							class="inline-block ring-2 ring-slate-400 h-12  w-12  object-cover overflow-hidden rounded-full bg-gray-100 relative z-30"
							alt="pfp"
							src="https://cdn.discordapp.com/avatars/911937892471959552/d1e6ea730edfca8dfc03ad3f2e93e017?size=1024">
					</div>
					<div class="mt-3 text-center sm:mt-5">
						<h3 class=" font-semibold leading-6 text-slate-200 text-lg"
								id="modal-title">Incoming Call</h3>
						<div class="mt-2 ">
							
							<p class="text-sm text-slate-300"> Jared Palmer is calling </p>
						</div>
					</div>
				</div>
				<div
					class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
					
					<button type="button" onclick={() => isModalVisible = !isModalVisible}
									class="mt-3 inline-flex w-full justify-center rounded-md bg-slate-500/90 px-3 py-2 text-sm font-semibold text-slate-50 shadow-sm hover:bg-slate-400  sm:mt-0 items-center gap-4 sm:col-start-2">
						
						<svg xmlns="http://www.w3.org/2000/svg" fill="none"
								 viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
								 class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round"
										d="M15.75 3.75 18 6m0 0 2.25 2.25M18 6l2.25-2.25M18 6l-2.25 2.25m1.5 13.5c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
						</svg>
						Answer
					</button>
					<button type="button" onclick={() => isModalVisible = !isModalVisible}
									class="mt-3 inline-flex w-full justify-center rounded-md bg-red-500/85 px-3 py-2 text-sm font-semibold text-slate-50 shadow-sm hover:bg-red-500 sm:col-start-1 sm:mt-0 items-center gap-4">
						
						<svg xmlns="http://www.w3.org/2000/svg" fill="none"
								 viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
								 class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round"
										d="M15.75 3.75 18 6m0 0 2.25 2.25M18 6l2.25-2.25M18 6l-2.25 2.25m1.5 13.5c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
						</svg>
						
						
						Reject
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
<style lang="postcss">
    .backdropEnter {
        @apply ease-out duration-300 opacity-100;
    }

    .backdropLeave {
        @apply ease-in duration-200 opacity-0;
    }

    .modalEnter {
        @apply ease-out duration-300 opacity-100 translate-y-0 sm:scale-100
    }

    .modalLeave {
        @apply ease-in duration-200 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95
    }
</style>


<!--						<span class="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100 relative z-30">-->
<!--  <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">-->
<!--    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />-->
<!--  </svg>-->
<!--		-->
<!--</span>-->
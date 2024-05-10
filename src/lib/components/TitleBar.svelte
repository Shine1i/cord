<script>


</script>
<header id="titlebar" class="w-full  fixed   top-0 h-8  grid grid-cols-12">
	<div id="drag-region"
			 class=" h-full w-full col-start-1 col-end-11 absolute left-0 justify-start ">
	</div>
	
	<div
		class="flex justify-end items-center col-start-11 col-span-2   p-2.5 ">
		<button onclick={window.topbar.min} id="min-button"
						class="group cursor-pointer z-50 px-4 py-0.5   ">
			<svg class="fill-neutral-300 group-hover:fill-white "
					 xmlns="http://www.w3.org/2000/svg" width="24" height="24"
					 viewBox="0 0 24 24">
				<path d="M14 8v1H3V8z" />
			</svg>
		</button>
		<button onclick={window.topbar.max} id="max-button"
						class="group cursor-pointer px-2 py-0.5 z-50  flex  ">
			
			<svg class="fill-neutral-300 group-hover:fill-white pointer-events-none"
					 xmlns="http://www.w3.org/2000/svg" width="24" height="24"
					 viewBox="0 0 24 24">
				<path fill-rule="evenodd"
							d="m13 2l1 1v10l-1 1H3l-1-1V3l1-1zm-.254 1.25H3.255v9.5h9.491z"
							clip-rule="evenodd" />
			</svg>
		
		</button>
		<button onclick={window.topbar.close} id="close-button"
						class="group cursor-pointer z-50 px-4 py-0.5 ">
			<svg class="fill-neutral-300 group-hover:fill-white "
					 xmlns="http://www.w3.org/2000/svg" width="24" height="24"
					 viewBox="0 0 24 24">
				<path fill-rule="evenodd"
							d="m7.116 8l-4.558 4.558l.884.884L8 8.884l4.558 4.558l.884-.884L8.884 8l4.558-4.558l-.884-.884L8 7.116L3.442 2.558l-.884.884z"
							clip-rule="evenodd" />
			</svg>
		</button>
	</div>
</header>
<style>
    #drag-region {
        -webkit-app-region: drag;
    }
</style>
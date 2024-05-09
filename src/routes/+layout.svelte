<script>
	import './styles.css';
	import TitleBar from '$lib/TitleBar.svelte';
	
	let { children } = $props();
</script>

<TitleBar />
<!--
  This example requires updating your template:

  ```
  <html class="h-full bg-white">
  <body class="h-full">
  ```
-->
<div>
	<!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
	<div class="relative z-50 lg:hidden" role="dialog" aria-modal="true">
		<!--
			Off-canvas menu backdrop, show/hide based on off-canvas menu state.

			Entering: "transition-opacity ease-linear duration-300"
				From: "opacity-0"
				To: "opacity-100"
			Leaving: "transition-opacity ease-linear duration-300"
				From: "opacity-100"
				To: "opacity-0"
		-->
		<div class="fixed inset-0 bg-gray-900/80"></div>
		
		<div class="fixed inset-0 flex">
			<!--
				Off-canvas menu, show/hide based on off-canvas menu state.

				Entering: "transition ease-in-out duration-300 transform"
					From: "-translate-x-full"
					To: "translate-x-0"
				Leaving: "transition ease-in-out duration-300 transform"
					From: "translate-x-0"
					To: "-translate-x-full"
			-->
			<div class="relative mr-16 flex w-full max-w-xs flex-1">
				<!--
					Close button, show/hide based on off-canvas menu state.

					Entering: "ease-in-out duration-300"
						From: "opacity-0"
						To: "opacity-100"
					Leaving: "ease-in-out duration-300"
						From: "opacity-100"
						To: "opacity-0"
				-->
				<div class="absolute left-full top-0 flex w-16 justify-center pt-5">
					<button type="button" class="-m-2.5 p-2.5">
						<span class="sr-only">Close sidebar</span>
						<svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
								 stroke-width="1.5" stroke="currentColor" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round"
										d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				
				<div
					class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
					<div class="flex h-16 shrink-0 items-center">
						<img class="h-8 w-auto"
								 src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
								 alt="Your Company">
					</div>
					<nav class="flex flex-1 flex-col">
						<ul role="list" class="-mx-2 flex-1 space-y-1">
							<li>
								<!-- Current: "bg-gray-800 text-white", Default: "text-gray-400 hover:text-white hover:bg-gray-800" -->
								<a href="#"
									 class="bg-gray-800 text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
									<svg class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24"
											 stroke-width="1.5" stroke="currentColor"
											 aria-hidden="true">
										<path stroke-linecap="round" stroke-linejoin="round"
													d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
									</svg>
									Dashboard
								</a>
							</li>
							<li>
								<a href="#"
									 class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
									<svg class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24"
											 stroke-width="1.5" stroke="currentColor"
											 aria-hidden="true">
										<path stroke-linecap="round" stroke-linejoin="round"
													d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
									</svg>
									Team
								</a>
							</li>
							<li>
								<a href="#"
									 class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
									<svg class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24"
											 stroke-width="1.5" stroke="currentColor"
											 aria-hidden="true">
										<path stroke-linecap="round" stroke-linejoin="round"
													d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
									</svg>
									Projects
								</a>
							</li>
							<li>
								<a href="#"
									 class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
									<svg class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24"
											 stroke-width="1.5" stroke="currentColor"
											 aria-hidden="true">
										<path stroke-linecap="round" stroke-linejoin="round"
													d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
									</svg>
									Calendar
								</a>
							</li>
							<li>
								<a href="#"
									 class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
									<svg class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24"
											 stroke-width="1.5" stroke="currentColor"
											 aria-hidden="true">
										<path stroke-linecap="round" stroke-linejoin="round"
													d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
									</svg>
									Documents
								</a>
							</li>
							<li>
								<a href="#"
									 class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
									<svg class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24"
											 stroke-width="1.5" stroke="currentColor"
											 aria-hidden="true">
										<path stroke-linecap="round" stroke-linejoin="round"
													d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
										<path stroke-linecap="round" stroke-linejoin="round"
													d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
									</svg>
									Reports
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	</div>
	
	<!-- Static sidebar for desktop -->
	<div
		class="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto  lg:pb-4">
		
		<nav class=" h-full overflow-y-hidden">
			<ul role="list"
					class=" pt-4 flex relative min-h-full flex-col items-center space-y-1">
				<li>
					<button
						class="bg-slate-400/30 text-slate-200 group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold">
						<svg class="h-6 w-6 shrink-0" xmlns="http://www.w3.org/2000/svg"
								 viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
							<path
								d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
						</svg>
						<span class="sr-only">Dashboard</span>
					</button>
				</li>
				<li>
					<button
						class=" text-slate-200 hover:bg-slate-400/30  group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
								 fill="currentColor" class="w-6 h-6">
							<path fill-rule="evenodd"
										d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
										clip-rule="evenodd" />
						</svg>
						<span class="sr-only">Dashboard</span>
					</button>
				</li>
				<li class="absolute bottom-0">
					<button
						class=" text-slate-200 hover:bg-slate-400/30 group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
								 fill="currentColor" class="w-6 h-6">
							<path fill-rule="evenodd"
										d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
										clip-rule="evenodd" />
						</svg>
						
						
						<span class="sr-only">Dashboard</span>
					</button>
				</li>
			
			
			</ul>
		</nav>
	</div>
	
	<div
		class="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
		<button type="button" class="-m-2.5 p-2.5 text-gray-400 lg:hidden">
			<span class="sr-only">Open sidebar</span>
			<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
					 stroke="currentColor" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
			</svg>
		</button>
		<div class="flex-1 text-sm font-semibold leading-6 text-white">Dashboard
		</div>
		<a href="#">
			<span class="sr-only">Your profile</span>
			<img class="h-8 w-8 rounded-full bg-gray-800"
					 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
					 alt="">
		</a>
	</div>
	
	<main class="lg:pl-20">
		<div class="xl:pl-96">
			<div class="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
				{@render children()}
			</div>
		</div>
	</main>
	
	<aside
		class="fixed inset-y-0 left-20 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
		<!-- Secondary column (hidden on smaller screens) -->
	</aside>
</div>



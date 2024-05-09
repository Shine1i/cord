

<div class="mx-auto pt-6">
	<div>
		<div class="text-center">
			<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z" />
			</svg>
			<h2 class="mt-2 text-base font-semibold leading-6 text-slate-200">Add friends</h2>
			<p class="mt-1 text-sm text-gray-400">You haven’t added any friends lately. Type username of your friend and add him.</p>
		</div>
<!--		form or btn dont matter-->
		<form action="#" class="mt-6 flex">
			<input type="text" name="email" id="username"
						 class="block w-full bg-gray-500/25 rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600/40  focus:outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-500 sm:text-sm sm:leading-6"
						 placeholder="Enter username">
			<button type="submit"
							class="ml-4 flex-shrink-0 rounded-md bg-slate-300/25 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-300/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
				Send invite
			</button>
		</form>
	</div>
	<div class="mt-10">
		<h3 class="text-sm font-medium text-gray-500">Previously added friends</h3>
		<ul role="list" class="mt-4 divide-y divide-gray-600   border-slate-600">
			<li class="flex items-center justify-between space-x-3 py-4">
				<div class="flex min-w-0 flex-1 items-center space-x-3">
					<div class="flex-shrink-0">
						<img
							class="h-10 w-10 rounded-md ring-2 border border-slate-500 ring-slate-500"
							src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt="">
					</div>
					<div class="min-w-0 flex-1">
						<p class="truncate text-sm font-medium text-slate-200">Lindsay Walton</p>
						<p class="truncate text-sm font-medium text-gray-400">last seen</p>
					</div>
				</div>
				<div class="flex-shrink-0">
					<button type="button" class="inline-flex items-center gap-x-1.5 hover:bg-slate-500/25  p-2 rounded-md text-sm font-semibold leading-6 text-slate-200">
				
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5 text-gray-400">
							<path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
						</svg>
						
						Remove
					</button>
				</div>
			</li>
			
		</ul>
	</div>
</div>

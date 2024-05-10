<div
	class="flex min-h-full absolute z-[999] w-full h-full bg-slate-500/20 backdrop-blur-md flex-col justify-center py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
				 fill="currentColor"
				 class="w-auto h-10 mx-auto animate-spin fill-white">
			<path fill-rule="evenodd"
						d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
						clip-rule="evenodd" />
		</svg>
		
		<h2
			class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-slate-200">
			Sign in to your account</h2>
	</div>
	
	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
		<div class="bg-slate-500/25 px-6 py-12 shadow sm:rounded-lg sm:px-12">
			<form class="space-y-6" action="#" method="POST">
				<div>
					<label for="email"
								 class="block text-sm font-medium leading-6 text-white ">Email
						address</label>
					<div class="mt-2">
						<input id="email" name="email" type="email" autocomplete="email"
									 required
									 class="block w-full rounded-md bg-gray-500/25	 border-0 py-1.5 text-slate-200 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-400 sm:text-sm sm:leading-6">
					</div>
				</div>
				
				<div>
					<label for="password"
								 class="block text-sm font-medium leading-6 text-white">Password</label>
					<div class="mt-2">
						<input id="password" name="password" type="password"
									 autocomplete="current-password" required
									 class="block w-full rounded-md bg-gray-500/25 border-0 py-1.5 text-slate-200 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-400 sm:text-sm sm:leading-6">
					</div>
				</div>
				
				<div class="flex items-center justify-between">
					<div class="flex items-center animate-bounce">
						<input id="remember-me" name="remember-me" type="checkbox" class="h-4 checked:hover:bg-slate-300 rounded border-gray-300 bg-gray-500/25 checked:bg-slate-400  hover:bg-slate-400
					focus-within:checked:bg-slate-400
						focus:ring-slate-600">
						<label for="remember-me"
									 class="ml-3 block text-sm leading-6 text-slate-200 ">Remember
							me</label>
					</div>
					
					<div class="text-sm leading-6">
						<a href="#"
							 class="font-semibold text-slate-300 hover:text-slate-200">Register
							now?</a>
					</div>
				</div>
				
				<div>
					<button type="submit"
									class="flex w-full justify-center rounded-md bg-slate-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
						Sign in
					</button>
				</div>
			</form>
			
			<div>
				<div class="relative mt-10">
					<div class="absolute inset-0 flex items-center" aria-hidden="true">
						<div class="w-full border-t border-gray-200"></div>
					</div>
					<div
						class="relative flex justify-center text-sm font-medium leading-6">
						<span
							class="bg-slate-300 rounded-md px-6 text-gray-900 animate-bounce">Or continue with</span>
					</div>
				</div>
				
				<div class="mt-6 grid grid-cols-2 gap-4">
					<a href="#"
						 class="flex w-full items-center justify-center gap-3 rounded-md bg-slate-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  hover:bg-slate-200 focus-visible:ring-transparent">
						
						<svg class="h-5 w-5 animate-bounce"
								 xmlns="http://www.w3.org/2000/svg" width="1.29em" height="1em"
								 viewBox="0 0 256 199">
							<path fill="#5865f2"
										d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046c-19.692-2.961-39.203-2.961-58.533 0c-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632a108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237a136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848c21.142-6.58 42.646-16.637 64.815-33.213c5.316-56.288-9.08-105.09-38.056-148.36M85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2c.02 14.375-10.148 26.18-23.015 26.18m85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2c0 14.375-10.148 26.18-23.015 26.18" />
						</svg>
						<span class="text-sm font-semibold leading-6">Discord</span>
					</a>
					
					<a href="#"
						 class="flex w-full items-center justify-center gap-3 rounded-md bg-slate-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-slate-200 focus-visible:ring-transparent">
						<svg class="h-5 w-5 fill-[#24292F] animate-bounce"
								 fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
							<path fill-rule="evenodd"
										d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
										clip-rule="evenodd" />
						</svg>
						<span class="text-sm font-semibold leading-6">GitHub</span>
					</a>
				</div>
			</div>
		</div>
	
	
	</div>
</div>

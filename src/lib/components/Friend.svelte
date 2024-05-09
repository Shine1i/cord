<script>
	const {
		name = '',
		avatar = '',
		lastSeen = null
	} = $props();
</script>
<li class="flex gap-x-4 py-3 relative items-center">
	<img class="h-10 w-10 flex-none rounded-md bg-gray-50"
			 src="{avatar}"
			 alt="">
	<div class="min-w-0">
		<p class="text-sm font-semibold leading-6 text-slate-200">{name}</p>
		<p class="mt-1 truncate text-xs leading-5 text-slate-400">Last seen
			{lastSeen}</p>
	</div>
	<button class="absolute right-0 group">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
				 fill="currentColor"
				 class="w-6 h-6 fill-slate-200 group-hover:fill-white">
			<path fill-rule="evenodd"
						d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z"
						clip-rule="evenodd" />
		</svg>
	</button>
</li>



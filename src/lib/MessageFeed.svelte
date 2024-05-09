<script lang="ts">
	const {
		name = '',
		avatar = '',
		lastMessage = '',
		messageTimeStamp = null
	} = $props();
</script>

<div
	class="hover:bg-gray-300/85 group hover:cursor-pointer   rounded-lg px-4 py-4 ">
	<div class="flex space-x-3">
		<div class="flex-shrink-0">
			<img
				class="h-11 w-11 rounded-md ring-2 border border-slate-500 ring-slate-500"
				src="{avatar}" alt="">
		</div>
		<div class="min-w-0 flex-1 flex flex-col justify-between">
			<div class="text-sm font-semibold text-slate-900  flex justify-between">
				<span class="text-slate-200 group-hover:text-black">{name}</span>
				<span
					class=" text-slate-200 group-hover:text-slate-700 font-normal">{messageTimeStamp}</span>
			</div>
			<div class="text-sm text-slate-400 group-hover:text-slate-600 ">
				<p class="truncate text-ellipsis overflow-hidden">{lastMessage}</p>
			</div>
		</div>
	</div>
</div>

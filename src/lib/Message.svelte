<script lang="ts">
	interface NewMessage {
		id: number;
		guest: boolean;
		avatar: string;
		name: string;
		timestamp: Date;
		message: string;
		color: string;
	}
	
	const {
		id = 0,
		guest = false,
		avatar = '',
		name = '',
		timestamp = '',
		message = '',
		color = ''
	}: NewMessage = $props();
</script>
<div class="flex items-start gap-4 ">
	<img
		src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
		alt="Avatar"
		width="40"
		height="40"
		class="h-10 w-10 rounded-md"
		style="aspect-ratio: 40 / 40; object-fit: cover;"
	/>
	<div class="flex flex-col items-start gap-1">
		<div class="flex items-center gap-4">
			<div class="font-medium text-slate-200">{name}</div>
			<span class="text-xs text-gray-500 dark:text-gray-400">{timestamp}</span>
		</div>
		<p class="rounded-lg {color}  p-3 text-sm text-gray-800  ">
			{message}
		</p>
	</div>
</div>
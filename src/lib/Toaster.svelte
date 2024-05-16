<script lang="ts" generics="T">
	let { toast: toastSnippet } = $props();
	
	let toasts = $state([]);
	
	export function toast(settings: T) {
		const id = Math.random();
		settings.id = id;
		toasts.push(settings);
		setTimeout(() => {
			toasts = toasts.filter(toast => toast.id !== id);
		}, 2500);
	}
</script>

{#each toasts as toast}
	{@render toastSnippet(toast)}
{/each}
<script lang="ts">
	import Message from '$lib/components/chat_components/Message.svelte';
	import type { NewMessage } from '$lib/types';
	import ProfileHeader
		from '$lib/components/chat_components/ProfileHeader.svelte';
	import { flip } from 'svelte/animate';
	
	let currentMessage = $state('');
	
	
	let elemChat: HTMLElement;
	
	function scrollChatBottom(behavior?: ScrollBehavior): void {
		elemChat.scrollTo({ top: elemChat.scrollHeight, behavior });
	}
	
	let messageFeed = $state<NewMessage[]>([]);
	
	// params
	function addMessage(): void {
		const newMessage = {
			id: messageFeed.length,
			guest: false,
			avatar: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
			name: 'Jane',
			timestamp: new Date(),
			message: currentMessage,
			color: 'bg-gray-300/85'
		};
		messageFeed.push(newMessage);
		currentMessage = '';
		setTimeout(() => {
			scrollChatBottom('smooth');
		}, 0);
	}
	
	function handleKeyDown(event: KeyboardEvent): void {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			addMessage();
		}
	}

</script>

<div class="pt-6 grid grid-rows-8 grid-cols-6  h-full ">
	<div class="row-start-1 col-span-full">
		<ProfileHeader />
	
	</div>
	<section bind:this={elemChat}
					 class="row-start-2 flex flex-col gap-4 px-2 row-end-8 col-span-full  overflow-y-scroll overflow-x-hidden">
		{#each messageFeed as message}
			<Message
				id={message.id}
				avatar={message.avatar}
				name={message.name}
				color={message.color}
				guest={message.guest}
				message={message.message}
				timestamp={message.timestamp}
			/>
		{/each}
	</section>
	<div class="row-start-8  col-span-full flex gap-4  items-center">
		<button
			class="bg-gray-500/25 px-4 py-4 rounded-md ring-1 ring-inset ring-gray-600/40">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					 fill="currentColor" class="w-6 h-6 fill-white">
				<path fill-rule="evenodd"
							d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
							clip-rule="evenodd" />
			</svg>
		
		</button>
		<div class="relative w-full">
			<textarea onkeydown={handleKeyDown} rows="2" bind:value={currentMessage}
								name="prompt" id="prompt"
								class="block text-white w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset bg-gray-500/25 outline-none ring-gray-600/40 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6 "></textarea>
			<button onclick={addMessage}
							class="absolute top-2/4 right-3 transform -translate-y-2/4">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
						 fill="currentColor" class="w-6 h-6  fill-slate-400 ">
					<path
						d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
				</svg>
			</button>
		</div>
	</div>
</div>

<style>
    textarea {
        resize: none;
    }
</style>
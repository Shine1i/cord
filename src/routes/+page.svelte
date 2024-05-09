<script lang="ts">
	import Message from '$lib/Message.svelte';
	import type { NewMessage } from '$lib/types';
	
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
		<div class="bg-gray-500/25    rounded-lg px-4 py-4 ">
			<div class="flex space-x-3 items-center">
				<div class="flex-shrink-0">
					<img
						class="h-9 w-9 rounded-md ring-1 border border-slate-500 ring-slate-500"
						src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
						alt="">
				</div>
				<div class="min-w-0 flex-1 flex flex-col justify-between">
					<div
						class="text-sm font-semibold text-slate-900  flex justify-between">
						<span class="text-slate-200  group-hover:text-black">Vynxc</span>
						<ul class="flex gap-4 items-center">
							<li>
								<button class="group">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
											 fill="currentColor"
											 class="w-5 h-5 fill-slate-200 group-hover:fill-white">
										<path fill-rule="evenodd"
													d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
													clip-rule="evenodd" />
									</svg>
								</button>
							</li>
							<li>
								<button class="group">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
											 fill="currentColor"
											 class="w-5 h-5 fill-slate-200 group-hover:fill-white">
										<path fill-rule="evenodd"
													d="M5.636 4.575a.75.75 0 0 1 0 1.061 9 9 0 0 0 0 12.728.75.75 0 1 1-1.06 1.06c-4.101-4.1-4.101-10.748 0-14.849a.75.75 0 0 1 1.06 0Zm12.728 0a.75.75 0 0 1 1.06 0c4.101 4.1 4.101 10.75 0 14.85a.75.75 0 1 1-1.06-1.061 9 9 0 0 0 0-12.728.75.75 0 0 1 0-1.06ZM7.757 6.697a.75.75 0 0 1 0 1.06 6 6 0 0 0 0 8.486.75.75 0 0 1-1.06 1.06 7.5 7.5 0 0 1 0-10.606.75.75 0 0 1 1.06 0Zm8.486 0a.75.75 0 0 1 1.06 0 7.5 7.5 0 0 1 0 10.606.75.75 0 0 1-1.06-1.06 6 6 0 0 0 0-8.486.75.75 0 0 1 0-1.06ZM9.879 8.818a.75.75 0 0 1 0 1.06 3 3 0 0 0 0 4.243.75.75 0 1 1-1.061 1.061 4.5 4.5 0 0 1 0-6.364.75.75 0 0 1 1.06 0Zm4.242 0a.75.75 0 0 1 1.061 0 4.5 4.5 0 0 1 0 6.364.75.75 0 0 1-1.06-1.06 3 3 0 0 0 0-4.243.75.75 0 0 1 0-1.061ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
													clip-rule="evenodd" />
									</svg>
								
								</button>
							</li>
							<li>
								<button class="group">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
											 fill="currentColor"
											 class="w-5 h-5 fill-slate-200 group-hover:fill-white">
										<path fill-rule="evenodd"
													d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
													clip-rule="evenodd" />
									</svg>
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	
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
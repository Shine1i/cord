<script lang="ts">
	import './styles.css';
	import TitleBar from '$lib/components/TitleBar.svelte';
	import MessageFeed from '$lib/components/chat_components/MessageFeed.svelte';
	import { goto } from '$app/navigation';
	import Friend from '$lib/components/Friend.svelte';
	import Authentication from '$lib/components/Authentication.svelte';
	import { pocketbase, userRune } from '$lib/pocketbase/index.svelte';
	import { element, LocalStorage } from '$lib/utils/localStorage.svelte';
	import type { AuthModel } from 'pocketbase';
	import Toaster from '$lib/Toaster.svelte';
	import toast from '$lib/Toaster.svelte';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	
	let toaster = $state();
	
	let { children } = $props();
	let layout = $state(0);
	const userLocalStorage = new LocalStorage<AuthModel>('user', null)

	$effect(()=>{
		
		if (userLocalStorage.value !== null && userLocalStorage.key !== '') {
			userRune.authStore = userLocalStorage.value;
		}
		pocketbase.authStore.onChange(async (token, model) => {
			userLocalStorage.value = model;
		});
	})
</script>

<!-- <TitleBar /> -->
{#if userRune.authStore}
	
	<div
		class="hidden  bg-gray-400/10  backdrop-blur-2xl lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-16 lg:overflow-y-auto  lg:pb-4">
		<nav class=" h-full overflow-y-hidden">
			<ul role="list"
					class=" pt-4 flex relative min-h-full flex-col items-center space-y-1">
				<li>
					<button
						onclick={()=>{
							goto("/calls");
							layout = 0;
						}}
						class=" {layout === 0 ? 'bg-slate-400/30' : 'bg-none'} text-slate-200 group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold">
						<svg class="h-6 w-6 shrink-0" xmlns="http://www.w3.org/2000/svg"
								 viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
							<path
								d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
						</svg>
					</button>
				</li>
				<li>
					<button
						onclick={()=>{
							goto("/friends");
							layout = 1;
						}}
						class=" text-slate-200 {layout === 1 ? 'bg-slate-400/30' : 'bg-none'} hover:bg-slate-400/30  group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
								 fill="currentColor" class="w-6 h-6">
							<path fill-rule="evenodd"
										d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
										clip-rule="evenodd" />
						</svg>
					</button>
				</li>
				<li class="absolute bottom-0">
					<button
						onclick={()=>{
							goto("#");
							layout = 2;
						}}
						class=" text-slate-200 {layout === 2 ? 'bg-slate-400/30' : 'bg-none'} hover:bg-slate-400/30 group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
								 fill="currentColor" class="w-6 h-6">
							<path fill-rule="evenodd"
										d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
										clip-rule="evenodd" />
						</svg>
					</button>
				</li>
			
			</ul>
		</nav>
	</div>
	
	
	<main id="main" class="lg:pl-20 ">
		<div class="xl:pl-80 ">
			<div class="px-4 pt-4  bg-[#343434] h-screen">
				{@render children()}
			</div>
		</div>
	</main>
	
	<aside
		class="fixed inset-y-0 overflow-x-hidden  left-12 hidden w-[352px] bg-gray-400/10 shadow-md shadow-slate-400  backdrop-blur-2xl overflow-y-auto    py-3 xl:block">
		<div class="flex flex-col px-4 ">
			<div
				class="flex flex-wrap  py-4 items-center justify-between sm:flex-nowrap">
				<div class="">
					<h3 class="text-base pl-3 font-semibold leading-6 text-white">
						{#if layout === 0}
							Messages
						{:else}
							Friends
						{/if}
					</h3>
				</div>
				
				<button
					class="flex-shrink-0 text-slate-200 {layout === 0 ? 'block' : 'hidden'} ">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none"
							 viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
							 class="w-6 h-6 ">
						<path stroke-linecap="round" stroke-linejoin="round"
									d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
					</svg>
				</button>
			</div>
			<div class=" absolute bottom-0 w-full  mt-auto overflow-x-hidden">
				<div
					class="flex items-center  py-3 text-sm justify-between font-semibold leading-6 text-slate-200 hover:bg-slate-400/35">
					<div class="flex gap-4 px-6 items-center">
						<img
							class="h-8 w-8 rounded-md bg-red-500 ring-2 border border-red-300 ring-red-300"
							src={`https://api.dicebear.com/8.x/initials/svg?seed=${userRune.authStore.username}&backgroundColor=ff6666`}
							alt="">
						<span
							aria-hidden="true">{userRune.authStore.username.toUpperCase()}</span>
					</div>
					<button>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none"
								 viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
								 class="w-6 h-6 mr-6">
							<path stroke-linecap="round" stroke-linejoin="round"
										d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
						</svg>
					</button>
				</div>
			</div>
			{#if layout === 0}
				<!--todo message feed clear -->
				
				{#each Array(5) as chat}
					<MessageFeed
						avatar=""
						name={'placehlder'}
						lastMessage={'placeholder'}
						messageTimeStamp="placeholder"
					/>
				{/each}
			{:else}
				<ul role="list" class=" px-4 divide-slate-500">
					<Friend
						avatar="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
						name="Chelse Naggyua"
						lastSeen="16:33"
					/>
				</ul>
			{/if}
		</div>
	
	</aside>
{:else}
	<Authentication />
	<!--	<div class=" fixed inset-0">-->
	<!--		-->
	<!--		<Toaster bind:this={toaster}>-->
	<!--		{#snippet toast(settings)}-->
	<!--			<div transition:fly={{ y: 30 }} aria-live="assertive"-->
	<!--					 class="pointer-events-none flex items-end px-4 py-6 sm:items-start sm:p-2">-->
	<!--			<div class="flex w-full flex-col items-center space-y-4 sm:items-end">-->
	<!--				-->
	<!--				<div-->
	<!--					class="pointer-events-auto {settings.active ===true ? 'toastEnter' : 'toastLeave'} w-full max-w-sm overflow-hidden rounded-lg bg-slate-500/35 backdrop-blur-md  shadow-lg ring-1 ring-slate-400/50 ring-opacity-5">-->
	<!--					<div class="p-4">-->
	<!--						<div class="flex items-start">-->
	<!--							<div class="flex-shrink-0">-->
	<!--								<svg class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">-->
	<!--									<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />-->
	<!--								</svg>-->
	<!--							</div>-->
	<!--							<div class="ml-3 w-0 flex-1 pt-0.5">-->
	<!--								<p class="text-sm font-medium text-white">{settings.title} </p>-->
	<!--								<p-->
	<!--									class="mt-1 text-sm text-slate-300">{settings.description}</p>-->
	<!--							</div>-->
	<!--							<div class="ml-4 flex flex-shrink-0">-->
	<!--								<button type="button"-->
	<!--												class="inline-flex rounded-md  text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">-->
	<!--									<span class="sr-only">Close</span>-->
	<!--									<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">-->
	<!--										<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />-->
	<!--									</svg>-->
	<!--								</button>-->
	<!--							</div>-->
	<!--						</div>-->
	<!--					</div>-->
	<!--				</div>-->
	<!--			</div>-->
	<!--		</div>-->
	<!--		-->
	<!--		{/snippet}-->
	<!--	</Toaster>-->
	<!--	</div>-->
	<!--	-->
	<!--	<button class="absolute" onclick={() => toaster?.toast({-->
	<!--	title: "something went right",-->
	<!--	description: "nice",-->
	<!--	active: true,-->
	<!--	 })-->
	<!--	 }>Toast!-->
	<!--	</button>-->
{/if}


<style lang="postcss">
    .toastEnter {
        @apply transform ease-out duration-300 transition translate-y-0 opacity-100 sm:translate-x-0;
    }

    .toastLeave {
        @apply transition ease-in duration-100 opacity-0;
    }

</style>

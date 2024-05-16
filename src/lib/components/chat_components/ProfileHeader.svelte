<script>
	import {CallManager} from "$lib/CallManager";
	import { page } from '$app/stores';
	const callManager = new CallManager($page.params.id);
	callManager.handleIncomingCall = (mediaConnection) => {
		console.log("Incoming call");
	}
	function call() {
		
		callManager.joinRoom();
	}
	function answer(){
		callManager.acceptCall();
	}
</script>
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
				<div>
					<span class="text-slate-200  group-hover:text-black">Vynxc</span>
					<div class="text-sm text-slate-400 group-hover:text-slate-600 ">
						<p class="truncate text-ellipsis overflow-hidden font-normal">
							Online</p>
					</div>
				</div>
				<ul class="flex gap-4 items-center">
					<li>
						<button onclick="{callManager.joinRoom}" class="group">
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
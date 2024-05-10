<script lang="ts">
	import WebRtcVoice from "./WebRTCVoice.svelte";

	// import Pusher from 'pusher-js';
	// const messages = $state<string[]>([]);
	// const pusher = new Pusher('SoketiDefaultKey', {
	// 	wsHost: 'soketi.wasimhub.dev',
	// 	forceTLS: true,
	// 	cluster: ''
	// });
	// var channel = pusher.subscribe('messages');
	// channel.bind('client-messages', function(x: string){
	// 	console.log(x);
	// 	messages.push(x);
	// });
    // let message = $state("");
</script>

<!-- <WebRtcVoice/> -->
<!-- {#each messages as message}
	{message}
{/each}
<input type="text" bind:value={message}>
<button onclick="{()=>{
    channel.trigger("client-messages",message);
}}">Send</button> -->
<WebRtcVoice/>
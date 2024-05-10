<script lang="ts">
	import { onMount } from 'svelte';
	import WebRTCPeer from './webrtcPeer';

	let localStream: MediaStream;
	let remoteStream: MediaStream;
	let webRTCPeer: WebRTCPeer;
	let showCallPopup = $state(false);
	let pendingPromise = createPendingPromise();
	let channelName = $state('voice-chat-1');
	onMount(async () => {
		localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
		webRTCPeer = new WebRTCPeer(
			{
				localStream,
				channelName,
				iceServers: [
					{
						urls: 'stun:freeturn.net:3478'
					},
					{
						urls: 'stun:freeturn.net:5349'
					},
					{
						urls: 'turn:freeturn.net:5349',
						username: 'free',
						credential: 'free'
					},
					{
						urls: 'turn:freeturn.net:3478',
						username: 'free',
						credential: 'free'
					}
				]
			},
			async () => {
				return await pendingPromise.promise;
			}
		);

		webRTCPeer.on('remoteStreamAdded', (stream) => {
			remoteStream = stream;
			const remoteAudio = document.getElementById('remoteAudio') as HTMLAudioElement;
			remoteAudio.srcObject = remoteStream;
		});

		webRTCPeer.on('callReceived', () => {
			showCallPopup = true;
		});
		webRTCPeer.on('callRejected', () => {
			showCallPopup = false;
		});
	});

	function startCall() {
		webRTCPeer.createOffer();
	}
	function acceptCall() {
		//webRTCPeer.acceptCall();
		showCallPopup = false;
		pendingPromise.resolve(true);
	}

	function rejectCall() {
		pendingPromise.resolve(false);
		showCallPopup = false;
	}
	function createPendingPromise() {
		let resolveFunc: (value: boolean | PromiseLike<boolean>) => void;
		let rejectFunc: (reason?: any) => void;
		const promise = new Promise<boolean>((resolve, reject) => {
			resolveFunc = resolve;
			rejectFunc = reject;
		});

		return {
			promise,
			resolve: resolveFunc!,
			reject: rejectFunc!
		};
	}
</script>

<input type="text" bind:value={channelName} />
<div>
	<audio id="remoteAudio" autoplay ></audio>
	<button onclick={startCall}>Start Call</button>
</div>

{#if showCallPopup}
	<div class="popup">
		<h2>Incoming Call</h2>
		<button onclick={acceptCall}>Accept</button>
		<button onclick={rejectCall}>Reject</button>
	</div>
{/if}

<style>
	.popup {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: white;
		padding: 20px;
		border-radius: 5px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	}
</style>

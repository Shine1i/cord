<script lang="ts">
	import { CallsApi } from '$lib/calls';

	const calls = new CallsApi(
		'360c0c71eee1961ea52c9cb040b0c1ec',
		'8730ef84fe40edcb4d8e67135bb721745541c3e8e73d34b42829081630f59ed9'
	);
	const peerConnection = new RTCPeerConnection({
		iceServers: [
			{
				urls: 'stun:stun.cloudflare.com:3478'
			}
		],
		bundlePolicy: 'max-bundle'
	});

	async function start() {
		const localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
		//const localVideoElement = document.getElementById('local-audio')! as HTMLVideoElement;
		//localVideoElement.srcObject = localStream;
		const transceivers = localStream.getTracks().map((track) =>
			peerConnection.addTransceiver(track, {
				direction: 'sendonly'
			})
		);

		const offer = await peerConnection.createOffer();
		await peerConnection.setLocalDescription(offer);
		const newSession = await calls.newSession(peerConnection.localDescription!.sdp!);
		await peerConnection.setRemoteDescription(
			new RTCSessionDescription(newSession.sessionDescription)
		);
		await new Promise((resolve, reject) => {
			peerConnection.addEventListener('iceconnectionstatechange', (ev) => {
				// @ts-ignore
				if (ev.target.iceConnectionState === 'connected') {
					// @ts-ignore
					resolve();
				}
				setTimeout(reject, 5000, 'connect timeout');
			});
		});
		console.warn(2);
		let trackObjects = transceivers.map((transceiver) => {
			return {
				location: 'local',
				mid: transceiver.mid,
				trackName: transceiver.sender.track!.id
			};
		});
		console.warn(3);

		await peerConnection.setLocalDescription(await peerConnection.createOffer());
		const newLocalTracksResult = await calls.newTracks(
			trackObjects,
			peerConnection.localDescription!.sdp
		);
		console.warn(4);

		await peerConnection.setRemoteDescription(
			new RTCSessionDescription(newLocalTracksResult.sessionDescription)
		);
		console.warn(5);
		trackObjects = trackObjects.map((trackObject) => {
			return {
				location: 'remote',
				sessionId: calls.sessionId,
				trackName: trackObject.trackName
			};
		});
		// Prepare to receive the tracks before asking for them
		const remoteTracksPromise = new Promise((resolve) => {
			let tracks = [];
			peerConnection.ontrack = (event) => {
				tracks.push(event.track);
				if (tracks.length >= 2) {
					// remote video & audio are ready
					resolve(tracks);
				}
			};
		});
		console.warn(6);

		const newRemoteTracksResult = await calls.newTracks(trackObjects);
		if (newRemoteTracksResult.requiresImmediateRenegotiation) {
			switch (newRemoteTracksResult.sessionDescription.type) {
				case 'offer':
					// We let Cloudflare know we're ready to receive the tracks
					await peerConnection.setRemoteDescription(
						new RTCSessionDescription(newRemoteTracksResult.sessionDescription)
					);
					await peerConnection.setLocalDescription(await peerConnection.createAnswer());
					await calls.sendAnswerSDP(peerConnection.localDescription!.sdp);
					break;
				case 'answer':
					throw new Error('An offer SDP was expected');
			}
		}

		console.log(newRemoteTracksResult);
		const remoteTracks = await remoteTracksPromise;
        console.warn(remoteTracks);
		const remoteVideoElement = document.getElementById('remote-audio')! as HTMLVideoElement;
		const remoteStream = new MediaStream();
		remoteStream.addTrack(remoteTracks[0]);
		remoteStream.addTrack(remoteTracks[1]);
		remoteVideoElement.srcObject = remoteStream;
	}
</script>

<button onclick={start}>START</button>
<audio id="local-audio" autoplay></audio>
<audio id="remote-audio" autoplay></audio>

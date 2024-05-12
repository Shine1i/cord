<script lang="ts">
	import { CallsApi } from '$lib/calls';
	
	let localStream: MediaStream;
	let peerConnection: RTCPeerConnection;
	let calls: CallsApi;
	
	async function initializeCallsApi() {
		calls = new CallsApi(
			'360c0c71eee1961ea52c9cb040b0c1ec',
			'8730ef84fe40edcb4d8e67135bb721745541c3e8e73d34b42829081630f59ed9'
		);
	}
	
	async function initializePeerConnection() {
		peerConnection = new RTCPeerConnection({
			iceServers: [
				{
					urls: 'stun:stun.cloudflare.com:3478'
				}
			],
			bundlePolicy: 'max-bundle'
			
		});
	}
	
	async function getUserMedia() {
		try {
			localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
		} catch (error) {
			console.error('Error accessing microphone:', error);
			alert('Please allow microphone access to use this feature.');
			return;
		}
	}
	
	async function addTransceivers() {
		const transceivers = localStream.getTracks().map((track) =>
			peerConnection.addTransceiver(track, {
				direction: 'sendonly'
			})
		);
		return transceivers;
	}
	
	async function createOffer() {
		const offer = await peerConnection.createOffer();
		await peerConnection.setLocalDescription(offer);
		const newSession = await calls.newSession(peerConnection.localDescription!.sdp!);
		console.log('New session:', newSession);
		await peerConnection.setRemoteDescription(
			new RTCSessionDescription(newSession.sessionDescription)
		);
	}
	
	async function waitForIceConnection() {
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
	}
	
	async function createLocalTracks(transceivers: RTCRtpTransceiver[]) {
		let trackObjects = transceivers.map((transceiver) => {
			return {
				location: 'local',
				mid: transceiver.mid,
				trackName: transceiver.sender.track!.id
			};
		});
		
		await peerConnection.setLocalDescription(await peerConnection.createOffer());
		const newLocalTracksResult = await calls.newTracks(
			trackObjects,
			peerConnection.localDescription!.sdp
		);
		console.log('New local tracks result:', newLocalTracksResult);
		await peerConnection.setRemoteDescription(
			new RTCSessionDescription(newLocalTracksResult.sessionDescription)
		);
		
		return trackObjects;
	}
	
	async function createRemoteTracks(trackObjects: any[]) {
		trackObjects = trackObjects.map((trackObject) => {
			return {
				location: 'remote',
				sessionId: calls.sessionId,
				trackName: trackObject.trackName
			};
		});
		
		const remoteTracksPromise = new Promise((resolve) => {
			let tracks: MediaStreamTrack[] = [];
			peerConnection.ontrack = (event) => {
				tracks.push(event.track);
				if (tracks.length >= 1) {
					resolve(tracks);
				}
			};
		});
		
		const newRemoteTracksResult = await calls.newTracks(trackObjects);
		console.log('New remote tracks result:', newRemoteTracksResult);
		if (newRemoteTracksResult.requiresImmediateRenegotiation) {
			switch (newRemoteTracksResult.sessionDescription.type) {
				case 'offer':
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
		
		return remoteTracksPromise;
	}
	
	async function setupRemoteAudio(remoteTracks: MediaStreamTrack[]) {
		console.log('Remote tracks:', remoteTracks);
		const remoteAudioElement = document.getElementById('remote-audio')! as HTMLAudioElement;
		const remoteStream = new MediaStream();
		remoteStream.addTrack(remoteTracks[0]);
		// remoteStream.addTrack(remoteTracks[1]);
		remoteAudioElement.srcObject = remoteStream;
		remoteTracks[0].onunmute = () => {
			console.log('Remote audio track started receiving data');
		};
		console.log('Remote audio track ready state:', remoteTracks[0].readyState);
		console.log('Remote audio track muted:', remoteTracks[0].muted);
	}
	
	async function start() {
		try {
			await initializeCallsApi();
			await initializePeerConnection();
			await getUserMedia();
			const transceivers = await addTransceivers();
			await createOffer();
			await waitForIceConnection();
			const trackObjects = await createLocalTracks(transceivers);
			const remoteTracks = await createRemoteTracks(trackObjects);
			await setupRemoteAudio(remoteTracks as MediaStreamTrack[]);
		} catch (error) {
			console.error('Error establishing audio connection:', error);
			alert('An error occurred while establishing the audio connection. Please try again.');
		}
	}

</script>

<button on:click={start}>START</button>
<audio id="local-audio" muted autoplay></audio>
<audio id="remote-audio" autoplay></audio>
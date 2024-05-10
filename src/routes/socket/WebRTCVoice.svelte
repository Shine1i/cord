<!-- WEBrtcvoice.svelte -->
<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { WebRTCPeer } from './webrtcPeer';
  
    let localStream: MediaStream;
    let remoteStream: MediaStream;
    let peer: WebRTCPeer;
  
    onMount(async () => {
        const vid1 = document.getElementById('vid1')! as HTMLVideoElement
        const vid2 = document.getElementById('vid2')! as HTMLVideoElement
      try {
        localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        peer = new WebRTCPeer(localStream);
        peer.on('remoteStream', (stream: MediaStream) => {
          remoteStream = stream;
        });
        peer.on('close', () => {
          // Handle peer connection close
        });
        await peer.start();
        vid1.srcObject = localStream
        vid2.srcObject = remoteStream

      } catch (error) {
        console.error('Error setting up WebRTC:', error);
      }
    });
  
    onDestroy(() => {
      if (peer) {
        peer.stop();
      }
    });
  </script>
  
  <video autoplay id="vid1"></video>
  <video autoplay id="vid2"></video>
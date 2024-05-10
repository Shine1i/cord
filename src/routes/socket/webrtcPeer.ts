import { EventEmitter } from 'events';
import Pusher,{Channel} from "pusher-js"

export class WebRTCPeer extends EventEmitter {
  private peerConnection: RTCPeerConnection;
  private localStream: MediaStream;
  private channel: Channel;
  constructor(localStream: MediaStream,channelName: string) {
    super();
    this.localStream = localStream;
    this.peerConnection = new RTCPeerConnection();
    this.peerConnection.onicecandidate = this.handleICECandidate.bind(this);
    this.peerConnection.ontrack = this.handleTrack.bind(this);

    const pusher = new Pusher('SoketiDefaultKey', {
        wsHost:"soketi.wasimhub.dev",
        forceTLS:true,
        cluster: '',
      });
      this.channel = pusher.subscribe(channelName);
      this.channel.bind('offer', this.handleOffer.bind(this));
      this.channel.bind('answer', this.handleAnswer.bind(this));
      this.channel.bind('candidate', this.handleCandidate.bind(this));
  }

  private async handleOffer(offer: RTCSessionDescriptionInit) {
    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    this.sendSignalingMessage({ type: 'answer', answer });
  }

  private async handleAnswer(answer: RTCSessionDescriptionInit) {
    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  }

  private async handleCandidate(candidate: RTCIceCandidateInit) {
    await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  }

  private handleICECandidate(event: RTCPeerConnectionIceEvent) {
    if (event.candidate) {
      this.sendSignalingMessage({ type: 'candidate', candidate: event.candidate });
    }
  }

  private handleTrack(event: RTCTrackEvent) {
    this.emit('remoteStream', event.streams[0]);
  }

  private handleSignalingMessage(event: MessageEvent) {
    const message = JSON.parse(event.data);
    switch (message.type) {
      case 'offer':
        this.handleOffer(message.offer);
        break;
      case 'answer':
        this.handleAnswer(message.answer);
        break;
      case 'candidate':
        this.handleCandidate(message.candidate);
        break;
    }
  }

  
  private async sendSignalingMessage(message: SignalingMessage) {
    console.log(message);
    
    this.channel.trigger("client-"+message.type, message);
  }

  private handleSocketError(event: Event) {
    console.error('WebSocket error:', event);
  }

  private handleSocketClose(event: CloseEvent) {
    console.log('WebSocket closed:', event);
    this.peerConnection.close();
    this.emit('close');
  }

  async start() {
    this.localStream.getTracks().forEach(track => this.peerConnection.addTrack(track, this.localStream));
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    this.sendSignalingMessage({ type: 'offer', offer });
  }

  stop() {
    this.peerConnection.close();
  }
}

interface SignalingMessage {
  type: 'offer' | 'answer' | 'candidate';
  offer?: RTCSessionDescriptionInit;
  answer?: RTCSessionDescriptionInit;
  candidate?: RTCIceCandidateInit;
}
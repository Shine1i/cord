import { EventEmitter } from 'events';
import Pusher, { Channel } from 'pusher-js';

interface WebRTCPeerOptions {
  localStream: MediaStream;
  channelName: string;
  iceServers: RTCIceServer[];
}

class WebRTCPeer extends EventEmitter {
  //@ts-ignore
  private peerConnection: RTCPeerConnection;
  private localStream: MediaStream;
  private channel: Channel;
  private pusher: Pusher;
  answerCallback:() => Promise<boolean>;
  constructor({ localStream, channelName, iceServers }: WebRTCPeerOptions,callback:() => Promise<boolean>) {
    super();
    this.answerCallback = callback;
    this.localStream = localStream;
    this.pusher = new Pusher('SoketiDefaultKey', {
      wsHost: 'soketi.wasimhub.dev',
      forceTLS: false,
      cluster: '',
    });
    const test = ()=>{return true};
    this.channel = this.pusher.subscribe(channelName);
    this.setupPeerConnection(iceServers);
    this.setupEventListeners();
  }
  
  private setupPeerConnection(iceServers: RTCIceServer[]) {
    this.peerConnection = new RTCPeerConnection({ iceServers });
    this.localStream.getTracks().forEach((track) => {
      this.peerConnection.addTrack(track, this.localStream);
    });
  }
  
  private setupEventListeners() {
    this.peerConnection.onicecandidate = this.handleICECandidate.bind(this);
    this.peerConnection.ontrack = this.handleTrackEvent.bind(this);
    this.peerConnection.onnegotiationneeded = this.handleNegotiationNeeded.bind(this);
    
    this.channel.bind('client-offer', this.handleOfferMessage.bind(this));
    this.channel.bind('client-answer', this.handleAnswerMessage.bind(this));
    this.channel.bind('client-ice-candidate', this.handleNewICECandidateMessage.bind(this));
  }
  
  private handleICECandidate(event: RTCPeerConnectionIceEvent) {
    if (event.candidate) {
      this.channel.trigger('client-ice-candidate', {
        candidate: event.candidate,
      });
    }
  }
  
  private handleTrackEvent(event: RTCTrackEvent) {
    this.emit('remoteStreamAdded', event.streams[0]);
  }
  
  private async handleNegotiationNeeded() {
    try {
      await this.createOffer();
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  }
  
  public async createOffer() {
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    this.channel.trigger('client-offer', { offer });
  }
  
  private async handleOfferMessage(data: any) {

   
    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    this.emit('callReceived');

    const shouldAnswer =await this.answerCallback();
    if(!shouldAnswer) return; 
    this.channel.trigger('client-answer', { answer });
  }
 
  private async handleAnswerMessage(data: any) {
    if (this.peerConnection.signalingState === 'have-local-offer') {
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
    } else {
      console.warn('Unexpected signaling state:', this.peerConnection.signalingState);
    }
  }
  
  private async handleNewICECandidateMessage(data: any) {
    try {
      if (this.peerConnection.remoteDescription) {
        await this.peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
      } else {
        console.warn('Remote description not set, queuing ICE candidate');
        // You can queue the ICE candidate and add it later when the remote description is set
      }
    } catch (error) {
      console.error('Error adding ICE candidate:', error);
    }
  }
}

export default WebRTCPeer;
import Peer, {type MediaConnection} from "peerjs";
export class CallManager {
    private peer: Peer;
    private screenStream: MediaStream | undefined;
    private micStream: MediaStream | undefined;
    private call: MediaConnection | undefined;
    public handleIncomingCall: (call: MediaConnection) => void = () => {};
    constructor(roomId: string) {
        this.peer = new Peer(roomId);

        this.peer.on('open', (id) => {
            console.log('My peer ID is: ' + id);
        });

        this.peer.on('call', (call) => {
            console.log('Incoming call');
            this.call = call;
            this.handleIncomingCall(call);
        });
    }

    async startScreenSharing() {
        try {
            this.screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    //@ts-ignore
                    mandatory: {
                        displaySurface: 'monitor',
                        maxFrameRate: 5
                    }
                },
                audio: true
            });
            this.micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.screenStream.addTrack(this.micStream.getAudioTracks()[0]);
        } catch (error) {
            console.error('Error starting screen sharing:', error);
        }
    }

    async startCall(remotePeerId: string) {
        try {
            if (!this.screenStream) await this.startScreenSharing();
            this.call = this.peer.call(remotePeerId, this.screenStream!);
            this.call.on('stream', (remoteStream) => {
                this.addRemoteStream(remoteStream);
            });
        } catch (error) {
            console.error('Error making the call:', error);
        }
    }

    private addRemoteStream(stream: MediaStream) {
        const video = document.createElement('video');
        const videoGrid = document.getElementById('video-grid') as HTMLElement;
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', () => {
            video.play();
        });
        videoGrid.append(video);
    }

    async acceptCall() {
        if (this.call) {
            if (!this.screenStream) await this.startScreenSharing();
            this.call.answer(this.screenStream!);
            this.call.on('stream', (remoteStream) => {
                this.addRemoteStream(remoteStream);
            });
        }
    }


    declineCall() {
        if (this.call) {
            this.call.close();
            this.call = undefined;
        }
    }

    disconnect() {
        this.peer.disconnect();
    }

    reconnect() {
        this.peer.reconnect();
    }

    destroy() {
        this.peer.destroy();
    }
}
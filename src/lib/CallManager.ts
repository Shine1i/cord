import Peer, { MediaConnection } from 'peerjs';

export class CallManager {
    private peer: Peer;
    private roomId: string;
    private screenStream: MediaStream | undefined;
    private micStream: MediaStream | undefined;
    private call: MediaConnection | undefined;
    public handleIncomingCall: (call: MediaConnection) => void = () => {};
    constructor(roomId: string) {
        this.peer = new Peer();
        this.roomId = roomId;
        this.peer.on('open', (id) => {
            console.log('My peer ID is: ' + id);
        });
        this.peer.on('call', (call) => {
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

    async joinRoom() {
        try {
            if (!this.screenStream) await this.startScreenSharing();
            this.call = this.peer.call(this.roomId, this.screenStream!);
            this.call.on('stream', (userVideoStream) => {
                this.addVideoStream(userVideoStream);
            });
        } catch (error) {
            console.error('Error joining room:', error);
        }
    }

    private addVideoStream(stream: MediaStream) {
        const video = document.createElement('video');
        const videoGrid = document.getElementById('video-grid') as HTMLElement;
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', () => {
            video.play();
        });
        videoGrid.append(video);
    }

    acceptCall() {
        // Implement accept call logic
    }

    declineCall() {
        // Implement decline call logic
    }
}

// Usage example:
const roomId = 'your-room-id';
const callManager = new CallManager(roomId);
callManager.joinRoom();


export class CallsApi {

    prefixPath: string
    appSecret: string
    sessionId: string | undefined = undefined;

    constructor(appId: string, appSecret: string, basePath = 'https://rtc.live.cloudflare.com/v1') {
        this.prefixPath = `${basePath}/apps/${appId}`;
        this.appSecret = appSecret;
    }

    async sendRequest(url: string, body: any, method = 'POST') {
        const request: RequestInit = {
            method: method,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.appSecret}`
            },
            body: JSON.stringify(body)
        };
        const response = await fetch(url, request);
        const result = await response.json();
        return result;
    }

    checkErrors(result: any, tracksCount = 0) {
        if (result.errorCode) {
            throw new Error(result.errorDescription);
        }
        for (let i = 0; i < tracksCount; i++) {
            if (result.tracks[i].errorCode) {
                throw new Error(
                    `tracks[${i}]: ${result.tracks[i].errorDescription}`
                );
            }
        }
    }

    async newSession(offerSDP: any) {
        const url = `${this.prefixPath}/sessions/new`;
        const body = {
            sessionDescription: {
                type: 'offer',
                sdp: offerSDP
            }
        };
        const result = await this.sendRequest(url, body);
        this.checkErrors(result);
        this.sessionId = result.sessionId;
        return result;
    }
    // newTracks shares local tracks or gets tracks
    async newTracks(trackObjects: any, offerSDP:any = null) {
        const url = `${this.prefixPath}/sessions/${this.sessionId}/tracks/new`;
        const body = {
            sessionDescription: {
                type: 'offer',
                sdp: offerSDP
            },
            tracks: trackObjects
        };
        if (!offerSDP) {
            //@ts-ignore
            delete body['sessionDescription'];
        }
        const result = await this.sendRequest(url, body);
        this.checkErrors(result, trackObjects.length);
        return result;
    }


    // sendAnswerSDP sends an answer SDP if a renegotiation is required
    async sendAnswerSDP(answer: any) {
        const url = `${this.prefixPath}/sessions/${this.sessionId}/renegotiate`;
        const body = {
            sessionDescription: {
                type: 'answer',
                sdp: answer
            }
        };
        const result = await this.sendRequest(url, body, 'PUT');
        this.checkErrors(result);
    }
}


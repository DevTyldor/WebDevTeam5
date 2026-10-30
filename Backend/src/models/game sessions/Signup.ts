class SessionSignup { 
    id: string;
    sessionId: number;
    memberId: string;
    status: string;
    CreatedAt: string;
    gameId: number;

    constructor(i: string, s: number, m: string, st: string, c: string, g: number){
        this.id = i;
        this.sessionId = s;
        this.memberId = m;
        this.status = st;
        this.CreatedAt = c;
        this.gameId = g;
    }
}

export {
    SessionSignup
}
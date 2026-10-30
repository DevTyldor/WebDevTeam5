class SessionGame {
    name: string;
    minPlayers: number;
    maxPlayers: number;
    enoughPlayers: boolean;

    constructor(n: string, min: number, max: number, e: boolean){
        this.name = n;
        this.minPlayers = min;
        this.maxPlayers = max;
        this.enoughPlayers = e;
    }
}

export {
    SessionGame
}
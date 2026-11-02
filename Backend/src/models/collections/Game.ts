class Game {
    id: number;
    title: string;

    constructor(i: number, t: string){
        this.id = i;
        this.title = t;
    }
}

const games : Game[] = [
    new Game(1, "Halo 3"),
    new Game(2, "Overwatch"),
    new Game(3, "Fortnite"),
    new Game(4, "Minecraft"),
    new Game(5, "Mario Kart")
];

function getAllGames() : Game[] {
    return games;
}

function getGameTitle(id: number) : string {
    const game = games.find(g => g.id === id);
    if (game) {
        return game.title;
    }
    return "";
}

export {Game, getAllGames, getGameTitle}

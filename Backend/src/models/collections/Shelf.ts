class Shelf {
    id: number;
    owner: string;
    name: string;
    description: string;
    isPublic: boolean;
    gameIds: number[];

    constructor(i: number, o: string, n: string, d: string, p: boolean, g: number[]){
        this.id = i;
        this.owner = o;
        this.name = n;
        this.description = d;
        this.isPublic = p;
        this.gameIds = g;
    }
}

const shelves : Shelf[] = [];

function addShelf(s: Shelf){
    shelves.push(s);
}

function getAllShelves() : Shelf[] {
    return shelves;
}

function addGameToShelf(shelfId: number, gameId: number){
    const shelf = shelves.find(s => s.id === shelfId);
    if (!shelf) {
        return;
    }

    const alreadyOnShelf = shelf.gameIds.includes(gameId);
    if (!alreadyOnShelf) {
        shelf.gameIds.push(gameId);
    }
}

export {Shelf, addShelf, getAllShelves, addGameToShelf}

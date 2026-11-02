class CollectionRecord {
    id: number;
    owner: string;
    gameId: number;
    status: string;
    plays: number;
    rating: number;
    note: string;

    constructor(i: number, o: string, g: number, s: string, p: number, r: number, n: string){
        this.id = i;
        this.owner = o;
        this.gameId = g;
        this.status = s;
        this.plays = p;
        this.rating = r;
        this.note = n;
    }
}

const records : CollectionRecord[] = [];

function addRecord(r: CollectionRecord){
    records.push(r);
}

function getAllRecords() : CollectionRecord[] {
    return records;
}

export {CollectionRecord, addRecord, getAllRecords}

export type ApiResponse = { 
    count: number;
    next: string | null;
    previous: string | null;
    results: Heroe[];
}

export type Heroe = {
    id: string;
    name: string;
}
export type ApiResponseHeroes = { 
    count: number;
    next: string | null;
    previous: string | null;
    results: Heroe[];
}

export type Heroe = {
    id: string;
    name: string;
    films: number[];
    starships: number[];
}

export type Films = {
    id: string;
    title: string;
    starships: number[];
}
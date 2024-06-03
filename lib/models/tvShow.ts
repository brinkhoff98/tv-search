
export type TvShow = {
    score: number;
    show: ShowDetails;
};

export type ShowDetails = {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime: number | null;
    premiered: string | null;
    ended: string | null;
    officialSite: string | null;
    rating: Rating;
    network: Network | null;
    image: Image;
    summary: string | null;
    updated: number;
}

export type Rating = {
    average: number | null;
}

export type Network = {
    name: string;
}

export type Image = {
    medium: string;
    original: string;
}

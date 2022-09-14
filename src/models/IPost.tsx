import { IBlog } from "./IBlog";

export interface IPost {
    id: string;
    title: string;
    image: string;
    slugTitle: string;
    date: string;
    blog: IBlog;
}

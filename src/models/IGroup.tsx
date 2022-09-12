import { ICategory } from "./ICategory";

export interface IGroup {
    id: string;
    title: string;
    categories: ICategory[];
}
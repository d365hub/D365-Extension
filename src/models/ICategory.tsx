import { IGroup } from "./IGroup";

export interface ICategory {
    id: string;
    title: string;
    iconUrl: string;
    isSelected: boolean;
    group: IGroup;
}

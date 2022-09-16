import ChromeStorage from "./chromeStorage.service";
import LocalStorage from "./localStorage.Service";

export interface StorageService {

    get(key: string): any;

    set(key: string, data: any): void
}

const storage = new LocalStorage();
export default storage;
import { StorageService } from "./storage.service";

class ChromeStorage implements StorageService {

    get(key: string) {
        return chrome.storage.local.get(key);
    }

    set(key: string, data: any) {
        return chrome.storage.local.set({ key: data });
    }

}

export default ChromeStorage;
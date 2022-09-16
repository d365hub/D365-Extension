import { StorageService } from "./storage.service";

class LocalStorage implements StorageService {

    get(key: string): any {
        const data = localStorage.getItem(key);
        if (data)
            return JSON.parse(data);

        return data;
    }

    set(key: string, data: any) {
        return localStorage.setItem(key, JSON.stringify(data));
    }

}

export default LocalStorage;
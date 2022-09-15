class StorageService {

    get(key: string) {
        return chrome.storage.local.get(key);
    }

    set(data: any) {
        return chrome.storage.local.set(data);
    }
}

const storage = new StorageService();
export default storage;
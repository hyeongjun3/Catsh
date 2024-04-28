const CONSOLE_PREFIX = "[IndexedDBManager]";

interface RecordingObject {
  id: string;
  blob: Blob;
}

// HJ TODO: layout 로딩 필요
class IndexedDBManager {
  private static m_instance: IndexedDBManager;

  private m_dbname: string;
  private m_recordingObjStoreName: string;
  private m_isSetup: boolean;

  // initalized after setup
  private m_db: IDBDatabase;
  private m_recordingObjStore: IDBObjectStore;

  public static getInstance() {
    if (!this.m_instance) this.m_instance = new this();

    return this.m_instance;
  }

  // HJ TODO: constructor에서 부르고 setup에서는 캐싱된 값 뱉으면 더 좋을듯
  constructor() {
    this.m_dbname = "MyDB";
    this.m_recordingObjStoreName = "RecordingVideos";
    this.m_isSetup = false;
    this.setUp();
  }

  public async setUp() {
    if (this.m_isSetup) return;

    console.debug(CONSOLE_PREFIX, "setup");

    await new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(this.m_dbname, 1);
      request.onerror = (e) => {
        console.error(CONSOLE_PREFIX, e);
        reject(e);
      };
      request.onsuccess = (e) => {
        console.debug(CONSOLE_PREFIX, "open success");
        // @ts-ignore
        this.m_db = e.target.result;

        resolve();
      };
      request.onupgradeneeded = (e) => {
        console.debug(CONSOLE_PREFIX, "open upgrade");
        // @ts-ignore
        this.m_db = e.target.result;
        this.createRecordingObjectStore();
        resolve();
      };
    });

    this.m_isSetup = true;
  }

  public getRecordingObject(id: string) {
    return new Promise<RecordingObject>((resolve, reject) => {
      const request = this.m_db
        .transaction(this.m_recordingObjStoreName, "readonly")
        .objectStore(this.m_recordingObjStoreName)
        .get(id) as IDBRequest<RecordingObject>;

      request.onerror = (e) => {
        console.error(CONSOLE_PREFIX, e);
        reject(e);
      };

      request.onsuccess = () => {
        console.debug(CONSOLE_PREFIX, "get onsuccess");
        resolve(request.result);
      };
    });
  }

  public getRecordingObjectAll() {
    return new Promise<RecordingObject[]>((resolve, reject) => {
      const request = this.m_db
        .transaction(this.m_recordingObjStoreName, "readonly")
        .objectStore(this.m_recordingObjStoreName)
        .getAll() as IDBRequest<RecordingObject[]>;

      request.onerror = (e) => {
        console.error(CONSOLE_PREFIX, e);
        reject(e);
      };

      request.onsuccess = (e) => {
        console.debug(CONSOLE_PREFIX, "get onsuccess");
        resolve(request.result);
      };
    });
  }

  public addRecordingObject(recordingObject: RecordingObject) {
    return new Promise<void>((resolve, reject) => {
      const request = this.m_db
        .transaction(this.m_recordingObjStoreName, "readwrite")
        .objectStore(this.m_recordingObjStoreName)
        .put(recordingObject);

      request.onerror = (e) => {
        console.error(CONSOLE_PREFIX, e);
        reject(e);
      };

      request.onsuccess = () => {
        console.debug(CONSOLE_PREFIX, "add onsuccess");
        resolve();
      };
    });
  }

  private createRecordingObjectStore() {
    this.m_recordingObjStore = this.m_db.createObjectStore(
      this.m_recordingObjStoreName,
      {
        keyPath: "id",
      }
    );

    this.m_recordingObjStore.createIndex("id", "id", { unique: true });
    this.m_recordingObjStore.createIndex("blob", "blob", { unique: true });
  }
}

const indexedDBManager = IndexedDBManager.getInstance();
export default indexedDBManager;

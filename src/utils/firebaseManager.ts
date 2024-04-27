import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import {
  FirebaseStorage,
  getBlob,
  getDownloadURL,
  getStorage,
  ref,
} from "firebase/storage";

type ContentType = "json" | "blob";

class FirebaseManager {
  private static m_instance: FirebaseManager;
  private m_app: FirebaseApp;
  private m_storage: FirebaseStorage;

  public static getInstance() {
    if (!this.m_instance) this.m_instance = new this();

    return this.m_instance;
  }

  constructor() {
    // HJ TODO: env 파일로 변경
    const configuration: FirebaseOptions = {
      apiKey: "AIzaSyAXLFVaAiQo3riElNmO-7uc1UG_otY5J1M",
      authDomain: "catsch-590d9.firebaseapp.com",
      projectId: "catsch-590d9",
      storageBucket: "catsch-590d9.appspot.com",
      messagingSenderId: "368993171879",
      appId: "1:368993171879:web:5970b61409f2f900199e82",
      measurementId: "G-GSHHLB2YP1",
    };

    this.m_app = initializeApp(configuration);
    this.m_storage = getStorage(this.m_app, "gs://catsch-590d9.appspot.com");
    this.m_storage.maxOperationRetryTime = 0;
  }

  public async getFile(src: string, type: ContentType) {
    const reference = ref(this.m_storage, src);

    const blob = await getBlob(reference);

    if (type === "json") {
      const text = await blob.text();
      return JSON.parse(text);
    }
    return getBlob(reference);
  }

  public async getUrl(src: string) {
    const reference = ref(this.m_storage, src);

    return getDownloadURL(reference);
  }
}

const firebaseManager = FirebaseManager.getInstance();
export default firebaseManager;

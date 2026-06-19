import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Tu configuración de Firebase (¡un solo lugar para cambiarla!)
const firebaseConfig = {
  apiKey: "AIzaSyC78y2K4T9rMFMVsG_UQxTmPANzV7Yapf8",
  authDomain: "caminosnuevosdatabase.firebaseapp.com",
  projectId: "caminosnuevosdatabase",
  storageBucket: "caminosnuevosdatabase.appspot.com",
  messagingSenderId: "907500835423",
  appId: "1:907500835423:web:f50b459a84f5d7d92a81ea",
  measurementId: "G-3N6B4PV2NC"
};

// Inicializa Firebase y exporta los servicios que usarás en toda la app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
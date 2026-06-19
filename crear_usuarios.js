const admin = require('firebase-admin');

// 1. Debes descargar tu llave de servicio desde la Consola de Firebase:
// Configuración del proyecto > Cuentas de servicio > Generar nueva clave privada
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const usuarios = [
  { email: 'psicologia@caminosnuevos.com', password: 'psico2024', displayName: 'Psicología', claims: { rol: 'psicologia' } },
  { email: 'terapeuta@caminosnuevos.com', password: 'tera2024', displayName: 'Terapeuta', claims: { rol: 'terapeuta' } },
  { email: 'director_terapeutico@caminosnuevos.com', password: 'dirtera2024', displayName: 'Director Terapéutico', claims: { rol: 'director_terapeutico' } },
  { email: 'directora_general@caminosnuevos.com', password: 'dirgen2024', displayName: 'Directora General', claims: { rol: 'directora_general', admin: true } },
  { email: 'admin@caminosnuevos.com', password: 'admin2024', displayName: 'Administrador', claims: { rol: 'admin', admin: true } }
];

async function crearUsuarios() {
  console.log("🚀 Iniciando creación de usuarios en Firebase Auth...");
  
  for (const u of usuarios) {
    try {
      const userRecord = await admin.auth().createUser({
        email: u.email,
        password: u.password,
        displayName: u.displayName,
        emailVerified: true
      });
      console.log(`✅ Usuario creado exitosamente: ${userRecord.email}`);

      // Asignar los Custom Claims al usuario recién creado
      await admin.auth().setCustomUserClaims(userRecord.uid, u.claims);
      console.log(`   ✨ Claims asignados a ${u.email}:`, u.claims);
    } catch (error) {
      if (error.code === 'auth/email-already-exists') {
        console.log(`ℹ️ El usuario ${u.email} ya existe en el sistema.`);
      } else {
        console.error(`❌ Error creando ${u.email}:`, error.message);
      }
    }
  }
  
  console.log("\n✨ Proceso de registro finalizado.");
  process.exit();
}

crearUsuarios();

// INSTRUCCIONES DE EJECUCIÓN:
// 1. Instalar dependencias: npm install firebase-admin
// 2. Ejecutar: node crear_usuarios.js
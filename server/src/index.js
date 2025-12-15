import app from './app.js';
import pool from './config/db.js';

// Opcional: verificar conexión al iniciar
async function startServer() {
  try {
    // Verificamos si la conexión funciona
    await pool.query('SELECT 1');
    console.log('>>>>>> Base de datos Local conectada <<<<<<');

    // Hacemos la conexión accesible en las rutas a través de req.app.get('db')
    app.set('db', pool);

    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    // ✅ Usa process.env.PORT si existe (Render), o 4000 en local
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`>>>>>>>> Servidor corriendo en el puerto ${PORT} <<<<<<<<`);
    });
    
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }
}

startServer();

import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  iniciarCotizacion,
  obtenerCotizacionesBorrador,
  finalizarCotizacion,
  verCotizacionCompleta,
  obtenerCotizacionBorradorPorId,
  actualizarCotizacionBorrador,
  marcarCotizacionComoPendiente,
  actualizarEstado,
  obtenerTodasLasCotizaciones,
  listarCotizacionesDashboard
} from '../controllers/cotizacionController.js';
import * as cotizacionController from '../controllers/cotizacionController.js';

const router = Router();

// Crear cotización
router.post('/iniciar', authRequired, iniciarCotizacion);

// Todas las cotizaciones de un usuario específico
router.get('/todas/usuario/:id_usuario', authRequired, obtenerTodasLasCotizaciones);

// Todas las cotizaciones (según token/rol)
router.get('/todas', authRequired, obtenerTodasLasCotizaciones);

// Borradores
router.get('/borrador/:id_usuario', authRequired, obtenerCotizacionesBorrador);
router.get('/borrador/retomar/:id', authRequired, obtenerCotizacionBorradorPorId);

// Finalizar
router.put('/finalizar/:id', authRequired, finalizarCotizacion);

// Ver completa
router.get('/ver/:id', authRequired, verCotizacionCompleta);

// Actualizar borrador
router.put('/:id/actualizar', authRequired, actualizarCotizacionBorrador);

// Cambiar estado
router.put('/estado/pendiente/:id', marcarCotizacionComoPendiente);
router.put('/estado/:id', actualizarEstado);

// Alerta vencimiento
router.post('/alerta-vencimiento/:id', cotizacionController.enviarAlertaVencimiento);

// Dashboard
router.get('/dashboard', listarCotizacionesDashboard);

export default router;

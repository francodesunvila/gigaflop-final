// src/routes/cotizacionRoutes.js
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

// Crear cotización con cliente y productos completos
router.post('/iniciar', authRequired, iniciarCotizacion);

// Mostrar todas las cotizaciones de un usuario específico
router.get('/todas/usuario/:id_usuario', authRequired, obtenerTodasLasCotizaciones);

// Mostrar todas las cotizaciones (según token/rol)
router.get('/todas', authRequired, obtenerTodasLasCotizaciones);

// Cotizaciones en borrador
router.get('/borrador/:id_usuario', authRequired, obtenerCotizacionesBorrador);
router.get('/borrador/retomar/:id', authRequired, obtenerCotizacionBorradorPorId);

// Finalizar cotización
router.put('/finalizar/:id', authRequired, finalizarCotizacion);

// Ver cotización completa
router.get('/ver/:id', authRequired, verCotizacionCompleta);

// Actualizar borrador
router.put('/:id/actualizar', authRequired, actualizarCotizacionBorrador);

// Cambiar estado a pendiente
router.put('/estado/pendiente/:id', marcarCotizacionComoPendiente);

// Actualizar estado
router.put('/estado/:id', actualizarEstado);

// Enviar alerta de vencimiento
router.post('/alerta-vencimiento/:id', cotizacionController.enviarAlertaVencimiento);

// Dashboard
router.get('/dashboard', listarCotizacionesDashboard);

export default router;

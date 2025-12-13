// src/routes/clientesRoutes.js
import { Router } from 'express';
import {
  crearClienteController,
  listarClientesController,
  listarClienteController,
  actualizarClienteController,
  eliminarClienteController,
  buscarClientesPorTextoController,
  getCondicionesComerciales,
  getDiasPagoPorCliente,
  traerDireccionesCliente,
  obtenerCostoEnvioPorDireccion,
  listarZonasConCostoController,
  crearClienteCompletoController,
  obtenerClienteCompletoPorCuit,
  actualizarDireccionesCliente,
  obtenerClientePorIdController,
  actualizarContactosCliente,
  actualizarCondicionesCliente
} from '../controllers/clientesControllers.js';

// 👇 Import correcto del controlador de contactos (NO está en clientesControllers)
import { obtenerContactosPorClienteController } from '../controllers/contactosControllers.js';

const router = Router();

// Crear cliente con cuit y razón social
router.post('/', crearClienteController);

// Buscar clientes por texto en razón social o cuit
router.get('/buscar/:query', buscarClientesPorTextoController);

// Listar un solo cliente por razón social / cuit
router.get('/clientes/buscar/:razon_social', listarClienteController);

// Listar todos los clientes
router.get('/', listarClientesController);

// Actualizar un cliente por cuit
router.put('/:cuit', actualizarClienteController);

// Eliminar un cliente por cuit
router.delete('/:cuit', eliminarClienteController);

// Condiciones comerciales por id
router.get('/:id/condiciones', getCondicionesComerciales);

// Días de pago por cliente (id)
router.get('/:id/dias-pago', getDiasPagoPorCliente);

// Direcciones por cliente (id)
router.get('/:id/direcciones', traerDireccionesCliente);

// Obtener cliente por id
router.get('/:id', obtenerClientePorIdController);

// Costos de envío
router.get('/envios/costo', obtenerCostoEnvioPorDireccion);

// Zonas con costo
router.get('/envios/zonas', listarZonasConCostoController);

// Crear cliente completo
router.post('/completo', crearClienteCompletoController);

// Obtener cliente completo por cuit
router.get('/completo/:cuit', obtenerClienteCompletoPorCuit);

// Actualizar direcciones por cuit
router.put('/direcciones/:cuit', actualizarDireccionesCliente);

// ✅ NUEVA RUTA: obtener contactos por ID de cliente (coincide con /api/clientes/:id/contactos)
router.get('/:id/contactos', obtenerContactosPorClienteController);

// Actualizar contactos por cuit
router.put('/contactos/:cuit', actualizarContactosCliente);

// Actualizar condiciones por cuit
router.put('/condiciones/:cuit', actualizarCondicionesCliente);

export default router;

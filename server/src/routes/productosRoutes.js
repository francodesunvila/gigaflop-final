import { Router } from "express";
import * as productosController from '../controllers/productosControllers.js';

const router = Router();

// Buscar por part_number
router.get('/buscar/part_number/:partNumber', productosController.obtenerProductoPorPartNumber);

// Buscar por cualquier columna válida
router.get('/buscar/columna/:columna/:valor', productosController.obtenerProductosPorColumna);

// Listar todos los productos
router.get('/', productosController.listarTodosLosProductos);

// Buscar por texto libre
router.get('/buscar/texto/:valor', productosController.buscarProductos);

// Sincronizar productos desde API externa
router.get('/sincronizar', productosController.sincronizarProductos);

// Búsqueda flexible por múltiples columnas
router.get('/buscar-flex', productosController.buscarProductosFlexibles);

// Listar productos que tienen imagen
router.get('/con-imagen', productosController.listarProductosConImagen);

// Obtener imagen proxy
router.get('/imagen/:nombre', productosController.obtenerImagenProxy);

export default router;

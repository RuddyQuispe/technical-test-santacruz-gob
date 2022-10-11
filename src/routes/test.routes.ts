import { Router } from 'express'
import { AccidentesController } from '../controller/accidentes.controller';

const router = Router();
const accidentesController = new AccidentesController();

/**
 * Sector Manage
 */
router.get('/all', accidentesController.index);

router.post('/store', accidentesController.store);

router.get('/edit/:id', accidentesController.edit);

router.put('/update/:id', accidentesController.update);

router.delete('/delete/:id', accidentesController.delete);

export default router;
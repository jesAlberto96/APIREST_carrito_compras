import { Router } from 'express';
import { ItemController } from '../../app/controllers/ItemController';
import { ItemService } from '../../app/services/item.service';

export class Routes {
  constructor(){}

  public readonly entity: string = 'items';

  public routes(): Router {
    const router = Router();
    const itemService = new ItemService();
    const controller = new ItemController(itemService);

    // Definir las rutas
    router.post('', controller.store);
    router.get('', controller.index);
    router.get('/types/list', controller.getTypesItems);
    router.get('/:id', controller.show);
    router.put('/:id', controller.update);

    return router;
  }
}
import { Router } from 'express';
import { ShoppingCartService } from '../../app/services/shoppingcart.service';
import { ShoppingCartController } from '../../app/controllers/ShoppingCartController';

export class Routes {
  constructor(){}

  public readonly entity: string = 'shopping-carts';

  public routes(): Router {
    const router = Router();
    const service = new ShoppingCartService();
    const controller = new ShoppingCartController(service);

    // Definir las rutas
    router.post('', controller.store);

    return router;
  }
}
import { Request, Response } from "express";
import { CustomError } from "../../helpers/errors/custom.error";
import { ShoppingCartService } from "../services/shoppingcart.service";
import { ShoppingCartStoreRequest } from "../request/shopping_carts/shoppingcart.store.request";

export class ShoppingCartController {
    constructor(
        public readonly shoppingCartService: ShoppingCartService
    ){}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError){
            return res.status(error.statusCode).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Internal server error' });
    }

    store = (req: Request, res: Response) => {
        const [error, shoppingCartStoreRequest] = ShoppingCartStoreRequest.create(req.body);

        if (error) return res.status(400).json({error});

        this.shoppingCartService.create(shoppingCartStoreRequest!)
        .then(data => res.status(201).send(data))
        .catch(error => this.handleError(error, res));
    }

    show = (req: Request, res: Response) => {
        const { id } = req.params;
        this.shoppingCartService.getShoppingCart(id)
        .then(data => res.status(200).send(data))
        .catch(error => this.handleError(error, res));
    }
}
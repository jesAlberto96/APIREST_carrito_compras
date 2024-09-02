import { Request, Response } from "express";
import { ItemStoreRequest } from "../request/items/item.store.request";
import { ItemService } from "../services/item.service";
import { CustomError } from "../../helpers/errors/custom.error";
import { ItemUpdateRequest } from "../request/items/item.update.request";

export class ItemController {
    constructor(
        public readonly itemService: ItemService
    ){}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError){
            return res.status(error.statusCode).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Internal server error' });
    }

    index = (req: Request, res: Response) => {
        this.itemService.getItems()
        .then(data => res.status(200).json(data))
        .catch(error => this.handleError(error, res));
    }

    show = (req: Request, res: Response) => {
        const { id } = req.params;
        this.itemService.getItem(id)
        .then(data => res.status(200).json(data))
        .catch(error => this.handleError(error, res));
    }

    store = (req: Request, res: Response) => {
        const [error, itemStoreRequest] = ItemStoreRequest.create(req.body);

        if (error) return res.status(400).json({error});

        this.itemService.create(itemStoreRequest!)
        .then(data => res.status(201).json(data))
        .catch(error => this.handleError(error, res));
    }

    update = (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, itemUpdateRequest] = ItemUpdateRequest.create(req.body);

        if (error) return res.status(400).json({error});

        this.itemService.update(id, itemUpdateRequest!)
        .then(data => res.status(201).json(data))
        .catch(error => this.handleError(error, res));
    }

    getTypesItems = (req: Request, res: Response) => {
        this.itemService.getTypesItems()
        .then(data => res.status(200).json(data))
        .catch(error => this.handleError(error, res));
    }
}
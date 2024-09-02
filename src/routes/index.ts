import { Router } from 'express';
import fs from 'fs';
import path from 'path';

export class AppRoutes {

    static get routes(): Router {
        const router = Router();
        const files = fs.readdirSync('./src/routes/api')
        const namesClassesRoutes = files.map(file => path.parse(file).name);
        namesClassesRoutes.forEach(async (file) => {
            const ClassModule = require(`./api/${file}`);
            const instance = new ClassModule.Routes;
            router.use(`/api/${instance.entity}`, instance.routes());
        });

        //Enter if route doesn´t exists
        router.use('/api/*', (req, res) => {
            res.status(404).json('Page not found');
        });

        return router;
    }

}
import express from 'express';
import ItemController from '../controllers/itemController.js';

const itemsRouter = express();

itemsRouter.get('/items', ItemController.getItems);

// categoriesRouter.get('/categories/:categoryId', categoryController.read);

itemsRouter.post('/items', ItemController.create);

itemsRouter.patch('/items/:itemId', ItemController.update);

itemsRouter.delete('/items/:itemId', ItemController.delete);

export default itemsRouter;
import express from 'express';
import { getError } from '../utils/utils.js';
import categoryController from '../controllers/categoryController.js';

const categoriesRouter = express();

categoriesRouter.get('/categories', categoryController.getCategories);

categoriesRouter.get('/categories/:categoryId', categoryController.read);

categoriesRouter.post('/categories', categoryController.create);

categoriesRouter.patch('/categories/:categoryId', categoryController.update);

categoriesRouter.delete('/categories/:categoryId', categoryController.delete);

export default categoriesRouter;
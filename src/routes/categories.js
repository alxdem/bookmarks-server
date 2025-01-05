import express from 'express';
import categoryController from '../controllers/categoryController.js';
import jwtMiddleware from '../middleware/jwtMiddleware.js';

const categoriesRouter = express();

categoriesRouter.get('/categories', jwtMiddleware, categoryController.getCategories);

categoriesRouter.get('/categories/:categoryId', jwtMiddleware, categoryController.read);

categoriesRouter.post('/categories', jwtMiddleware, categoryController.create);

categoriesRouter.patch('/categories/:categoryId', jwtMiddleware, categoryController.update);

categoriesRouter.delete('/categories/:categoryId', jwtMiddleware, categoryController.delete);

export default categoriesRouter;
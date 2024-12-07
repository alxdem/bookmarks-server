import CategoryModel from '../models/category.js';
import { getError } from '../utils/utils.js';
import { text } from '../utils/variables.js';

class CategoryController {
    async getCategories(req, res) {
        try {
            const { userId } = req.body || {};

            const data = await CategoryModel.find({
                userId: userId,
            });

            // return res.json(data);
            return data;
        } catch (err) {
            return res.status(500).json(getError(text.SERVER_ERROR, err));
        }
    }

    async create(req, res) {
        try {
            const { title, userId, order = 0, description = '' } = req.body || {};

            if (!userId) {
                return res.status(400).json(getError(text.USER_NOT_FOUND));
            }

            if (!title) {
                return res.status(400).json(getError(text.TITLE_EMPTY));
            }

            const category = new CategoryModel({
                order,
                title,
                description,
                userId,
            });

            category.save();

            return res.json(category);
        } catch (err) {
            return res.status(500).json(getError(text.SERVER_ERROR, err));
        }
    }

    async read(req, res) {
        try {
            const userId = req.body?.userId;
            const categoryId = req.params?.categoryId;

            if (!userId) {
                return res.status(400).json(getError(text.USER_NOT_FOUND));
            }

            const category = await CategoryModel.findOne({
                _id: categoryId,
                userId: userId,
            });

            if (category) {
                return res.json(category);
            } else {
                return res.status(400).json(getError(`Категория с id ${categoryId} не существует`));
            }
        } catch (err) {
            return res.status(500).json(getError(text.SERVER_ERROR, err));
        }
    }

    async update(req, res) {
        try {
            const { userId, ...otherParams } = req.body || {};
            const categoryId = req.params?.categoryId;

            if (!userId) {
                return res.status(400).json(getError(text.USER_NOT_FOUND));
            }

            const category = await CategoryModel.findOneAndUpdate({
                _id: categoryId,
                userId: userId,
            },
                otherParams,
                { new: true }
            );

            category.save();

            return res.json(category);
        } catch (err) {
            return res.status(500).json(getError(text.SERVER_ERROR, err));
        }
    }

    async delete(req, res) {
        try {
            const userId = req.body?.userId;
            const categoryId = req.params?.categoryId;

            if (!userId) {
                return res.status(400).json(getError(text.USER_NOT_FOUND));
            }

            const category = await CategoryModel.findOneAndDelete({
                _id: categoryId,
                userId: userId,
            });

            if (!category) {
                return res.status(404).json({ error: text.CATEGORY_NOT_FOUND });
            }

            return res.json(category);
        } catch (err) {
            return res.status(500).json(getError(text.SERVER_ERROR, err));
        }
    }
}

export default new CategoryController();
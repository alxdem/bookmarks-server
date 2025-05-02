import itemModel from '../models/item.js';
import UserModel from '../models/users.js';
import CategoryModel from '../models/category.js';
import { getError } from '../utils/utils.js';
import { text } from '../utils/variables.js';

class ItemController {
    async getItems(req, res) {
        try {
            const { userId } = req.query || {};

            const data = await itemModel
                .find({
                    userId: userId,
                })
                .sort({
                    order: 1,
                })
                .lean();

            return res.json(data);
        } catch (err) {
            return res.status(500).json(getError(text.SERVER_ERROR, err));
        }
    }

    async create(req, res) {
        try {
            const {
                url,
                title,
                description,
                categoryId,
                userId,
                image,
            } = req.body || {};

            if (!userId) {
                return res.status(400).json(getError(text.USER_NOT_FOUND));
            }

            if (!title) {
                return res.status(400).json(getError(text.TITLE_EMPTY));
            }

            if (!url) {
                return res.status(400).json(getError(text.URL_EMPTY));
            }

            const user = await UserModel.findById(userId);

            if (!user) {
                return res.status(400).json(getError(text.USER_NOT_FOUND));
            }

            if (categoryId) {
                const category = await CategoryModel.findOne({
                    _id: categoryId,
                    userId: userId,
                });

                if (!category) {
                    return res.status(400).json(getError(text.CATEGORY_NOT_FOUND));
                }
            }

            const lastItem = await itemModel
                .findOne({
                    categoryId: categoryId,
                    userId: userId,
                })
                .sort({
                    order: -1,
                })
                .lean();

            const nextOrder = lastItem ? lastItem.order + 1 : 0;

            const item = new itemModel({
                url,
                order: nextOrder,
                title,
                description,
                userId,
                categoryId,
                image,
            });

            item.save();

            return res.json(item);
        } catch (err) {
            return res.status(500).json(getError(text.SERVER_ERROR, err));
        }
    }

    async update(req, res) {
        try {
            const { userId, ...otherParams } = req.body || {};
            const itemId = req.params?.itemId;

            if (!userId) {
                return res.status(400).json(getError(text.USER_NOT_FOUND));
            }

            if (!itemId) {
                return res.status(400).json(getError(text.ITEM_NOT_FOUND));
            }

            if (otherParams.url === '') {
                return res.status(400).json(getError(text.URL_EMPTY));
            }

            const item = await itemModel.findOneAndUpdate({
                _id: itemId,
                userId: userId,
            },
                otherParams,
                { new: true }
            );

            item.save();

            return res.json(item);
        } catch (err) {
            return res.status(500).json(getError(text.SERVER_ERROR, err));
        }
    }

    async delete(req, res) {
        try {
            const userId = req.body?.userId;
            const itemId = req.params?.itemId;

            if (!userId) {
                return res.status(400).json(getError(text.USER_NOT_FOUND));
            }

            const item = await itemModel.findOneAndDelete({
                _id: itemId,
                userId: userId,
            });

            if (!item) {
                return res.status(404).json({ error: text.ITEM_NOT_FOUND });
            }

            return res.json(item);
        } catch (err) {
            return res.status(500).json(getError(text.SERVER_ERROR, err));
        }
    }

    async reorder(req, res) {
        try {
            const updates = req.body?.reordered;
            const changeElements = updates.map(item => ({
                updateOne: {
                    filter: {
                        _id: item._id,
                    },
                    update: {
                        $set: {
                            order: item.order,
                        }
                    }
                }
            }));
            const a = await itemModel.bulkWrite(changeElements);

            console.log('--- changeElements', changeElements);
            console.log('a', a);

            return res.status(200).json({ success: true });
        } catch (err) {
            return res.status(500).json(getError(text.ORDER_NOT_CHANGE, err));
        }
    }
}

export default new ItemController();
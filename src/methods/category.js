import CategoryModel from '../models/category.js';

const getCategories = async (userId) => {
    try {
        return await CategoryModel.find({
            userId: userId,
        });
    } catch (err) {
        return err;
    }
};

const categoryCreate = async (data) => {
    try {
        return await CategoryModel.create({
            order: data.order || 0,
            title: data.title,
            description: data.description,
            userId: data.userId,
        });
    } catch (err) {
        return err;
    }
};

const categoryRead = async (id) => {
    try {
        return await CategoryModel.findById(id);
    } catch (err) {
        return err;
    }
};

const categoryUpdate = async (id, data) => {
    try {
        return await CategoryModel.findOneAndUpdate({
            _id: id,
        }, data);
    } catch (err) {
        return err;
    }
};

const categoryDelete = async (id) => {
    try {
        return await CategoryModel.findOneAndDelete(id);
    } catch (err) {
        return err;
    }
};

export {
    getCategories,
}
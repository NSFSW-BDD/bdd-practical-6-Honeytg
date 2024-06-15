const categoryModel = require("../models/categoryModel.js");

const categoryController = {
    readAllCategory: (req, res, next) => {
        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error readAllCategory", error);
                res.status(500).json(error);
            } else res.status(200).json(results);
        };
        categoryModel.selectAllCategory(callback);
    },

    createNewCategory: (req, res, next) => {
        const data = {
            catid: req.body.catid,
            name: req.body.name,
            description: req.body.description,
        };

        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error createNewCategory", error);
                res.status(500).json(error);
            } else {
                res.status(201).json({
                    message: "New Category Created succesfully",
                  });
            }
        };

        categoryModel.insertNewCategory(data, callback);
    }
};

module.exports = categoryController;
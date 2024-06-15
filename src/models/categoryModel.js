const pool = require('../services/db');

var categoryModel = {
    insertNewCategory: (data, callback) => {
        const SQLSTATMENT =`
        INSERT INTO category (catid, name, description)
        VALUES (?,?,?);
        `;
        const VALUES = [data.catid, data.name, data.description];

        pool.query(SQLSTATMENT, VALUES, callback);
    },
    selectAllCategory: (callback) => {
        const SQLSTATMENT =`
        SELECT * FROM category;
        `;
        pool.query(SQLSTATMENT, callback);
    }
};

module.exports = categoryModel;
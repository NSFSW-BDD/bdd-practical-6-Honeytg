const pool = require('../services/db');

var furnitureModel = {
    selectById: (data, callback) => {
        const SQLSTATMENT = `
    SELECT * FROM furniture
    WHERE fid = ?;
    `;
    const VALUES = [data.fid];

    pool.query(SQLSTATMENT, VALUES, callback);
    },
    selectByIdWithCategoryInfo: (data, callback) => {
        const SQLSTATMENT = `
        select furniture.fid, category.catid, category.name, category.description
        from furniture
        inner join category
        on furniture.catid = category.catid ;
    `;
    const VALUES = [data.fid, data.catid, data.name, data.description];

    pool.query(SQLSTATMENT, VALUES, callback);
    }
};

module.exports = furnitureModel;
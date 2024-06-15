const furnitureModel = require("../models/furnitureModel.js");

const furnitureController = {
    selectById: (req, res, next) => {
        const data = {
          fid: req.params.fid,
        };
    
        const callback = (error, results, fields) => {
          if (error) {
            console.error("Error selectById:", error);
            res.status(500).json(error);
          } else {
            if (results.length == 0) {
              res.status(404).json({
                message: "furniture ID not found",
              });
            } else res.status(200).json(results[0]);
          }
        };
    
        furnitureModel.selectById(data, callback);
      },

      selectByIdWithCategoryInfo: (req, res, next) => {
        const data = {
          catid: req.params.catid
        };
    
        const callback = (error, results, fields) => {
          if (error) {
            console.error("Error selectByIdWithCategoryInfo:", error);
            res.status(500).json(error);
          } else {
            if (results.length == 0) {
              res.status(404).json({
                message: "furnitureID not found",
              });
            } else res.status(200).json(results[0]);
          }
        };
    
        furnitureModel.selectByIdWithCategoryInfo(data, callback);
      },
};

module.exports = furnitureController;
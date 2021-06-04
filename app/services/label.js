/*************************************************************************
 * Execution        : 1. default node       cmd> npm start
 *
 * Purpose          : to create the service for business logic of labels Api.
 *                  : its a middleware between controller and models 
 *
 * @file            : label.js
 * @author          : Neeraj Malhotra
 * @version         : 1.0.0
 *
 **************************************************************************/
const models = require('../models/label');

class labelService {
    /**
     * @param {data}  : data will come from the controller body.
     * @description   : createLabel will takes the data from controller and send it to models
    */
    createLabel = async (data) => {
        if (data) {
            const labelData = await models.createLabel(data);
            return labelData;
        }
    }
    /**
     * @param {data}  : data will come from the controller body.
     * @description   : createLabel will takes the data from controller and send it to models
    */
    updateLabel = (data) => {
        return new Promise((resolve, reject) => {
            const result = models.updateLabel(data);
            result.then((labelData) => {
                resolve({ labelData });
            }).catch((err) => {
                reject({ err });
            });
        });
    }
    /**
    * @param {data}  : data will come from the controller body.
    * @description   : createLabel will takes the data from controller and send it to models
    */
    retrieveLabels = (data) => {
        return new Promise((resolve, reject) => {
            const result = models.retrieveLabels(data);
            result.then((labelData) => resolve({ labelData }))
                .catch((err) => reject({ err }));
        });
    }
    /**
    * @param {data}  : data will come from the controller body.
    * @description   : createLabel will takes the data from controller and send it to models
    */
    deleteLabel = (data) => {
        return new Promise((resolve, reject) => {
            const result = models.deleteLabel(data);
            result.then((labelData) => {
                resolve({ labelData });
            }).catch((err) => {
                reject({ err });
            });
        });
    }
}
module.exports = new labelService();
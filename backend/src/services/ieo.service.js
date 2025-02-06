const IEOModel = require("../models/ieo.model");
const { validationResult } = require('express-validator');
class IEOService {
    constructor() {

    }

    static async createIEO(rawData) {
        try {
            if (!rawData.token_address ||
                !rawData.token_name ||
                !rawData.token_symbol ||
                !rawData.token_description ||
                !rawData.token_website ||
                !rawData.token_fb ||
                !rawData.token_pic ||
                !rawData.token_decimals ||
                !rawData.total_supply ||
                !rawData.presale_supply ||
                !rawData.presale_price ||
                !rawData.list_price ||
                !rawData.min_buy ||
                !rawData.max_buy ||
                !rawData.start_time ||
                !rawData.end_time ||
                !rawData.status ||
                !rawData.raised_amount
            ) {
                return {response: false, message:"You should enter all fields.", data: null}
            }
            let result = await IEOModel.create(rawData);
            if (result.error) {
                return {response: false, message:result.error, data: null}
            }
            return {response: true, message:"Success!", data: null}
        } catch (error) {
            return {response:false, message:error, data:null}
        }
    }

    static async updateIEO(rawData, ieoId) {
        try {
            let ieo = await IEOModel.findOne({id:ieoId});
            if (!ieo) {
                return {response: false, message:"That IEO does not exist.", data: null}
            }
            if (!rawData.token_address ||
                !rawData.token_name ||
                !rawData.token_symbol ||
                !rawData.token_description ||
                !rawData.token_website ||
                !rawData.token_fb ||
                !rawData.token_pic ||
                !rawData.token_decimals ||
                !rawData.total_supply ||
                !rawData.presale_supply ||
                !rawData.presale_price ||
                !rawData.list_price ||
                !rawData.min_buy ||
                !rawData.max_buy ||
                !rawData.start_time ||
                !rawData.end_time ||
                !rawData.status ||
                !rawData.raised_amount
            ) {
                return {response: false, message:"You should enter all fields.", data: null}
            }
            let result = await IEOModel.update(rawData, ieoId);
            if (result.error) {
                return {response: false, message:result.error, data: null}
            }
            return {response:true, message:"Success", data:null};
        } catch (error) {
            return {response:false, message:error, data:null};
        }
    }

    static async getAllIEO() {
        try {
            let result = await IEOModel.find();
            if (result.length === 0) {
                return {response: false, message:"There is no registered IEO.", data: null}
            }
            return {response:true, message:"Success", data:result};
        } catch (error) {
            return {response:false, message:error, data:null};
        }
    }

    static async getOneIEO(ieoId) {
        try {
            let result = await IEOModel.findOne({id:ieoId});
            if (!result) {
                return {response: false, message:"That IEO does not exist.", data: null}
            }
            return {response:true, message:"Success", data:result};
        } catch (error) {
            return {response:false, message:error, data:null}
        }
    }

    static async deleteIEO(ieoId) {
        try {
            let result = await IEOModel.delete({id:ieoId});
            if (result.error) {
                return {response: false, message:result.error, data: null}
            }
            if (result) {
                return {response: true, message:"Success", data:null};
            } else {
                return {response: false, message:"That IEO does not exist.", data:null};
            }
        } catch (error) {
            return {response:false, message:error.message, data:null};
        }
    }
}

module.exports = IEOService
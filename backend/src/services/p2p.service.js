const P2PModel = require("../models/p2p.model");
const { validationResult } = require('express-validator');
const fs = require('fs');
class P2PService {
    constructor() {

    }

    static async createP2P(rawData) {
        try {
            if (!rawData.seller_name ||
                !rawData.completed_orders ||
                !rawData.currency ||
                !rawData.payment_method ||
                !rawData.profile_pic
            ) {
                return {response: false, message:"You should enter all fields.", data: null}
            }
            if (rawData.price_usdt === 0 && rawData.price_mgl === 0 && rawData.price_busd === 0) {
                return {response: false, message:"Price is required!", data: null}
            }
            if (rawData.amount_mgl === 0 && rawData.amount_usdt === 0 && rawData.amount_busd === 0) {
                return {response: false, message:"Amount is required!", data: null}
            }
            if (rawData.currency !== "USDT" && rawData.currency !== "MGL" && rawData.currency !== "BUSD")
                return {response: false, message:"Currency type is wrong!", data: null}
            if (!rawData.payment_method)
                return {response: false, message:"Payment method is wrong!", data: null}
            let result = await P2PModel.create(rawData);
            if (result.error) {
                return {response: false, message:result.error, data: null}
            }
            return {response: true, message:"Success", data: null}
        } catch (error) {
            return {response:false, message:error, data:null}
        }
    }

    static async updateP2P(rawData, p2pId) {
        try {
            let p2p = await P2PModel.findOne({id:p2pId});
            if (!p2p) {
                return {response: false, message:"That P2P does not exist.", data: null}
            }
            if (!rawData.seller_name ||
                !rawData.completed_orders ||
                !rawData.currency ||
                !rawData.payment_method
            ) {
                return {response: false, message:"You should enter all fields.", data: null}
            }
            if (rawData.price_usdt === 0 && rawData.price_mgl === 0 && rawData.price_busd === 0) {
                return {response: false, message:"Price is required!", data: null}
            }
            if (rawData.amount_mgl === 0 && rawData.amount_usdt === 0 && rawData.amount_busd === 0) {
                return {response: false, message:"Amount is required!", data: null}
            }
            if (rawData.currency !== "USDT" && rawData.currency !== "MGL" && rawData.currency !== "BUSD")
                return {response: false, message:"Currency type is wrong!", data: null}
            if (!rawData.payment_method)
                return {response: false, message:"Payment method is required!", data: null}
            let result = await P2PModel.update(rawData, p2pId);
            if (result.error) {
                return {response: false, message:result.error, data: null}
            }
            return {response:true, message:"Success", data:null};
        } catch (error) {
            return {response:false, message:error, data:null};
        }
    }

    static async getAllP2P({page_num, per_page}) {
        try {
            let result = await P2PModel.find();
            if (result.length === 0) {
                return {response: false, message:"There is no registered P2P.", data: null}
            }
            if (page_num && per_page) {
                const filterResult = result.filter((item, index) => index >= per_page * (page_num - 1) && index < per_page * page_num);
                const newFilterResult = filterResult.map(data => {
                    const arr = data.profile_pic.split('.');
                    data.profile_pic = `data:image/${arr[arr.length - 1]};base64,` + fs.readFileSync(data.profile_pic, 'base64');
                    return data;
                })
                return {response:true, message:"Success", data: newFilterResult, totalData: result.length};
            }
            const newResult = result.map(data => {
                const arr = data.profile_pic.split('.');
                data.profile_pic = `data:image/${arr[arr.length - 1]};base64,` + fs.readFileSync(data.profile_pic, 'base64');
                return data;
            })
            return {response:true, message:"Success", data: newResult};
        } catch (error) {
            return {response:false, message:error, data:null};
        }
    }

    static async getOneP2P(p2pId) {
        try {
            let result = await P2PModel.findOne({id:p2pId});
            if (!result) {
                return {response: false, message:"That P2P does not exist.", data: null}
            }
            const arr = result.profile_pic.split('.');
            result.profile_pic = `data:image/${arr[arr.length - 1]};base64,` + fs.readFileSync(result.profile_pic, 'base64');
            return {response:true, message:"Success", data:result};
        } catch (error) {
            return {response:false, message:error, data:null}
        }
    }

    static async deleteP2P(p2pId) {
        try {
            let result = await P2PModel.delete({id:p2pId});
            if (result.error) {
                return {response: false, message:result.error, data: null}
            }
            if (result) {
                return {response: true, message:"Success", data:null};
            } else {
                return {response: false, message:"That P2P does not exist.", data:null};
            }
        } catch (error) {
            return {response:false, message:error.message, data:null};
        }
    }

    static async uploadImage(imageInfo) {
        try {
            return {response:false, message:'success', data: imageInfo.file.path};
        } catch (error) {
            return {response:false, message:error.message, data:null};
        }
    }
}

module.exports = P2PService

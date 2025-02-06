/* learn more: https://github.com/testing-library/jest-dom // @testing-library/jest-dom library provides a set of custom jest matchers that you can use to extend jest. These will make your tests more declarative, clear to read and to maintain.*/

const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');
const HttpException = require('../utils/HttpException.utils');

class IEOModel {
    tableName = 'ieo';

    find = async (params = {}) => { 
        try {
            let sql = `SELECT * FROM ${this.tableName}`;

            if (!Object.keys(params).length) {
                return await query(sql);
            }

            const { columnSet, values } = multipleColumnSet(params)
            sql += ` WHERE ${columnSet}`;
            return await query(sql, [...values]);
        } catch(error) {
            return {error:error.sqlMessage}
        }
    }

    findOne = async (params) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)
            
            const sql = `SELECT * FROM ${this.tableName}
            WHERE ${columnSet}`;
            const result = await query(sql, [...values]);

            return result[0];
        } catch(error) {
            return {error:error.sqlMessage}
        }
    }

    create = async ({token_address,token_name,token_symbol,token_description,token_website,token_fb,token_pic,token_decimals,total_supply,presale_supply,presale_price,list_price,min_buy,max_buy,start_time,end_time,status,raised_amount}) => {
        try {
            const sql = `INSERT INTO ${this.tableName}
            (token_address,token_name,token_symbol,token_description,token_website,token_fb,token_pic,token_decimals,total_supply,presale_supply,presale_price,list_price,min_buy,max_buy,start_time,end_time,status,raised_amount) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            const result = await query(sql, [token_address,token_name,token_symbol,token_description,token_website,token_fb,token_pic,token_decimals,total_supply,presale_supply,presale_price,list_price,min_buy,max_buy,start_time,end_time,status,raised_amount]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;
        } catch (error) {
            return {error:error.sqlMessage}
        }
    }
    
    update = async (params, id) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)

            const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;

            const result = await query(sql, [...values, id]);

            return result;
        } catch(error) {
            return {error:error.sqlMessage}
        }
    }

    delete = async (params) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)
            
            const sql = `DELETE FROM ${this.tableName}
            WHERE ${columnSet}`;
            const result = await query(sql, [...values]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;
        } catch (error) {
            return {error:error.sqlMessage}
        }
    }
}

module.exports = new IEOModel;
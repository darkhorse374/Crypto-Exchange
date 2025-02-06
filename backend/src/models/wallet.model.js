/* learn more: https://github.com/testing-library/jest-dom // @testing-library/jest-dom library provides a set of custom jest matchers that you can use to extend jest. These will make your tests more declarative, clear to read and to maintain.*/

const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');

class WalletModel {
    tableName = 'wallet';

    find = async (params = {}) => {
        try {
            let sql = `SELECT * FROM ${this.tableName}`;

            if (!Object.keys(params).length) {
                return await query(sql);
            }

            const { columnSet, values } = multipleColumnSet(params)
            sql += ` WHERE ${columnSet}`;

            return await query(sql, [...values]);
        } catch (error) {
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
        } catch (error) {
            return {error:error.sqlMessage}
        }
    }

    create = async ({ user_id, publickey, privatekey, keyphrase, polygon_tokensymbol, polygonmain_assets, polygontest_assets, network, bsc_tokensymbol, bscmain_assets, bsctest_assets }) => {
        try {
            const sql = `INSERT INTO ${this.tableName}
            (user_id, publickey, privatekey, keyphrase, polygon_tokensymbol, polygonmain_assets, polygontest_assets, network, bsc_tokensymbol, bscmain_assets, bsctest_assets) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;

            const result = await query(sql, [user_id, publickey, privatekey, keyphrase, polygon_tokensymbol, polygonmain_assets, polygontest_assets, network, bsc_tokensymbol, bscmain_assets, bsctest_assets]);
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
    
    deleteOne = async (key) => {
        try {
            const sql = `DELETE FROM ${this.tableName}
            WHERE key = ?`;
            const result = await query(sql, [key]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;
        } catch (error) {
            return {error:error.sqlMessage}
        }
    }

    delete = async (params = {}) => {
        try {
            let sql = `DELETE FROM ${this.tableName}`;

            if (!Object.keys(params).length) {
                return await query(sql);
            }

            const { columnSet, values } = multipleColumnSet(params)
            sql += ` WHERE ${columnSet}`;

            return await query(sql, [...values]);
        } catch (error) {
            return {error:error.sqlMessage}
        }
    }
}

module.exports = new WalletModel;
/* learn more: https://github.com/testing-library/jest-dom // @testing-library/jest-dom library provides a set of custom jest matchers that you can use to extend jest. These will make your tests more declarative, clear to read and to maintain.*/

const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');

class TransactionModel {
    tableName = 'transaction';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }
    
    findMore = async (params = {}) => { 
        try {
            let sql = `SELECT * FROM ${this.tableName}`;
            let columnSet = Object.keys(params)
            let values = Object.values(params)
            if (columnSet[columnSet.length-1] === "network") {
                sql += ` WHERE ((${columnSet[0]}="${values[0]}" `
                for (let i=1; i< columnSet.length-1; i++) {
                    sql += `or ${columnSet[i]}="${values[i]}"`;
                }
                sql += `) and ${columnSet[columnSet.length-1]}="${values[columnSet.length-1]}")`
            }
            return await query(sql, [...values]);
        } catch(error) {
            return []
        }
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)
        
        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;
        const result = await query(sql, [...values]);
        
        return result[0];
    }

    create = async ({ user_id, hash, from_id, to_id, token, amount, network, to_admin}) => {
        const sql = `INSERT INTO ${this.tableName}
        ( user_id, hash, from_id, to_id, token, amount, network, to_admin) VALUES (?,?,?,?,?,?,?,?)`;

        const result = await query(sql, [ user_id, hash, from_id, to_id, token, amount, network, to_admin]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)

            const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;

            const result = await query(sql, [...values, id]);

            return result;
        } catch(error) {
            throw new HttpException(error);
        }
    }
    
    deleteOne = async (key) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE key = ?`;
        const result = await query(sql, [key]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    delete = async (params = {}) => {
        let sql = `DELETE * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }
}

module.exports = new TransactionModel;
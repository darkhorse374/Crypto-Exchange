/* learn more: https://github.com/testing-library/jest-dom // @testing-library/jest-dom library provides a set of custom jest matchers that you can use to extend jest. These will make your tests more declarative, clear to read and to maintain.*/

const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class TopTokenModel {
    tableName = 'top_tokens';

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
            return {error:error.sqlMessage};
        }
    }

    create = async ({name, symbol, price, daily_percent}) => {
        try {
            const sql = `INSERT INTO ${this.tableName}
            (name, symbol, price, daily_percent) VALUES (?,?,?,?)`;
            const result = await query(sql, [name, symbol, price, daily_percent]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;
        } catch (error) {
            return {error:error.sqlMessage};
        }
    }

    update = async (params, id) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)

            const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;

            const result = await query(sql, [...values, id]);

            return result;
        } catch(error) {
            return {error:error.sqlMessage};
        }
    }
}

module.exports = new TopTokenModel;
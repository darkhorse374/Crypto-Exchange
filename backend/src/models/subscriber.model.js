/* learn more: https://github.com/testing-library/jest-dom // @testing-library/jest-dom library provides a set of custom jest matchers that you can use to extend jest. These will make your tests more declarative, clear to read and to maintain.*/

const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');
const HttpException = require('../utils/HttpException.utils');
class SubscriberModel {
    tableName = 'subscriber';

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
            throw new HttpException(error);
        }
    }

    findOne = async (params) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)
            
            const sql = `SELECT * FROM ${this.tableName}
            WHERE ${columnSet}`;
            const result = await query(sql, [...values]);
            
            // return back the first row (user)
            return result[0];
        } catch(error) {
            throw new HttpException(error);
        }
    }

    create = async ({ email}) => {
        try {
            const sql = `INSERT INTO ${this.tableName}
            (email) VALUES (?)`;
            const result = await query(sql, [email]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;
        } catch (error) {
            throw new HttpException(error);
        }
    }
}

module.exports = new SubscriberModel;
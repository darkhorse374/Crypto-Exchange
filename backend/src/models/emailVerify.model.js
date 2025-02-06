/* learn more: https://github.com/testing-library/jest-dom // @testing-library/jest-dom library provides a set of custom jest matchers that you can use to extend jest. These will make your tests more declarative, clear to read and to maintain.*/

const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');
const HttpException = require('../utils/HttpException.utils');
class EmailVerifyModel {
    tableName = 'email_verify';

    findOne = async (params) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)
            
            const sql = `SELECT * FROM ${this.tableName}
            WHERE ${columnSet}`;

            const result = await query(sql, [...values]);
            // return back the first row (user)
            return result[0];
        } catch(error) {
            return {error:error.sqlMessage}
        }
    }

    create = async ({ email, verify_code }) => {
        try {
            const sql = `INSERT INTO ${this.tableName}
            (email, verify_code) VALUES (?,?)`;

            const result = await query(sql, [email, verify_code]);
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
            
            const sql = `DELETE * FROM ${this.tableName}
            WHERE ${columnSet}`;

            const result = await query(sql, [...values]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;
        } catch (error) {
            return {error:error.sqlMessage}
        }
    }
}

module.exports = new EmailVerifyModel;
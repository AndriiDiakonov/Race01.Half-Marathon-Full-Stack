const pool = require('../database/db');
const Model = require('./model');

module.exports = class User extends Model {
    constructor(id = 0, login, password, name, email, permission = 'user') {
        super('users');
        this.id = id;
        this.login = login;
        this.password = password;
        this.name = name;
        this.email = email;
        this.permission = permission;
    }

    async update(field, value) {
        try {
            if (!this.id)
                throw `ERROR: on update(${field}, ${value}) user id is empty`;

            await pool.query(`UPDATE users SET ${field}=? WHERE id=${this.id}`, [value]);
            
        } catch (error) {
            console.error(error);
        }
    }
}

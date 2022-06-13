const pool = require("../database/db");

module.exports = class Model {
    #table = "";

    constructor(table) {
        this.#table = table;
    }

    async find(field, value) {
        try {
            let result = await pool.query(`SELECT * FROM ${this.#table} WHERE ${field}=?`, [value]);

            if (result[0][0]) {
                for (const item in result[0][0]) {
                    this[item] = result[0][0][item];
                }
            }
            return result[0];

        } catch (error) {
            console.error(error);
        }
    }

    async delete() {
        await pool.query(`DELETE FROM ${this.#table} WHERE id=${this.id}`)
            .then((result) => {
                console.log(result[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async save() {
        let res = await pool.query(`SELECT * FROM ${this.#table} WHERE id=${this.id}`);

        if (res[0].length) {
            let valuesToUpdate = Object.entries(this).map((item) => {
                let value = typeof item[1] === "string" ? `'${item[1]}'` : item[1];
                return `${item[0]}=${value}`;
            }).join(", ");

            try {
                await pool.query(`UPDATE ${this.#table} SET ${valuesToUpdate} WHERE id=${this.id}`);
            } catch (error) {
                console.error(error);
            }
        } else {
            let values = Object.values(this).map((item) => {
                return typeof item === "string" ? `'${item}'` : item;
            }).join(", ");

            try {
                await pool.query(`INSERT INTO ${this.#table} (${Object.keys(this).join(", ")}) VALUES (${values})`);
            } catch (error) {
                console.error(error);
            }
        }
    }
};

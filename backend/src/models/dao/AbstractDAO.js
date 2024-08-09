const database = require("../../../db/mysql");

class AbstractDAO {
  constructor({ table }) {
    this.table = table;
    this.database = database;
  }

  findById(id) {
    const query = `SELECT * FROM ${this.table} WHERE id = ?`;
    return this.database.query(query, [id]);
  }

  findByUuid(uuid) {
    const query = `SELECT * FROM ${this.table} WHERE uuid = ?`;
    return this.database.query(query, [uuid]);
  }


  findAll(limit = null) {
    let query = `SELECT * FROM ${this.table}`;
    if (limit) {
      query = query + ` LIMIT ${limit}`;
    }
    return this.database.query(query);
  }


  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }


  deleteByUuid(uuid) {
    return this.database.query(`delete from ${this.table} where uuid = ?`, [uuid]);
  }
}

module.exports = AbstractDAO;

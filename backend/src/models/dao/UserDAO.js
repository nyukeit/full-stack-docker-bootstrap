const AbstractDAO = require("./AbstractDAO");

class UserDAO extends AbstractDAO {
  constructor() {
    super({ table: "users" });
  }

  create(userData) {
    const { uuid, name, email, password, telephone } =
    userData;
    return this.database.query(
      "INSERT INTO users(uuid, name, email, password, telephone) VALUES (?, ?, ?, ?, ?)",
      [uuid, name, email, password, telephone]
    );
  }

  update(userData) {
    // Base update query
    let query = "UPDATE users SET ";
    const queryValues = [];
    const keys = Object.keys(userData);
  
    // Dynamically construct the update fields
    keys.forEach(key => {
      if (key !== "uuid" && userData.hasOwnProperty(key)) {
        query += `${key} = ?, `;
        queryValues.push(userData[key]);
      }
    });
  
    // Remove the trailing comma and space
    query = query.slice(0, -2);
  
    // Add the WHERE clause
    query += " WHERE uuid = ?";
    queryValues.push(userData.uuid);
  
    // Execute the query
    return this.database.query(query, queryValues);
  }

  findByEmail(email) {
    return this.database.query("select * from users where email = ?", [email]);
  }
}

module.exports = new UserDAO();
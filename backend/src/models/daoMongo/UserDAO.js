const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  telephone: { type: String }
});

// Create User model
const User = mongoose.model('User', userSchema);

class UserDAO {
  async create(userData) {
    const user = new User(userData);
    return user.save();
  }

  async update(userData) {
    const { uuid, ...updateData } = userData;
    return User.findOneAndUpdate({ uuid }, updateData, { new: true });
  }

  async findByUuid(uuid) {
    return User.findOne({ uuid });
  }

  async findByEmail(email) {
    return User.findOne({ email });
  }

  async findAll() {
    return User.find();
  }

  async deleteByUuid(uuid) {
    return User.deleteOne({ uuid });
  }
}

module.exports = new UserDAO();
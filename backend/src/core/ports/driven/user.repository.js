class UserRepository {
  async createUser(user) { throw new Error('Not implemented'); }
  async findByUsernameOrPhone(identifier) { throw new Error('Not implemented'); }
  async findByEmail(email) { throw new Error('Not implemented'); }
  async getAllUsers() { throw new Error('Not implemented'); }
}

module.exports = UserRepository; 
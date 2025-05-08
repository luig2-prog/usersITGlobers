const jwt = require('jsonwebtoken');
const config = require('../../config/config');

class LoginUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(identifier, password) {
    return await this.userRepository.login(identifier, password);
  }
}

module.exports = LoginUserUseCase;
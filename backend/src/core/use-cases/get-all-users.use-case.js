class GetAllUsersUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute() {
    return await this.userRepository.getAllUsers();
  }
}

module.exports = GetAllUsersUseCase;

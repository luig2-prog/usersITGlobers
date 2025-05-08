class AuthController {
  constructor({ registerUserUseCase, loginUserUseCase, getAllUsersUseCase }) {
    this.registerUserUseCase = registerUserUseCase;
    this.loginUserUseCase = loginUserUseCase;
    this.getAllUsersUseCase = getAllUsersUseCase;
  }

  async register(req, res) {
    try {
      const user = await this.registerUserUseCase.execute(req.body);
      res.status(201).json({ success: true, user });
    } catch (e) {
      res.status(400).json({ success: false, error: e.message });
    }
  }

  async login(req, res) {
    try {
      const { identifier, password } = req.body;
      const result = await this.loginUserUseCase.execute(identifier, password);
      res.json({ success: true, ...result });
    } catch (e) {
      res.status(400).json({ success: false, error: e.message });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await this.getAllUsersUseCase.execute();
      res.json({ success: true, users });
    } catch (e) {
      res.status(400).json({ success: false, error: e.message });
    }
  }

  async logout(req, res) {
    res.json({ success: true, message: 'Logout exitoso' });
  }
}

module.exports = AuthController;
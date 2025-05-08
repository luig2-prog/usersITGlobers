const { connectAuthDB } = require("./infrastructure/database/mongodb/mongodb.connection");
const createServer = require("./infrastructure/web/server");
const config = require("./config/config");
const MongoDBAuthRepository = require("./infrastructure/database/repositories/mongodb-auth.repository");
const RegisterUserUseCase = require("./core/use-cases/register-user.use-case");
const LoginUserUseCase = require("./core/use-cases/login-user.use-case");
const GetAllUsersUseCase = require("./core/use-cases/get-all-users.use-case");
const AuthController = require("./core/ports/driver/auth.controller");
const authRoutes = require("./infrastructure/web/routes/auth.routes");

async function main() {
  await connectAuthDB();

  const userRepository = new MongoDBAuthRepository();
  const registerUserUseCase = new RegisterUserUseCase(userRepository);
  const loginUserUseCase = new LoginUserUseCase(userRepository);
  const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);

  const authController = new AuthController({
    registerUserUseCase,
    loginUserUseCase,
    getAllUsersUseCase
  });

  const app = createServer();

  app.use('/auth', authRoutes(authController));

  app.listen(config.port, () => {
    console.log(`Backend server listening on port ${config.port}`);
  });
}

main().catch((error) => {
  console.error("Error starting the application:", error);
  process.exit(1);
});

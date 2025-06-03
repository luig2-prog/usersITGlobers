class RegisterUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,40}$/;
    const usernameRegex = /^[A-Za-z0-9_]{1,30}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Nombre
    if (!userData.firstName || !nameRegex.test(userData.firstName))
      throw new Error('El nombre es obligatorio, máximo 40 caracteres y solo letras/espacios');

    // Apellido paterno
    if (!userData.paternalLastName || !nameRegex.test(userData.paternalLastName))
      throw new Error('El apellido paterno es obligatorio, máximo 40 caracteres y solo letras/espacios');

    // Apellido materno (opcional)
    if (userData.maternalLastName && !nameRegex.test(userData.maternalLastName))
      throw new Error('El apellido materno debe tener máximo 40 caracteres y solo letras/espacios');

    // Número de teléfono
    if (!userData.phoneNumber || !phoneRegex.test(userData.phoneNumber))
      throw new Error('El número de teléfono es obligatorio, debe tener exactamente 10 dígitos numéricos');

    // Correo (opcional)
    if (userData.email) {
      if (userData.email.length > 40)
        throw new Error('El correo debe tener máximo 40 caracteres');
      if (!emailRegex.test(userData.email))
        throw new Error('El correo no tiene un formato válido');
    }

    // Nombre de usuario
    if (!userData.username || !usernameRegex.test(userData.username))
      throw new Error('El nombre de usuario es obligatorio, máximo 30 caracteres, solo letras, números y guion bajo');

    // Contraseña
    if (!userData.password || userData.password.length < 8 || userData.password.length > 20)
      throw new Error('La contraseña es obligatoria, debe tener entre 8 y 20 caracteres');

    // Si todo está bien, continúa con el registro
    return await this.userRepository.createUser(userData);
  }
}

module.exports = RegisterUserUseCase;
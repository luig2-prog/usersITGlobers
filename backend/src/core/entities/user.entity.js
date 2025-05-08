class User {
  constructor({ id, firstName, paternalLastName, maternalLastName, phoneNumber, email, username, password }) {
    this.id = id;
    this.firstName = firstName;
    this.paternalLastName = paternalLastName;
    this.maternalLastName = maternalLastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.username = username;
    this.password = password;
  }
}

module.exports = User;

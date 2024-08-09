class Errors extends Error {
  constructor(status, message, data) {
    super(message);
    this.status = status || 500;
    this.data = data || null;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = Errors;
// module.exports = new Errors(); // instantiate it make it a Singleton
// meaning you have a single instance shared across your application.

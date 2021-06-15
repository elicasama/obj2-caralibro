const errores = require("./errores");

module.exports = class Publicacion {
  constructor() {
    this.losQueDieronMegusta = [];
  }

  recibirMeGusta(usuario) {
    if (this.losQueDieronMegusta.includes(usuario)) {
      throw new errores.ElUsuarioYaDioMegusta();
    } else {
      this.losQueDieronMegusta.push(usuario);
    }
  }
};

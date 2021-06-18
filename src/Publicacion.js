const errores = require("./errores");

module.exports = class Publicacion {
  constructor(permiso) {
    this.permiso = permiso;
    this.losQueDieronMegusta = [];
  }

  recibirMeGusta(usuario) {
    if (this.losQueDieronMegusta.includes(usuario)) {
      throw new errores.ElUsuarioYaDioMegusta();
    } else {
      this.losQueDieronMegusta.push(usuario);
    }
  }
  puedeVerPublicacion(usuario) {
    return this.permiso.dejarVerPublicacion(usuario);
  }
};

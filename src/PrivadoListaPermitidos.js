const Publicacion = require("./Publicacion");

module.exports = class PrivadoListaPermitidos extends Publicacion {
  constructor(usuariosPermitidos) {
    super();
    this.usuariosPermitidos = usuariosPermitidos;
  }

  dejarVerPublicacion(usuario) {
    return this.usuariosPermitidos.includes(usuario);
  }
};

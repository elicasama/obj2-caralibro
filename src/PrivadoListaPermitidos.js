const Publicacion = require("./Publicacion");

module.exports = class PrivadoListaPermitidos extends Publicacion {
  constructor(usuariosPermitidos) {
    super();
    this.usuariosPermitidos = usuariosPermitidos;
  }

  permiteVer(usuario) {
    return this.usuariosPermitidos.includes(usuario);
  }
};

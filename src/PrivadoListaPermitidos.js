const Publicacion = require("./Publicacion");

module.exports = class PrivadoListaPermitidos extends Publicacion {
  constructor(usuariosPermitidos) {
    super();
    this.usuariosPermitidos = usuariosPermitidos;
  }

  puedeSerVistaPor(usuario) {
    return this.usuariosPermitidos.includes(usuario);
  }
};

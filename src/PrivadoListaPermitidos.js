const Publicacion = require("./Publicacion");

module.exports = class PrivadoListaPermitidos extends Publicacion {
  constructor(listaUsuariosPermitidos) {
    super();
    this.listaUsuariosPermitidos = listaUsuariosPermitidos;
  }

  dejarVerPublicacion(usuario) {
    return this.listaUsuariosPermitidos.includes(usuario);
  }
};

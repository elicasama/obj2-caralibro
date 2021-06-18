const Publicacion = require("./Publicacion");

module.exports = class ListaExcluidos extends Publicacion {
  constructor(usuarioExcluidos) {
    super();
    this.usuarioExcluidos = usuarioExcluidos;
  }

  dejarVerPublicacion(usuario) {
    return !this.usuarioExcluidos.includes(usuario);
  }
};

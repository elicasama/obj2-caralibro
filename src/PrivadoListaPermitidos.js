const Publicacion = require("./Publicacion");

// [!] Este nombre es inconsistente con ListaExcluidos
module.exports = class PrivadoListaPermitidos extends Publicacion {
  constructor(usuariosPermitidos) {
    super();
    this.usuariosPermitidos = usuariosPermitidos;
  }

  permiteVer(usuario) {
    return this.usuariosPermitidos.includes(usuario);
  }
};

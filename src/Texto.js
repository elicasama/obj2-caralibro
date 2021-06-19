const Publicacion = require("./Publicacion");

module.exports = class Texto extends Publicacion {
  constructor(contenido, permiso) {
    super(permiso);
    this.contenido = contenido;
  }

  espacioQueOcupa() {
    return this.contenido.length;
  }
};

//var publicaciones = require("../src/Publicacion");
var _ = require("lodash");

module.exports = class Usuario {
  constructor() {
    this.publicaciones = [];
    this.amigos = [];
  }

  agregarPublicacion(publicacion) {
    this.publicaciones.push(publicacion);
  }

  espacioDePublicaciones() {
    return _.sumBy(this.publicaciones, (publicacion) =>
      publicacion.espacioQueOcupa()
    );
  }

  agregarAmigo(usuario) {
    this.amigos.push(usuario);
  }
};

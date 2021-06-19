var _ = require("lodash");

module.exports = class Usuario {
  constructor() {
    this.publicaciones = [];
    this.amigos = [this];
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

  esMasAmistosoQue(usuario) {
    return this.amigos.length > usuario.amigos.length;
  }

  elMasPopular() {
    return this.amigos.reduce((popular, amigo) =>
      popular.amigos.length > amigo.amigos.length ? popular : amigo
    );
  }

  mejoresAmigos() {
    return this.amigos.filter((amigo) =>
      amigo.puedeVerTodas(this.publicaciones)
    );
  }

  puedeVerTodas(publicaciones) {
    return publicaciones.every((publicacion) => publicacion.puedeSerVista(this));
  }
};

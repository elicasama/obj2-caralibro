var _ = require("lodash");

module.exports = class Usuario {
  constructor() {
    this.publicaciones = [];
    this.amigos = [];
  }

  agregarPublicacion(publicacion) {
    publicacion.usuario = this;
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
    return _.maxBy(this.amigos, (amigo) => amigo.totalDeMeGusta());
  }

  totalDeMeGusta() {
    return this.publicaciones.reduce(
      (total, publicacion) => total + publicacion.cantidadDeMegusta(),
      0
    );
  }

  mejoresAmigos() {
    return this.amigos.filter((amigo) =>
      amigo.puedeVerTodas(this.publicaciones)
    );
  }

  puedeVerTodas(publicaciones) {
    return publicaciones.every((publicacion) =>
      publicacion.puedeSerVista(this)
    );
  }

  cantidadDeMeGustaDado(usuario) {
    return _.countBy(this.publicaciones, (publicacion) =>
      publicacion.losQueDieronMegusta.includes(usuario)
    ).true;
  }

  esStalker(usuario) {
    return (
      this.cantidadDeMeGustaDado(usuario) >=
      Math.ceil(this.publicaciones.length * 0.9)
    );
  }
};

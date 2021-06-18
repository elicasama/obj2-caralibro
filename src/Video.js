const Publicacion = require("./Publicacion");

module.exports = class Video extends Publicacion {
  constructor(calidad, duracion, permiso) {
    super(permiso);
    this.calidad = calidad;
    this.duracion = duracion;
  }

  espacioQueOcupa() {
    return this.calidad.calcularEspacio(this.duracion);
  }
};

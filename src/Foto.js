const Publicacion = require("./Publicacion");

module.exports = class Foto extends Publicacion {
  constructor(alto, ancho) {
    super();
    this.alto = alto;
    this.ancho = ancho;
    this.factorDeCompresion = 0.7;
  }
  espacioQueOcupa() {
    return Math.ceil(this.alto * this.ancho * this.factorDeCompresion);
  }
};
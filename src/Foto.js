const Publicacion = require("./Publicacion");
const Configuracion = require("./Configuracion");

module.exports = class Foto extends Publicacion {
  constructor(alto, ancho, permiso) {
    super(permiso);
    this.alto = alto;
    this.ancho = ancho;
    // [!] Esto tendría que estar en un objeto global (Singleton)
    // this.factorDeCompresion = 0.7;
  }
  espacioQueOcupa() {
    // return Math.ceil(this.alto * this.ancho * this.factorDeCompresion);
    return Math.ceil(this.alto * this.ancho * Configuracion.factorDeCompresion);
  }
};

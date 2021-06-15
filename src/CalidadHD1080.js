const CalidadHD720 = require("./CalidadHD720");

module.exports = class CalidadHD1080 extends CalidadHD720 {
  constructor() {
    super();
  }

  calcularEspacio(duracion) {
    const videoHD720 = new CalidadHD720();
    return videoHD720.calcularEspacio(duracion) * 2 + 300;
  }
};

const Video = require("./Video");

module.exports = class CalidadHD720 extends Video {
  constructor() {
    super();
  }

  calcularEspacio(duracion) {
    return duracion * 3;
  }
};

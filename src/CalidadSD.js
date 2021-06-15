const Video = require("./Video");

module.exports = class CalidadSD extends Video {
  constructor() {
    super();
  }

  calcularEspacio(duracion) {
    return duracion;
  }
};

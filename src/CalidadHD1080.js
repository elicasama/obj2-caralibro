// para los videos de HD 1080p el tamaño es el doble de los HD 720p + 300 bytes fijos.

const CalidadHD720 = require("./CalidadHD720");

module.exports = class CalidadHD1080 extends CalidadHD720 {
    constructor(duracionEnSegundos) {
        super();
      this.duracion = duracionEnSegundos;
    }
  
    espacioQueOcupa() {
      const videoHD720 = new CalidadHD720(this.duracion);
      return (videoHD720.espacioQueOcupa() * 2 + 300);
    }
  };
  
// Los videos tienen un tamaño que depende de la calidad con la cual el usuario elija publicarlo.
// Para la calidad SD, el tamaño es igual a la duración del video en segundos.
// Para los videos HD 720p el tamaño es igual al triple de la duración en segundos del video y
// para los videos de HD 1080p el tamaño es el doble de los HD 720p + 300 bytes fijos.
// Debe poder modificarse la calidad sin tener que volver a hacer la publicación.

const Publicacion = require("./Publicacion");

module.exports = class Video extends Publicacion {
  constructor(calidad) {
    super();
    this.calidad = calidad;
  }
};

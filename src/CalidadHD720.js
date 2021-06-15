// Para los videos HD 720p el tamaño es igual al triple de la duración en segundos del video y
module.exports = class CalidadHD720 {
  constructor(duracionEnSegundos) {
    this.duracion = duracionEnSegundos;
  }

  espacioQueOcupa() {
    return this.duracion * 3;
  }
};

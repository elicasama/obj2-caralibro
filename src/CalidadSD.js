// Para la calidad SD, el tamaño es igual a la duración del video en segundos.
module.exports = class CalidadSD {
  constructor(duracionEnSegundos) {
    this.duracion = duracionEnSegundos;
  }

  espacioQueOcupa() {
    return this.duracion;
  }
};

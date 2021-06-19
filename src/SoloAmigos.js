const Publicacion = require("./Publicacion");

module.exports = class SoloAmigos extends Publicacion {
  constructor(usuarioQuePublica) {
    super();
    this.usuarioQuePublica = usuarioQuePublica;
  }

  permiteVer(usuario) {
    // [!] Acá podrías haber hecho un método esAmigoDe(usuario)
    // para no romper el encapsulamiento. Tipo:
    // return this.usuarioQuePublica.esAmigoDe(usuario);

    return this.usuarioQuePublica.amigos.includes(usuario);
  }
};

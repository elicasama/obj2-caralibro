const Publicacion = require("./Publicacion");

module.exports = class SoloAmigos extends Publicacion {
  constructor(usuarioQuePublica) {
    super();
    this.usuarioQuePublica = usuarioQuePublica;
  }

  dejarVerPublicación(usuario) {
    return this.usuarioQuePublica.amigos.includes(usuario);
  }
};

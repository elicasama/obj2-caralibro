const errores = require("./errores");

module.exports = class Publicacion {
  constructor(permiso) {
    this.permiso = permiso;
    this.losQueDieronMegusta = [];
  }

  recibirMeGusta(usuario) {
    if (this.losQueDieronMegusta.includes(usuario))
      throw new errores.ElUsuarioYaDioMegusta();
    // } else { [!] No hace falta el else porque el throw corta la ejecución (como return)
    this.losQueDieronMegusta.push(usuario);
    // }
  }

  puedeSerVista(usuario) {
    return this.usuario === usuario || this.permiso.permiteVer(usuario);
    // return this.usuario === usuario ? false : this.permiso.permiteVer(usuario);
  }

  cantidadDeMegusta() {
    return this.losQueDieronMegusta.length;
  }
};

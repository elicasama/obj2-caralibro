const Publicacion = require("./Publicacion");

module.exports = class Publico {
  permiteVer() {
    return true;
  }
};

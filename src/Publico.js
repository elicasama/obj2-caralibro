const Publicacion = require("./Publicacion");

module.exports = class Publico {
  puedeSerVistaPor() {
    return true;
  }
};

var assert = require("assert");
const Publicacion = require("../src/Publicacion");
const Foto = require("../src/Foto");

describe("Pruebas", () => {
  describe("Compresion de archivos", () => {
    describe("Fotos", () => {
      it("Una foto de alto = 4 ancho = 3 y un FC = 0.7 ", () => {
        const foto = new Foto(4, 3);
        assert.equal(9, foto.espacioQueOcupa());
      });
    });
  });
});

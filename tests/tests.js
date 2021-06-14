var assert = require("assert");
// const Publicacion = require("../src/Publicacion");
const Foto = require("../src/Foto");
const Texto = require("../src/Texto");

describe("Pruebas", () => {
  describe("Compresion de archivos", () => {
    describe("Fotos", () => {
      it("Una foto de alto = 4 ancho = 3 y un FC = 0.7 ", () => {
        const foto = new Foto(4, 3);
        assert.equal(9, foto.espacioQueOcupa());
      });
    });
    describe("Texto", () => {
        it("Una un ", () => {
          const contenido = "Este es un contenido de prueba" // <-- tiene 30 caracteres
          const texto = new Texto(contenido)
          assert.equal(30, texto.espacioQueOcupa());
        });
      });
  });
});

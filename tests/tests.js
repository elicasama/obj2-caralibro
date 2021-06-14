var assert = require("assert");
// const Publicacion = require("../src/Publicacion");
const Foto = require("../src/Foto");
const Texto = require("../src/Texto");
const Usuario = require("../src/Usuario");

describe("Pruebas", () => {
  describe("Compresion de archivos", () => {
    describe("Fotos", () => {
      it("El espacio se calcula alto * ancho * FC, el FC = 0.7", () => {
        const foto = new Foto(4, 3);
        assert.equal(9, foto.espacioQueOcupa());
      });
    });
    describe("Texto", () => {
      it("El espacio que ocupa es la cantidad de caracteres que tiene", () => {
        const contenido = "Este es un contenido de prueba"; // <-- tiene 30 caracteres
        const texto = new Texto(contenido);
        assert.equal(30, texto.espacioQueOcupa());
      });
    });
  });
  describe("Usuarios", () => {
    describe("Publicaciones", () => {
      it("Agrego una publicación tipo Texto", () => {
        const contenido = "Un pequeño contenido de pocas letras"
        const texto = new Texto (contenido); // <-- ocupa 36
        const usuario = new Usuario();
        usuario.agregarPublicacion(texto);

        assert.equal(1, usuario.publicaciones.length);
      });
      it("Agrego una publicación tipo Foto", () => {
        const foto = new Foto (3, 10); //<-- ocupa 21
        const usuario = new Usuario();
        usuario.agregarPublicacion(foto);

        assert.equal(1, usuario.publicaciones.length);
      });
      it("Cálculo de espacio de las publicaciones", () => {
        const contenido = "Un pequeño contenido de pocas letras"
        const foto = new Foto (3, 10); //<-- ocupa 21
        const texto = new Texto (contenido); // <-- ocupa 36

        const usuario = new Usuario();
        usuario.agregarPublicacion(foto);
        usuario.agregarPublicacion(texto);

        assert.equal(57, usuario.espacioDePublicaciones());
      });
    });
  });
});

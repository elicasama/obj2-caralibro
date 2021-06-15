var assert = require("assert");
// const Publicacion = require("../src/Publicacion");
const Foto = require("../src/Foto");
const Texto = require("../src/Texto");
const Usuario = require("../src/Usuario");
const Video = require("../src/Video");
const CalidadSD = require("../src/CalidadSD");
const CalidadHD720 = require("../src/CalidadHD720");
const CalidadHD1080 = require("../src/CalidadHD1080");
const errores = require("../src/errores");

describe("Probando caralibro", () => {
  describe("Se calcular el espacio ocupado por tipo de publicación", () => {
    describe("Fotos", () => {
      it("Se calcula alto * ancho * factor de compresión (factor de compresión = 0.7)", () => {
        const foto = new Foto(4, 3);
        assert.equal(9, foto.espacioQueOcupa());
      });
    });
    describe("Texto", () => {
      it("Es la cantidad de caracteres que tiene", () => {
        const contenido = "Este es un contenido de prueba"; // <-- tiene 30 caracteres
        const texto = new Texto(contenido);
        assert.equal(30, texto.espacioQueOcupa());
      });
    });
    describe("Video", () => {
      it("Calidad SD = a la duración en segundos", () => {
        const video = new Video(new CalidadSD(), 120);

        assert.equal(120, video.espacioQueOcupa());
      });
      it("Calidad HD 720 = a la duración en segundos * 3", () => {
        const video = new Video(new CalidadHD720(), 200);

        assert.equal(600, video.espacioQueOcupa());
      });
      it("Calidad HD 1080 = al doble de la calidad HD 720  + 300", () => {
        const video = new Video(new CalidadHD1080(), 200);

        assert.equal(1500, video.espacioQueOcupa());
      });
    });
  });
  describe("Usuarios", () => {
    describe("Se agregan publicaciones", () => {
      it("Agrego una publicación tipo Texto", () => {
        const contenido = "Un pequeño contenido de pocas letras";
        const texto = new Texto(contenido); // <-- ocupa 36
        const usuario = new Usuario();
        usuario.agregarPublicacion(texto);

        assert.equal(1, usuario.publicaciones.length);
      });
    });
    describe("Se calcula el espacio que ocupan de las publicaciones", () => {
      it("Todos juntos", () => {
        const contenido = "Un pequeño contenido de pocas letras";
        const foto = new Foto(3, 10); //<-- ocupa 21
        const texto = new Texto(contenido); // <-- ocupa 36

        const videoSD = new Video(new CalidadSD(), 200); // <-- ocupa 200
        const videoHD720 = new Video(new CalidadHD720(), 1000); // <-- ocupa 3000
        const videoHD1080 = new Video(new CalidadHD1080(), 1000); // <-- ocupa 6300

        const usuario = new Usuario();
        usuario.agregarPublicacion(foto);
        usuario.agregarPublicacion(texto);
        usuario.agregarPublicacion(videoSD);
        usuario.agregarPublicacion(videoHD720);
        usuario.agregarPublicacion(videoHD1080);

        assert.equal(9557, usuario.espacioDePublicaciones());
      });
    });
    describe("Me gusta", () => {
      it("Agregar me gusta a una publicación", () => {
        const videoSD = new Video(new CalidadSD(), 200);
        const usuarioQueMira = new Usuario();
        videoSD.recibirMeGusta(usuarioQueMira);

        assert.equal(1, videoSD.losQueDieronMegusta.length);
      });
      it("Un usuario no puede dar me gusta más de una vez", () => {
        const videoSD = new Video(new CalidadSD(), 200);
        const usuario1 = new Usuario();
        videoSD.recibirMeGusta(usuario1);

        assert.throws(() => {
          videoSD.recibirMeGusta(usuario1);
        }, errores.ElUsuarioYaDioMegusta);
      });
    });
  });
});

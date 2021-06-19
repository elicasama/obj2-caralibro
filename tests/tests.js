var assert = require("assert");
const Foto = require("../src/Foto");
const Texto = require("../src/Texto");
const Usuario = require("../src/Usuario");
const Video = require("../src/Video");
const CalidadSD = require("../src/CalidadSD");
const CalidadHD720 = require("../src/CalidadHD720");
const CalidadHD1080 = require("../src/CalidadHD1080");
const errores = require("../src/errores");
const Publico = require("../src/Publico");
const SoloAmigos = require("../src/SoloAmigos");
const PrivadoListaPermitidos = require("../src/PrivadoListaPermitidos");
const ListaExcluidos = require("../src/ListaExcluidos");

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

  describe("Permisos", () => {
    it("El usuario que publica siempre puede ver su publicación", () => {
      const juan = new Usuario();
      const pedro = new Usuario();
      const bb8 = new Usuario();

      juan.agregarAmigo(pedro);
      juan.agregarAmigo(bb8);

      const contenido = "Un pequeño contenido de pocas letras";
      const texto = new Texto(contenido, new SoloAmigos(juan));

      juan.agregarPublicacion(texto);

      assert.equal(true, texto.puedeSerVista(juan));
    });

    describe("Publico", () => {
      it("Cualquiera puede ver una publicación publica", () => {
        const juan = new Usuario();
        const pedro = new Usuario();

        const contenido = "Un pequeño contenido de pocas letras";
        const texto = new Texto(contenido, new Publico());

        juan.agregarPublicacion(texto);

        assert.equal(true, texto.puedeSerVista(pedro));
      });
    });

    describe("Sólo Amigos", () => {
      it("Un usuario puede ver una publicación si está como amigo", () => {
        const contenido = "Un pequeño contenido de pocas letras";
        const juan = new Usuario();
        const pedro = new Usuario();
        const loco = new Usuario();
        const bb8 = new Usuario();

        const texto = new Texto(contenido, new SoloAmigos(juan));

        juan.agregarAmigo(pedro);
        juan.agregarAmigo(loco);
        juan.agregarAmigo(bb8);

        juan.agregarPublicacion(texto);

        assert.equal(true, texto.puedeSerVista(pedro));
      });
      it("Un usuario no puede ver una publicación si no está como amigo", () => {
        const juan = new Usuario();
        const pedro = new Usuario();
        const loco = new Usuario();
        const bb8 = new Usuario();

        juan.agregarAmigo(pedro);
        juan.agregarAmigo(bb8);

        const contenido = "Un pequeño contenido de pocas letras";
        const texto = new Texto(contenido, new SoloAmigos(juan));

        juan.agregarPublicacion(texto);

        assert.equal(false, texto.puedeSerVista(loco));
      });
    });

    describe("Lista de Permitidos", () => {
      it("Un usuario puede ver una publicación si está en la lista de Permitidos", () => {
        const pedro = new Usuario();
        const loco = new Usuario();
        const bb8 = new Usuario();

        const usuariosPermitidos = [pedro, loco, bb8];

        const videoSD = new Video(
          CalidadSD,
          2222,
          new PrivadoListaPermitidos(usuariosPermitidos)
        );

        assert.equal(true, videoSD.puedeSerVista(pedro));
      });
      it("Un usuario no puede ver una publicación si no está en la lista de permitidos", () => {
        const juan = new Usuario();
        const pedro = new Usuario();
        const loco = new Usuario();
        const bb8 = new Usuario();

        const usuariosPermitidos = [loco, bb8, juan];

        const videoSD = new Video(
          CalidadSD,
          2222,
          new PrivadoListaPermitidos(usuariosPermitidos)
        );

        assert.equal(false, videoSD.puedeSerVista(pedro));
      });
    });

    describe("Lista de Excluidos", () => {
      it("Un usuario no puede ver una publicación si está en la lista de excluidos", () => {
        const pedro = new Usuario();
        const loco = new Usuario();
        const bb8 = new Usuario();

        const usuarioExcluidos = [pedro, loco, bb8];

        const videoSD = new Video(
          CalidadSD,
          2222,
          new ListaExcluidos(usuarioExcluidos)
        );

        assert.equal(false, videoSD.puedeSerVista(pedro));
      });
      it("Un usuario puede ver una publicación si no está en la lista de excluidos", () => {
        const juan = new Usuario();
        const pedro = new Usuario();
        const loco = new Usuario();
        const bb8 = new Usuario();

        const usuarioExcluidos = [loco, bb8, juan];

        const videoSD = new Video(
          CalidadSD,
          2222,
          new ListaExcluidos(usuarioExcluidos)
        );

        assert.equal(true, videoSD.puedeSerVista(pedro));
      });
    });

    describe("Amigos", () => {
      it("El más popular de mis amigos es aquel que tiene más MeGusta en sus publicaciones", () => {
        const juan = new Usuario();
        const pedro = new Usuario();
        const bb8 = new Usuario();
        const jose = new Usuario();
        const maria = new Usuario();

        bb8.agregarAmigo(juan);
        bb8.agregarAmigo(pedro);
        bb8.agregarAmigo(jose);
        bb8.agregarAmigo(maria);

        const videoSD0 = new Video(new CalidadHD720(), 200, new Publico());
        const videoHD1 = new Video(new CalidadSD(), 300, new Publico());
        const videoHD2 = new Video(new CalidadHD1080(), 550, new Publico());
        const videoSD3 = new Video(new CalidadSD(), 1200, new Publico());

        juan.agregarPublicacion(videoSD0);
        pedro.agregarPublicacion(videoHD1);
        pedro.agregarPublicacion(videoSD3);
        maria.agregarPublicacion(videoHD2);

        //publicaciones de Juan ---> 4 MeGusta
        videoSD0.recibirMeGusta(pedro);
        videoSD0.recibirMeGusta(jose);
        videoSD0.recibirMeGusta(maria);

        //publicaciones de Pedro ---> 6 MeGusta
        videoHD1.recibirMeGusta(juan);
        videoHD1.recibirMeGusta(jose);

        videoSD3.recibirMeGusta(juan);
        videoSD3.recibirMeGusta(maria);
        videoSD3.recibirMeGusta(jose);
        videoSD3.recibirMeGusta(bb8);

        //publicaciones de Maria ---> 1 MeGusta
        videoHD2.recibirMeGusta(bb8);

        console.log("Total de MeGusta de Pedro: " + pedro.totalDeMeGusta());
        assert.deepEqual(pedro, bb8.elMasPopular());
      });

      describe("Más amistoso", () => {
        it("Si el primero tiene más amigos = true", () => {
          const juan = new Usuario();
          const pedro = new Usuario();
          const bb8 = new Usuario();
          const jose = new Usuario();
          const maria = new Usuario();

          juan.agregarAmigo(pedro);
          juan.agregarAmigo(bb8);
          juan.agregarAmigo(maria);

          bb8.agregarAmigo(juan);
          bb8.agregarAmigo(pedro);
          bb8.agregarAmigo(jose);
          bb8.agregarAmigo(maria);

          assert.equal(true, bb8.esMasAmistosoQue(juan));
        });
        it("Si el segundo tiene más amigos =  false", () => {
          const juan = new Usuario();
          const pedro = new Usuario();
          const bb8 = new Usuario();
          const jose = new Usuario();
          const maria = new Usuario();

          juan.agregarAmigo(pedro);
          juan.agregarAmigo(bb8);
          juan.agregarAmigo(maria);

          bb8.agregarAmigo(juan);
          bb8.agregarAmigo(pedro);
          bb8.agregarAmigo(jose);
          bb8.agregarAmigo(maria);

          assert.equal(false, juan.esMasAmistosoQue(bb8));
        });
      });

      describe("Mejores Amigos", () => {
        it("Conjunto de amigos que pueden ver todas las publicaciones", () => {
          const juan = new Usuario();
          const pedro = new Usuario();
          const bb8 = new Usuario();
          const jose = new Usuario();
          const maria = new Usuario();

          juan.agregarAmigo(maria);
          juan.agregarAmigo(pedro);
          juan.agregarAmigo(bb8);
          juan.agregarAmigo(jose);

          const conPermisos = [pedro, bb8];
          const excluidos = [jose];

          const videoHD720 = new Video(
            CalidadHD720,
            180,
            new ListaExcluidos(excluidos)
          );

          const videoHD1080 = new Video(
            CalidadHD1080,
            2002,
            new PrivadoListaPermitidos(conPermisos)
          );

          const foto = new Foto(200, 600, new Publico());

          juan.agregarPublicacion(videoHD1080);
          juan.agregarPublicacion(videoHD720);
          juan.agregarPublicacion(foto);

          assert.deepEqual([pedro, bb8], juan.mejoresAmigos());
        });
      });

      describe("Es Stalker", () => {
        it("NO se es stalker si da MeGusta a menos del 90% de las publicaciones", () => {
          const juan = new Usuario();
          const pedro = new Usuario();
          const bb8 = new Usuario();

          juan.agregarAmigo(pedro);
          juan.agregarAmigo(bb8);

          const videoSD0 = new Video(new CalidadHD720(), 200, new Publico());
          const videoHD1 = new Video(new CalidadSD(), 300, new Publico());
          const videoHD2 = new Video(new CalidadHD1080(), 550, new Publico());
          const videoSD3 = new Video(new CalidadSD(), 1200, new Publico());
          const foto1 = new Foto(200, 600, new Publico());
          const foto2 = new Foto(1200, 680, new Publico());
          const foto3 = new Foto(550, 3600, new Publico());

          juan.agregarPublicacion(videoSD0);
          juan.agregarPublicacion(videoHD1);
          juan.agregarPublicacion(videoHD2);
          juan.agregarPublicacion(videoSD3);
          juan.agregarPublicacion(foto1);
          juan.agregarPublicacion(foto2);
          juan.agregarPublicacion(foto3);

          //juan total publicaciones = 7 --> 90% = 6.3
          videoSD0.recibirMeGusta(bb8);
          videoHD1.recibirMeGusta(bb8);
          videoHD2.recibirMeGusta(bb8);
          videoSD3.recibirMeGusta(bb8);
          foto1.recibirMeGusta(bb8);
          foto2.recibirMeGusta(bb8);
          //bb8 total MeGusta = 6

          assert.equal(false, juan.esStalker(bb8));
        });
        it("Es stalker si da MeGusta a más del 90% de las publicaciones", () => {
          const juan = new Usuario();
          const pedro = new Usuario();
          const bb8 = new Usuario();

          juan.agregarAmigo(pedro);
          juan.agregarAmigo(bb8);

          const videoSD0 = new Video(new CalidadHD720(), 200, new Publico());
          const videoHD1 = new Video(new CalidadSD(), 300, new Publico());
          const videoHD2 = new Video(new CalidadHD1080(), 550, new Publico());
          const videoSD3 = new Video(new CalidadSD(), 1200, new Publico());
          const foto1 = new Foto(200, 600, new Publico());
          const foto2 = new Foto(1200, 680, new Publico());

          juan.agregarPublicacion(videoSD0);
          juan.agregarPublicacion(videoHD1);
          juan.agregarPublicacion(videoHD2);
          juan.agregarPublicacion(videoSD3);
          juan.agregarPublicacion(foto1);
          juan.agregarPublicacion(foto2);

          //juan total publicaciones = 6 --> 90% = 5.4
          videoSD0.recibirMeGusta(bb8);
          videoHD1.recibirMeGusta(bb8);
          videoHD2.recibirMeGusta(bb8);
          videoSD3.recibirMeGusta(bb8);
          foto1.recibirMeGusta(bb8);
          foto2.recibirMeGusta(bb8);
          //bb8 total MeGusta = 6

          assert.equal(true, juan.esStalker(bb8));
        });
      });
    });
  });
});

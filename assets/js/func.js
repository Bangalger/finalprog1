$(document).ready(function(){

	var arrayPhotos = ["assets/img/crd2017.png", "assets/img/shamrock.png", "assets/img/fusion-logos.png", "assets/img/tubo-recordings.png" , "assets/img/disco-blitz.png", "assets/img/social-clubba.png"];
	var i = 0;
	setInterval(function(){
		if (i == arrayPhotos.length){
			i = 0;
		}
        $("#backgr").prop("src", arrayPhotos[i++]);
	}, 2000);

//PARTICULAS PARA CANVAS 
//ingrear un input y un enviar o algo por el estilo para seleccionarlo con jquery
//transformarlo en variable y luego agregarlo dentro de num_particles

    var numero, sizeA = 2, sizeB = 2;   

    $("#val-partc").change(function() {
        var str = "";
        $("#val-partc option:selected").each(function() {
            str += $(this).text() + " ";
            numero = parseInt(str);
            drawCanvas(numero);
        });
 
    })
    .trigger("change");

    $("#size-partc").change(function() {
        var str = "";
        $("#size-partc option:selected").each(function() {
            str += $(this).text() + " ";
            numeroPart = parseInt(str);
            sizeA = numeroPart;
            sizeB = numeroPart;
            drawCanvas(numero);
        });
 
    })
    .trigger("change");
 //______________________________________  

    function drawCanvas(nume){
   
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth - 50;
        canvas.height = window.innerHeight;
        var particles = [];
        var num_particles = nume;

       
        function GetRandomColor() {
            var r = 0, g = 0, b = 0;
            while (r < 100 && g < 100 && b < 100)
            {
                r = Math.floor(Math.random() * 256);
                g = Math.floor(Math.random() * 256);
                b = Math.floor(Math.random() * 256);
            }

            return "rgb(" + r + "," + g + ","  + b + ")";
        }
        
        var Particle = function () {
            this.x = canvas.width * Math.random();
            this.y = canvas.height * Math.random();
            this.vx = 4 * Math.random() - 2;
            this.vy = 4 * Math.random() - 2;
            this.Color = GetRandomColor();
        }
       
        Particle.prototype.Draw = function (ctx) {
            ctx.fillStyle = this.Color;
            ctx.fillRect(this.x, this.y, sizeA, sizeB);
        }
        Particle.prototype.Update = function () {
            this.x += this.vx;
            this.y += this.vy;
         
            if (this.x<0 || this.x > canvas.width)
                this.vx = -this.vx;
         
            if (this.y < 0 || this.y > canvas.height)
                this.vy = -this.vy;
        }
        function loop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (var i = 0; i < num_particles; i++) {
                particles[i].Update();
                particles[i].Draw(ctx);
            }
            requestAnimationFrame(loop);
        }
        
        for (var i = 0; i < num_particles; i++)
            particles.push(new Particle());
        loop();
    }

    $("#change").click(function () {
        $('header, section, footer').toggleClass("blue");
    });


    
    $('.cat-btn').on('click', function(e){
        e.preventDefault();
        $('.mod-1').addClass('active');

        var attr = $(this).attr('href');

        $('.mod').removeClass('active');
        $('.'+attr).addClass('active');
    })

});
var canvas;
var context;
var $ = document.getElementById.bind(document);
var jodagaInicial = 'x';
var cont = 0;
var velha = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

window.onload = () => {
    canvas = $('jogo');
    context = canvas.getContext('2d');

    context.beginPath();
    //Linhas verticais
    context.moveTo(200, 0);
    context.lineTo(200, 600);
    context.moveTo(400, 0);
    context.lineTo(400, 600);
    //Linhas horizontais
    context.moveTo(0, 200);
    context.lineTo(600, 200);
    context.moveTo(0, 400);
    context.lineTo(600, 400);

    context.lineWidth = 2;
    context.strokeStyle = 'blue';

    context.stroke();
}


function mousePos(event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function jogada(event) {
    cont++;
    var cords = mousePos(event);
    if (cords.x < 200) {
        if (cords.y < 200) {
            console.log('x ok');
            desenhaX(50, 50);
        } else if (cords.y < 400) {

        } else if (cords.y < 600) {

        }
    } 
    else if (cords.x < 400) {
        if (cords.y < 200) {

        } else if (cords.y < 400) {

        } else if (cords.y < 600) {

        }
    }
    else if (cords.x < 600) {
        if (cords.y < 200) {

        } else if (cords.y < 400) {

        } else if (cords.y < 600) {

        }
    }

    console.log(cords,cont);
}

function setJogadaInicial() {
    if (cont == 0) {
        jodagaInicial = $('inicio').value;
    } else {
        alert('Jogo já foi iniciado!');
    }
}

function desenhaBola(x,y) {
    
}

function desenhaX(x,y) {
    context.beginPath();
    context.moveTo(x + 10,y);
    context.lineTo(x + 80,y + 100);
    context.moveTo(x + 90, y);
    context.lineTo(x + 10, y + 100);

    context.lineWidth = 2;
    context.strokeStyle = 'red';

    context.stroke();
}
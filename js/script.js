var canvas;
var context;
var $ = document.getElementById.bind(document);
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
    var cords = mousePos(event);
    if (cords.x < 200) {
        if (cords.y < 200) {
            if (velha[0][0] != null) {
                return;
            }    
            if ((cont % 2) == 1) {
                velha[0][0] = 1;
                desenhaX(50, 50);
            } else {
                velha[0][0] = 0;
                desenhaBola(50, 50);
            }
        } else if (cords.y < 400) {
            if ((cont % 2) == 1) {
                desenhaX(50, 250);
            } else {
                desenhaBola(50, 250);
            }
        } else if (cords.y < 600) {
            if ((cont % 2) == 1) {
                desenhaX(50, 450);
            } else {
                desenhaBola(50, 450);
            }   
        }
    } 
    else if (cords.x < 400) {
        if (cords.y < 200) {
            if ((cont % 2) == 1) {
                desenhaX(250, 50);
            } else {
                desenhaBola(250, 50);
            }
        } else if (cords.y < 400) {
            if ((cont % 2) == 1) {
                desenhaX(250, 250);
            } else {
                desenhaBola(250, 250);
            }
        } else if (cords.y < 600) {
            if ((cont % 2) == 1) {
                desenhaX(250, 450);
            } else {
                desenhaBola(250, 450);
            }
        }
    }
    else if (cords.x < 600) {
        if (cords.y < 200) {
            if ((cont % 2) == 1) {
                desenhaX(450, 50);
            } else {
                desenhaBola(450, 50);
            }
        } else if (cords.y < 400) {
            if ((cont % 2) == 1) {
                desenhaX(450, 250);
            } else {
                desenhaBola(450, 250);
            }
        } else if (cords.y < 600) {
            if ((cont % 2) == 1) {
                desenhaX(450, 450);
            } else {
                desenhaBola(450, 450);
            }
        }
    }
    cont++;
    console.log(cords,cont);
}

function setJogadaInicial() {
    if (cont == 0) {
        cont = $('inicio').value == 1 ? 1 : 0;
    } else {
        alert('Jogo já foi iniciado!');
    }
}

function desenhaBola(x,y) {
    context.beginPath();
    context.arc(x + 50, y + 50, 50, 0, 2*Math.PI);
    context.lineWidth = 2;
    context.strokeStyle = 'red';

    context.stroke();
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
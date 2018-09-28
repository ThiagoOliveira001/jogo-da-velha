var canvas;
//Contexto canvas
var context;
var $ = document.getElementById.bind(document);
var cont = 0;
// Ultima jogada
var last = null;
//Single player ou não
var single = true;
//Tabuleiro das jogadas do jogo
var velha = new Array(9).fill(-5);
/*
====Tabuleiro====
[
    -5 ,-5 ,-5,
    -5, -5, -5,
    -5, -5, -5
]
=================
*/
//Mapa cordenadas do jogo
var mapaTabuleiro = [
    { x: 150, y: 150 }, { x: 150, y: 350 }, { x: 150, y: 550 },
    { x: 250, y: 150 }, { x: 250, y: 350 }, { x: 250, y: 550 },
    { x: 450, y: 150 }, { x: 450, y: 350 }, { x: 450, y: 550 }
];
var jogador = 0;
var ia = 1;
var temVencedor = false;

//Desenha as linhas do jogo da velha
function criaJogo() {
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


window.onload = criaJogo;


//Pega posição do click mouse do player
function mousePos(event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
//Verifica onde foi feita a jogada
function jogada(event, pc) {
    var cords = event == null ? pc : mousePos(event);
    if (cords.x < 200) {
        //Quadrado 1 da primeira linha
        if (cords.y < 200) {
            if (velha[0] != -5) {
                return false;
            }
            if ((cont % 2) == 1) {
                velha[0] = 1;
                desenhaX(50, 50);

            } else {
                velha[0] = 0;
                desenhaBola(50, 50);

            }
            //Quadrado 1 da segunda linha
        } else if (cords.y < 400) {
            if (velha[3] != -5) {
                return false;
            }
            if ((cont % 2) == 1) {
                velha[3] = 1;
                desenhaX(50, 250);

            } else {
                velha[3] = 0;
                desenhaBola(50, 250);

            }
            //Quadrado 1 da terceira linha
        } else if (cords.y < 600) {
            if (velha[6] != -5) {
                return false;
            }
            if ((cont % 2) == 1) {
                velha[6] = 1
                desenhaX(50, 450);

            } else {
                velha[6] = 0;
                desenhaBola(50, 450);

            }
        }
    }
    else if (cords.x < 400) {
        //Quadrado 2 da primeira linha
        if (cords.y < 200) {
            if (velha[1] != -5) {
                return false;
            }
            if ((cont % 2) == 1) {
                velha[1] = 1;
                desenhaX(250, 50);

            } else {
                velha[1] = 0;
                desenhaBola(250, 50);

            }
            //Quadrado 2 da segunda linha
        } else if (cords.y < 400) {
            if (velha[4] != -5) {
                return false;
            }
            if ((cont % 2) == 1) {
                velha[4] = 1;
                desenhaX(250, 250);

            } else {
                velha[4] = 0;
                desenhaBola(250, 250);

            }
            //Quadrado 2 da terceira linha
        } else if (cords.y < 600) {
            if (velha[7] != -5) {
                return false;
            }
            if ((cont % 2) == 1) {
                velha[7] = 1;
                desenhaX(250, 450);

            } else {
                velha[7] = 0;
                desenhaBola(250, 450);

            }
        }
    }
    else if (cords.x < 600) {
        // Quadrado 3 da primeira linha
        if (cords.y < 200) {
            if (velha[2] != -5) {
                return false;
            }
            if ((cont % 2) == 1) {
                velha[2] = 1;
                desenhaX(450, 50);

            } else {
                velha[2] = 0;
                desenhaBola(450, 50);

            }
            // Quadrado 3 da segunda linha
        } else if (cords.y < 400) {
            if (velha[5] != -5) {
                return false;
            }
            if ((cont % 2) == 1) {
                velha[5] = 1;
                desenhaX(450, 250);

            } else {
                velha[5] = 0;
                desenhaBola(450, 250);

            }
            // Quadrado 3 da terceira linha
        } else if (cords.y < 600) {
            if (velha[8] != -5) {
                return false;
            }
            if ((cont % 2) == 1) {
                velha[8] = 1;
                desenhaX(450, 450);

            } else {
                velha[8] = 0;
                desenhaBola(450, 450);
            }
        }
    }
    cont++;
    if (pc == null && single == true) {
        computador();
    }
}
//Faz jogadas randomicas contra o player
function computador() {
    do {
        pc = {
            x: Math.random() * (600 - 1) + 1,
            y: Math.random() * (600 - 1) + 1
        };
        if (jogada(null, pc) == undefined) {
            break;
        }
    } while (temVencedor == false && disponivel(velha).length > 0);
}

//Verifica se todos os campos foram preenchidos
function jogoEncerrado() {
    for (var i = 0; i < velha.length; i++) {
        if (velha[i] == -5) {
            return false;
        }
    }
    return true;
}
//Defini se começa com X ou O
function setJogadaInicial() {
    if (last == null) {
        cont = $('inicio').value == 1 ? 1 : 0;
        jogador = cont == 1 ? 1 : 0;
        ia = cont == 1 ? 1 : 0;
    } else {
        alert('Jogo já foi iniciado!');
    }
}
//Desenha o y
async function desenhaBola(x, y) {
    context.beginPath();
    context.arc(x + 50, y + 50, 50, 0, 2 * Math.PI);
    context.lineWidth = 2;
    context.strokeStyle = 'red';

    context.stroke();
    last = 0;
    verificaVitoria();
}
//Desenha o x
function desenhaX(x, y) {
    context.beginPath();
    context.moveTo(x + 10, y);
    context.lineTo(x + 80, y + 100);
    context.moveTo(x + 90, y);
    context.lineTo(x + 10, y + 100);

    context.lineWidth = 2;
    context.strokeStyle = 'red';

    context.stroke();
    last = 1;
    verificaVitoria();
}
//Verifica se tem um vencedor e desenha linha
function verificaVitoria() {
    if (!temVencedor) {
        if ((velha[0] + velha[1] + velha[2]) == 3 * last) {
            strike(0, 100, 600, 100);
        }
        else if ((velha[3] + velha[4] + velha[5]) == 3 * last) {
            strike(0, 300, 600, 300);        }
        else if ((velha[6] + velha[7] + velha[8]) == 3 * last) {
            strike(0, 500, 600, 500);
        }
        else if ((velha[0] + velha[3] + velha[6]) == 3 * last) {
            strike(100, 0, 100, 600);
        }
        else if ((velha[1] + velha[4] + velha[7]) == 3 * last) {
            strike(300, 0, 300, 600);
        }
        else if ((velha[2] + velha[5] + velha[8]) == 3 * last) {
            strike(500, 0, 500, 600);
        }
        else if ((velha[2] + velha[4] + velha[6]) == 3 * last) {
            strike(600, 0, 0, 600);
        }
        else if ((velha[0] + velha[4] + velha[8]) == 3 * last) {
            strike(0,0,600,600);
        }
    }
}
//Faz linha em cima de o o o  ou x x x
function strike(xi, yi, x, y) {
    context.beginPath();
    context.moveTo(xi, yi);
    context.lineTo(x, y);

    context.lineWidth = 4;
    context.strokeStyle = 'red';
    context.stroke();
    temVencedor = true;
    if (last == 1) {
        $('pt-x').innerHTML = parseInt($('pt-x').textContent) + 1;
    }
    else if (last == 0) {
        $('pt-bl').innerHTML = parseInt($('pt-bl').textContent) + 1;
    }
}


//Muda o de 1P para 2P ou o contrário.
function alterPlayerMode(param) {
    single = param;
}
//Limpa o jogo
function limpar() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    velha.fill(-5);
    temVencedor = false;
    last = null;
    cont = 0;
    $('inicio').value = 0;
    criaJogo();
}

function zeraPontuacao() {
    $('pt-x').innerHTML = 0;
    $('pt-bl').innerHTML = 0;
}

//Codigo destinado a aplica algoritimo de IA ao jogo
// Em contrução
function winning(player) {
    if (
        velha[0] + velha[3] + velha[6] == (3 * player) ||
        velha[1] + velha[4] + velha[7] == (3 * player) ||
        velha[2] + velha[5] + velha[8] == (3 * player) ||
        velha[0] + velha[1] + velha[2] == (3 * player) ||
        velha[3] + velha[4] + velha[5] == (3 * player) ||
        velha[6] + velha[7] + velha[8] == (3 * player) ||
        velha[0] + velha[4] + velha[8] == (3 * player) ||
        velha[2] + velha[4] + velha[6] == (3 * player)
    ) {
        return true;
    } else {
        return false;
    }
}

function disponivel(_velha) {
    return _velha.filter(el => (el != jogador && el != ia));
}

function minmax(_velha) {
    var _av;

    if (winning(jogador)) {
        return {
            score: -10
        };
    }
    else if (winning(ia)) {
        return {
            score: 10
        };
    }
    else if (disponivel(velha).length == 0) {
        return {
            score: 0
        };
    }
}
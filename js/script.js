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
var velha = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
];
//Mapa cordenadas do jogo
var mapaTabuleiro = [
    [{ x: 150, y: 150 }, { x: 150, y: 350 }, { x: 150, y: 550 }],
    [{ x: 250, y: 150 }, { x: 250, y: 350 }, { x: 250, y: 550 }],
    [{ x: 450, y: 150 }, { x: 450, y: 350 }, { x: 450, y: 550 }]
];
var jogador = 0;
var ia = 1;
var temVencedor = false;

window.onload = () => {
    criaJogo();
};
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
        if (cords.y < 200) {
            if (velha[0][0] != undefined) {
                return false;
            }
            if ((cont % 2) == 1) {
                velha[0][0] = 1;
                desenhaX(50, 50);

            } else {
                velha[0][0] = 0;
                desenhaBola(50, 50);

            }
        } else if (cords.y < 400) {
            if (velha[1][0] != undefined) {
                return false;
            }
            if ((cont % 2) == 1) {
                velha[1][0] = 1;
                desenhaX(50, 250);

            } else {
                velha[1][0] = 0;
                desenhaBola(50, 250);

            }
        } else if (cords.y < 600) {
            if (velha[2][0] != undefined) {
                return false;
            }
            if ((cont % 2) == 1) {
                velha[2][0] = 1
                desenhaX(50, 450);

            } else {
                velha[2][0] = 0;
                desenhaBola(50, 450);

            }
        }
    }
    else if (cords.x < 400) {
        if (cords.y < 200) {
            if (velha[0][1] != undefined) {
                return false;
            }
            if ((cont % 2) == 1) {
                velha[0][1] = 1;
                desenhaX(250, 50);

            } else {
                velha[0][1] = 0;
                desenhaBola(250, 50);

            }
        } else if (cords.y < 400) {
            if (velha[1][1] != undefined) {
                return false;
            }
            if ((cont % 2) == 1) {
                velha[1][1] = 1;
                desenhaX(250, 250);

            } else {
                velha[1][1] = 0;
                desenhaBola(250, 250);

            }
        } else if (cords.y < 600) {
            if (velha[2][1] != undefined) {
                return false;
            }
            if ((cont % 2) == 1) {
                velha[2][1] = 1;
                desenhaX(250, 450);

            } else {
                velha[2][1] = 0;
                desenhaBola(250, 450);

            }
        }
    }
    else if (cords.x < 600) {
        if (cords.y < 200) {
            if (velha[0][2] != undefined) {
                return false;
            }
            if ((cont % 2) == 1) {
                velha[0][2] = 1;
                desenhaX(450, 50);

            } else {
                velha[0][2] = 0;
                desenhaBola(450, 50);

            }
        } else if (cords.y < 400) {
            if (velha[1][2] != undefined) {
                return false;
            }
            if ((cont % 2) == 1) {
                velha[1][2] = 1;
                desenhaX(450, 250);

            } else {
                velha[1][2] = 0;
                desenhaBola(450, 250);

            }
        } else if (cords.y < 600) {
            if (velha[2][2] != undefined) {
                return false;
            }
            if ((cont % 2) == 1) {
                velha[2][2] = 1;
                desenhaX(450, 450);

            } else {
                velha[2][2] = 0;
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
    } while (temVencedor == false && !jogoEncerrado());
}

//Verifica se todos os campos foram preenchidos
function jogoEncerrado() {
    for (var i = 0; i < velha.length; i++) {
        for (var j = 0; j < velha[i].length; j++) {
            if (velha[i][j] == undefined) {
                return false;
            }
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
        if ((velha[0][0] + velha[0][1] + velha[0][2]) == 3 || (velha[0][0] + velha[0][1] + velha[0][2]) == 0) {
            context.beginPath();
            context.moveTo(0, 100);
            context.lineTo(600, 100);

            context.lineWidth = 4;
            context.strokeStyle = 'red';
            context.stroke();
            temVencedor = true;
        }
        else if ((velha[1][0] + velha[1][1] + velha[1][2]) == 3 || (velha[1][0] + velha[1][1] + velha[1][2]) == 0) {
            context.beginPath();
            context.moveTo(0, 300);
            context.lineTo(600, 300);

            context.lineWidth = 4;
            context.strokeStyle = 'red';
            context.stroke();
            temVencedor = true;
        }
        else if ((velha[2][0] + velha[2][1] + velha[2][2]) == 3 || (velha[2][0] + velha[2][1] + velha[2][2]) == 0) {
            context.beginPath();
            context.moveTo(0, 500);
            context.lineTo(600, 500);

            context.lineWidth = 4;
            context.strokeStyle = 'red';
            context.stroke();
            temVencedor = true;
        }
        else if ((velha[0][0] + velha[1][0] + velha[2][0]) == 3 || (velha[0][0] + velha[1][0] + velha[2][0]) == 0) {
            context.beginPath();
            context.moveTo(100, 0);
            context.lineTo(100, 600);

            context.lineWidth = 4;
            context.strokeStyle = 'red';
            context.stroke();
            temVencedor = true;
        }
        else if ((velha[0][1] + velha[1][1] + velha[2][1]) == 3 || (velha[0][1] + velha[1][1] + velha[2][1]) == 0) {
            context.beginPath();
            context.moveTo(300, 0);
            context.lineTo(300, 600);

            context.lineWidth = 4;
            context.strokeStyle = 'red';
            context.stroke();
            temVencedor = true;
        }
        else if ((velha[0][2] + velha[1][2] + velha[2][2]) == 3 || (velha[0][2] + velha[1][2] + velha[2][2]) == 0) {
            context.beginPath();
            context.moveTo(500, 0);
            context.lineTo(500, 600);

            context.lineWidth = 4;
            context.strokeStyle = 'red';
            context.stroke();
            temVencedor = true;
        }
        else if ((velha[0][2] + velha[1][1] + velha[2][0]) == 3 || (velha[0][2] + velha[1][1] + velha[2][0]) == 0) {
            context.beginPath();
            context.moveTo(600, 0);
            context.lineTo(0, 600);

            context.lineWidth = 4;
            context.strokeStyle = 'red';
            context.stroke();
            temVencedor = true;
        }
        else if ((velha[2][2] + velha[1][1] + velha[0][0]) == 3 || (velha[2][2] + velha[1][1] + velha[0][0]) == 0) {
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(600, 600);

            context.lineWidth = 4;
            context.strokeStyle = 'red';
            context.stroke();
            temVencedor = true;
        }
        if (temVencedor) {
            if (last == 1) {
                $('pt-x').innerHTML = parseInt($('pt-x').textContent) + 1;
            }
            else if (last == 0) {
                $('pt-bl').innerHTML = parseInt($('pt-bl').textContent) + 1;
            }
        }
    }
}
//Muda o de 1P para 2P ou o contrário.
function alterPlayerMode(param) {
    single = param;
}
//Limpa o jogo
function limpar() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    velha = [
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]
    ];
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
    if(
        velha[0][0] + velha[0][1] + velha[0][2] == player || 
        velha[1][0] + velha[1][1] + velha[1][2] == player || 
        velha[2][0] + velha[2][1] + velha[2][2] == player || 
        velha[0][0] + velha[1][0] + velha[2][0] == player || 
        velha[0][1] + velha[1][1] + velha[2][1] == player || 
        velha[0][2] + velha[1][2] + velha[2][2] == player || 
        velha[0][2] + velha[1][1] + velha[2][0] == player || 
        velha[2][2] + velha[1][1] + velha[0][0] == player 
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
    else if (jogoEncerrado()) {
        return {
            score: 0
        };
    }
}
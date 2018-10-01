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
var dificuldade = 'Normal';
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
    { x: 150, y: 150 }, { x: 250, y: 150 }, { x: 450, y: 150 },
    { x: 150, y: 250 }, { x: 250, y: 250 }, { x: 450, y: 250 },
    { x: 150, y: 450 }, { x: 250, y: 450 }, { x: 450, y: 450 }

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
    context.strokeStyle = '#4169E1';

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
    if (dificuldade == 'Normal') {
        var livre = disponivel(velha);
        var n = Math.floor(Math.random() * (livre.length - 1) + 1);
        jogada(null, mapaTabuleiro[livre[n]]);
    } else {
        jogada(null, mapaTabuleiro[minmax(ia, velha.slice(0, velha.length)).index]);
    }
}
//Define dificuldade
function setDificuldade() {
    dificuldade = $('dificuldade').value;
}

//Defini se começa com X ou O
function setJogadaInicial() {
    if (last == null) {
        cont = $('inicio').value == 1 ? 1 : 0;
        ia = cont == 1 ? 0 : 1;
        jogador = cont == 1 ? 0 : 1;
    } else {
        alert('Jogo já foi iniciado!');
    }
}
//Desenha o y
async function desenhaBola(x, y) {
    context.beginPath();
    context.arc(x + 50, y + 50, 50, 0, 2 * Math.PI);
    context.lineWidth = 2;
    context.strokeStyle = 'black';

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
    context.strokeStyle = 'black';

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
            strike(0, 300, 600, 300);
        }
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
            strike(0, 0, 600, 600);
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
//Faz linha em cima de o o o  ou x x x
function strike(xi, yi, x, y) {
    context.beginPath();
    context.moveTo(xi, yi);
    context.lineTo(x, y);

    context.lineWidth = 4;
    context.strokeStyle = 'black';
    context.stroke();
    temVencedor = true;
}


//Muda o de 1P para 2P ou o contrário.
function alterPlayerMode(param) {
    single = param;
    if (param) {
        $("btn-p1").style = "background-color: rgba(46, 46, 250, 0.884)";
        $("btn-p2").style = "background-color: #00BFFF";
    } else {
        $("btn-p2").style = "background-color: rgba(46, 46, 250, 0.884)";
        $("btn-p1").style = "background-color: #00BFFF"
    }
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
function winning(player, estado) {
    if (
        estado[0] + estado[1] + estado[2] === (3 * player) ||
        estado[3] + estado[4] + estado[5] === (3 * player) ||
        estado[6] + estado[7] + estado[8] === (3 * player) ||
        estado[0] + estado[3] + estado[6] === (3 * player) ||
        estado[1] + estado[4] + estado[7] === (3 * player) ||
        estado[2] + estado[5] + estado[8] === (3 * player) ||
        estado[2] + estado[4] + estado[6] === (3 * player) ||
        estado[0] + estado[4] + estado[8] === (3 * player)
    ) {
        return true;
    } else {
        return false;
    }
}

function disponivel(estado) {
    var i = [];
    estado.forEach((el, index) => {
        if (el != 1 && el != 0) {
            i.push(index);
        }
    });
    return i;
}
// Algoritimo minimax de IA
// Usado como referencia https://github.com/nicokratky/tictactoe-web/blob/master/script.js
// Muito obrigado nicokratky
function minmax(player, estado) {
    //Pega as posições livres
    var psD = disponivel(estado);
    if (winning(jogador, estado)) {
        // Se o jogador ganhar retorna -10 de heuristica
        return {
            score: -10
        };
    }
    else if (winning(ia, estado)) {
        //Se a ia ganhar retorna 10 de heuristica
        return {
            score: 10
        };
    }
    else if (psD.length == 0) {
        //Empate retorna 0 de heuristica
        return {
            score: 0
        };
    }
    //Array com os movimentos
    var movimentos = [];
    for (var i = 0; i < psD.length; i++) {
        var movimento = {
            index: psD[i]
        }
        //Testando jogada para ver se é a melhor
        estado[psD[i]] = player;
        var aux;
        if (player == ia) {
            aux = minmax(jogador, estado);
        } else {
            aux = minmax(ia, estado);
        }

        //Atribui o score retornado
        movimento.score = aux.score;
        //Seta a posiçõe para o valor default para testar outro estado do jogo
        estado[psD[i]] = -5;
        movimentos.push(movimento);
    }

    //Melhor score e melhor movimento
    var ms = player == ia ? -99999 : 99999;
    var mv;
    movimentos.forEach((m, index) => {
        if (player == ia) {
            if (m.score > ms) {
                ms = m.score;
                mv = index;
            }
        } else {
            if (m.score < ms) {
                ms = m.score;
                mv = index;
            }
        }
    });
    return movimentos[mv];
}
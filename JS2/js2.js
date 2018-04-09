var points = 0;

function finishGameMsg() {
    console.log("Você perdeu! A sua pontuação foi de " + points.toString());
}

function matchMsg() {
    console.log("A rodada empatou!");
}

function machineMsg(move) {
    console.log("-----");
    if (move == 1) console.log("O computador jogou Papel.");
    else if (move == 2) console.log("O computador jogou Pedra.");
    else console.log("O computador jogou Tesoura. -----\n");
    console.log("-----");
}

function result(option, machineMove) {
    if (option == 0) return false;
    if (option == machineMove) matchMsg();
    else {
        if (machineMove == (option % 3 + 1)) {
            console.log("Você venceu!");
            points++;
        }
        else return false;
    }

    return true;
}

var startJokenpo = function() {
    while(true) {
        console.log("Escolha sua jogada:\n0 - Terminar jogo\n1 - Papel\n2 - Pedra\n3 - Tesoura");
        var option = parseInt(prompt("Escolha sua opção"));

        if (isNaN(option)) {
            finishGameMsg();
            break;
        }
        else {
            var machineMove = Math.floor((Math.random() * 3) + 1);
            machineMsg(machineMove);

            if (!result(option, machineMove)) {
                finishGameMsg();
                points = 0;
                break;
            }
        }
    }
}

// Atividade TO-DO-LIST em JS

const lerTeclado = require('readline-sync');

let listaDeTarefas = [];

// Exibe o menu principal
function menuInicial() {
    console.log("--------------------------");
    console.log("      MENU TO-DO-LIST     ");
    console.log("--------------------------");
    console.log("1 - ADICIONAR TAREFA      ");
    console.log("2 - VISUALIZAR TAREFAS    ");
    console.log("3 - VISUALIZAR ITEM       ");
    console.log("4 - EDITAR                ");
    console.log("5 - EXCLUIR               ");
    console.log("6 - FILTRAR               ");
    console.log("0 - ENCERRAR              ");
    console.log("--------------------------");
}

// Adiciona uma nova tarefa
function adicionarTarefa() {
    let tituloTarefa = lerTeclado.question("Qual o titulo da tarefa que deseja adicionar a sua TO-DO-LIST?\n");
    if (!validarTitulo(tituloTarefa)) {
        return adicionarTarefa()
    }
    let descricaoTarefa;
    do {
        descricaoTarefa = lerTeclado.question("Descreva a tarefa:\n");
    } while (!validarDescricao(descricaoTarefa))

    listaDeTarefas.push({ tituloTarefa, descricaoTarefa });
    let adicionar = lerTeclado.keyInYN("Deseja adicionar mais tarefas?");
    if (adicionar) {
        adicionarTarefa()
    }
}

// Valida o título informado
function validarTitulo(tituloTarefa) {
    if (tituloTarefa.trim().length < 2) {
        console.log("Título inválido");
        return false;
    }
    return true;
}

// Valida a descrição informada
function validarDescricao(descricaoTarefa) {
    if (descricaoTarefa.trim().length < 2) {
        console.log("Descrição inválida");
        return false;
    }
    return true;
}

// Exibe todas as tarefas cadastradas
function visualizarTarefas() {
    if (listaDeTarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }
    for (let i = 0; i < listaDeTarefas.length; i++) {
        console.log(`${i} - ${listaDeTarefas[i].tituloTarefa}`);
    }
}

// Exibe titulo e descrição da tarefa escolhida
function visualizarItem() {
    if (listaDeTarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }
    visualizarTarefas();
    let visualizarTarefa = lerTeclado.questionInt("Qual tarefa deseja visualizar?\n");
    if (visualizarTarefa < 0 || visualizarTarefa >= listaDeTarefas.length) {
        console.log("Tarefa inexistente.");
        return;
    }
    console.log("----------------------");
    console.log("Título:");
    console.log(listaDeTarefas[visualizarTarefa].tituloTarefa);
    console.log("Descrição:");
    console.log(listaDeTarefas[visualizarTarefa].descricaoTarefa);
    console.log("----------------------");
}

// Edita tarefa
function editar() {
    if (listaDeTarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }
    let opcao = lerTeclado.questionInt(`
        Digite a opção desejada:
        1 - Titulo da tarefa
        2 - Descrição da tarefa\n`);

    visualizarTarefas();

    if (opcao === 1) {
        let tarefa = lerTeclado.questionInt("Qual titulo da lista deseja editar?\n");
        if (tarefa < 0 || tarefa >= listaDeTarefas.length) {
            console.log("Tarefa inexistente.");
            return;
        }
        let novoTitulo = lerTeclado.question("Escreva o novo titulo:\n");
        if (!validarTitulo(novoTitulo)) {
            return;
        }
        editarTituloTarefa(tarefa, novoTitulo);
    } else if (opcao === 2) {
        let tarefa = lerTeclado.questionInt("Qual tarefa deseja editar a descrição?\n");
        if (tarefa < 0 || tarefa >= listaDeTarefas.length) {
            console.log("Tarefa inexistente.");
            return;
        }
        let novaDescricao = lerTeclado.question("Escreva a nova descrição:\n");
        if (!validarDescricao(novaDescricao)) {
            return;
        }
        editarDescricaoTarefa(tarefa, novaDescricao);
    } else {
        console.log("Opção inválida.");
    }
}

// Edita titulo da tarefa
function editarTituloTarefa(tarefa, novoTitulo) {
    listaDeTarefas[tarefa].tituloTarefa = novoTitulo
}

// Edita descrição tarefa
function editarDescricaoTarefa(tarefa, novaDescricao) {
    listaDeTarefas[tarefa].descricaoTarefa = novaDescricao
}

// Exclui tarefa da lista de tarefas
function excluir() {
    if (listaDeTarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }
    visualizarTarefas();
    let excluirTarefa = lerTeclado.questionInt("Qual tarefa deseja excluir?\n");
    if (excluirTarefa < 0 || excluirTarefa >= listaDeTarefas.length) {
        console.log("Tarefa inexistente.");
        return;
    }
    listaDeTarefas.splice(excluirTarefa, 1);
    console.log("Tarefa excluída com sucesso!");
}

// Utiliza um termo para filtrar tarefa
function filtrar() {
    let filtro = lerTeclado.question("Qual termo que deseja buscar?\n").toUpperCase().trim();
    let encontrou = false;
    let listaEncontrada = [];

    for (let i = 0; i < listaDeTarefas.length; i++) {
        let tituloTarefa = listaDeTarefas[i].tituloTarefa.toUpperCase();
        if (tituloTarefa.includes(filtro)) {
            listaEncontrada.push(listaDeTarefas[i].tituloTarefa);
            encontrou = true;
        }
    }
    if (!encontrou) {
        console.log("Nenhuma tarefa encontrada com esse termo.");
    } else {
        console.log("Tarefas encontradas:");
        for (let i = 0; i < listaEncontrada.length; i++) {
            console.log(`${i + 1} - ${listaEncontrada[i]}`);
        }
    }
}


// Inicia o código
function iniciar() {

    let opcao;

    do {
        menuInicial();

        opcao = lerTeclado.questionInt("Escolha uma opção:\n");

        switch (opcao) {
            case 1:
                adicionarTarefa();
                break;
            case 2:
                visualizarTarefas();
                break;
            case 3:
                visualizarItem();
                break;
            case 4:
                editar();
                break;
            case 5:
                excluir();
                break;
            case 6:
                filtrar();
                break;
            case 0:
                console.log("Programa encerrado.");
                break;
            default:
                console.log("Opção inválida.");
        }
    } while (opcao != 0)
}

iniciar();







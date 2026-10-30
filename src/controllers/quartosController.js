const quartosModel = require(`../models/quartosModel`);

const listarQuartos = async (req, res) => {
    const quartos = await quartosModel.selecionarTodos();

    if(quartos.length === 0){
        return res.status(404).json({
            message: `Nenhum quarto encontrado`
        });
    }

    res.status(200).json(
        quartos
    );
}

const listarQuartosPorId = async (req, res) => {
    const id = req.params.id;
    const quarto = await quartosModel.selecionarPorId(id);

    if(quarto.length === 0){
        return res.status(404).json({
            message: `Quarto não encontrado`
        });
    }

    res.status(200).json(
        quarto
    );
}

const cadastrarQuarto = async (req, res) => {
    const {categoria, capacidade, valor_diaria} = req.body;

    if(!categoria || !capacidade || !valor_diaria || valor_diaria < 0){
        return res.status(400).json({
            erro: `Preenha todos os campos corretamente!`
        });
    }

    const quartoCadastrado = await quartosModel.criar(categoria, capacidade, valor_diaria);

    res.status(200).json({
        message: `Quarto cadastrado com sucesso`,
        quarto: quartoCadastrado
    });
}

const atualizarQuarto = async (req, res) => {
    const id = req.params.id;
    let {categoria, capacidade, valor_diaria} = req.body;

    const quartoBuscado = await quartosModel.selecionarPorId(id);

    if(quartoBuscado.length === 0){
        return res.status(404).json({
            message: `Quarto não encontrado`
        });
    }

    if(!categoria){
        categoria = quartoBuscado[0].categoria;
    }

    if(!capacidade){
        capacidade = quartoBuscado[0].capacidade;
    }

    if(!valor_diaria){
        valor_diaria = quartoBuscado[0].valor_diaria;
    }

    if(valor_diaria < 0){
        return res.status(400).json({
            message: `O valor da diária deve ser maior que zero`
        });
    }

    const quartoAtualizado = await quartosModel.atualizar(id, categoria, capacidade, valor_diaria);

    res.status(200).json({
        message: `Quarto atualizado com sucesso`,
        quarto: quartoAtualizado
    });
}

const deletarQuarto = async (req, res) => {
    const id = req.params.id;
    const quarto = await quartosModel.selecionarPorId(id);

    if(quarto.length === 0){
        return res.status(404).json({
            message: `Quarto não encontrado`
        });
    }

    const excluido = await quartosModel.deletar(id);

    res.status(200).json({
        message: `Quarto excluido com sucesso`,
        excluido: excluido
    });
}

module.exports = {
    listarQuartos,
    listarQuartosPorId,
    cadastrarQuarto,
    atualizarQuarto,
    deletarQuarto
}
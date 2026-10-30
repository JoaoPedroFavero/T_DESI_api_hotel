const hospedesModel = require(`../models/hospedesModel`);
const {criptografar, descriptografar} = require(`../utils/criptografia`);

const listarHospedes = async (req, res) => {
    const hospedes = await hospedesModel.selecionarTodos();

    if(hospedes.length === 0){
        return res.status(404).json({
            message: `Não há hospedes cadastrados no momento.`
        });
    }

    const hospedeDescriptografado = hospedes.map((hospede) => {
        const cpf = descriptografar({
            ivSalvo: hospede.cpf_iv,
            tagSalva: hospede.cpf_tag,
            dadoSalvo: hospede.cpf
        });

        const email = descriptografar({
            ivSalvo: hospede.email_iv,
            tagSalva: hospede.email_tag,
            dadoSalvo: hospede.email
        });

        return {
            id: hospede.id,
            nome: hospede.nome,
            cpf: cpf,
            data_nascimento: hospede.data_nascimento,
            telefone: hospede.telefone,
            endereco: hospede.endereco,
            email: email
        }
    });

    res.status(200).json(
        hospedeDescriptografado
    );
}

const listarHospedesPorId = async (req, res) => {
    const id = req.params.id;
    const hospede = await hospedesModel.selecionarPorId(id);

    if(hospede.length === 0){
        return res.status(404).json({
            message: `Hospede não encontrado`
        });
    }

    const cpf = descriptografar({
            ivSalvo: hospede[0].cpf_iv,
            tagSalva: hospede[0].cpf_tag,
            dadoSalvo: hospede[0].cpf
        });

    const email = descriptografar({
        ivSalvo: hospede[0].email_iv,
        tagSalva: hospede[0].email_tag,
        dadoSalvo: hospede[0].email
    });

    res.status(200).json({
        id: hospede[0].id,
        nome: hospede[0].nome,
        cpf: cpf,
        data_nascimento: hospede[0].data_nascimento,
        telefone: hospede[0].telefone,
        endereco: hospede[0].endereco,
        email: email
    });
}

const cadastrarHospede = async (req, res) => {
    const {nome, cpf, data_nascimento, telefone, endereco, email} = req.body;

    if(!nome || !cpf || cpf.length !== 11 || !data_nascimento || !telefone || !endereco || !email){
        return res.status(400).json({
            erro: `Todos os campos são obrigatórios para cadastro do novo hospede. Utiliza apenas numeros no CPF.`
        });
    }

    const { iv: cpfIv, tag: cpfTag, criptografia: cpfCriptografado } = criptografar(cpf);
    const { iv: emailIv, tag: emailTag, criptografia: emailCriptografado } = criptografar(email);

    await hospedesModel.criar({
        nome, 
        cpf: cpfCriptografado, 
        cpf_iv: cpfIv, 
        cpf_tag: cpfTag, 
        data_nascimento, 
        telefone, 
        endereco, 
        email: emailCriptografado, 
        email_iv: emailIv, 
        email_tag: emailTag
    });

    res.status(200).json({
        message: `Hospede criado com sucesso`
    });

}

const atualizarHospede = async (req, res) => {
    let {nome, cpf, data_nascimento, telefone, endereco, email} = req.body;
    let cpfIv, cpfTag, cpfCriptografado, emailIv, emailTag, emailCriptografado;
    let cpfCript = true;
    let emailCript = true;
    const id = req.params.id;

    const hospedeBuscado = await hospedesModel.selecionarPorId(id);

    if(hospedeBuscado.length === 0){
        return res.status(404).json({
            message: `Hospede não encontrado`
        });
    }

    if(!nome){
        nome = hospedeBuscado[0].nome;
    }

    if(!data_nascimento){
        data_nascimento = hospedeBuscado[0].data_nascimento;
    }

    if(!telefone){
        telefone = hospedeBuscado[0].telefone;
    }

    if(!endereco){
        endereco = hospedeBuscado[0].endereco;
    }

    if(!cpf){
        cpfCript = false;
        cpfCriptografado = hospedeBuscado[0].cpf;
        cpfIv = hospedeBuscado[0].cpf_iv;
        cpfTag = hospedeBuscado[0].cpf_tag;
    }

    if(!email){
        emailCript = false;
        emailCriptografado = hospedeBuscado[0].email;
        emailIv = hospedeBuscado[0].email_iv;
        emailTag = hospedeBuscado[0].email_tag;

        console.log(email)
    }

    if(cpfCript){
        const resultadoCpf = criptografar(cpf);
        cpfIv = resultadoCpf.iv;
        cpfTag = resultadoCpf.tag;
        cpfCriptografado = resultadoCpf.criptografia;
    }

    if(emailCript){
        const resultadoEmail = criptografar(email);
        emailIv = resultadoEmail.iv;
        emailTag = resultadoEmail.tag;
        emailCriptografado = resultadoEmail.criptografia;
    }

    await hospedesModel.atualizar({
        id,
        nome, 
        cpf: cpfCriptografado, 
        cpf_iv: cpfIv, 
        cpf_tag: cpfTag, 
        data_nascimento, 
        telefone, 
        endereco, 
        email: emailCriptografado, 
        email_iv: emailIv, 
        email_tag: emailTag
    });

    res.status(200).json({
        message: `Hospede atualizado com sucesso`
    });

}

const deletarHospede = async (req, res) => {
    const id = req.params.id;
    const hospede = await hospedesModel.selecionarPorId(id);

    if(hospede.length === 0){
        return res.status(404).json({
            message: `Hospede não encontrado`
        });
    }

    const excluido = await hospedesModel.deletar(id);

    res.status(200).json({
        message: `Hospede excluído com sucesso`,
        excluido: excluido
    });
}

module.exports = {
    listarHospedes,
    listarHospedesPorId,
    cadastrarHospede,
    atualizarHospede,
    deletarHospede
}
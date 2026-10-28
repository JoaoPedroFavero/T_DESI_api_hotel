const hospedesModel = require(`../models/hospedesModel`);
const {criptografar, descriptografar} = require(`../utils/criptografia`);

const listarHospedes = async (req, res) => {
    const hospedes = await hospedesModel.selecionarTodos();

    if(hospedes.length === 0){
        return res.status(404).json({
            message: `Não há hospedes cadastrados no momento.`
        });
    }

    res.status(200).json(
        hospedes
    );
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

    console.log(`cpf iv`, cpfIv)
    console.log(`cpf tag`, cpfTag)
    console.log(`cpf cript`, cpfCriptografado)
    console.log(`email iv`, emailIv)
    console.log(`email tag`, emailTag)
    console.log(`email cript`, emailCriptografado)

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

module.exports = {
    listarHospedes,
    cadastrarHospede
}
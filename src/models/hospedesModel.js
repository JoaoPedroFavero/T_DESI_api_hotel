const db = require(`../config/db`);

const selecionarTodos = async () => {
    const [resultado] = await db.query(
        "SELECT id, nome, cpf, data_nascimento, telefone, endereco, email FROM hospedes"
    );

    return resultado;
}

const selecionarPorId = async (id) => {
    const [resultado] = await db.query(
        "SELECT id, nome, cpf, data_nascimento, telefone, endereco, email FROM hospedes WHERE id = ?",
        [id]
    );

    return resultado;
}

const criar = async ({nome, cpf, cpf_iv, cpf_tag, data_nascimento, telefone, endereco, email, email_iv, email_tag}) => {
    const [resultado] = await db.query(
        "INSERT INTO hospedes (nome, cpf, cpf_iv, cpf_tag, data_nascimento, telefone, endereco, email, email_iv, email_tag) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [nome, cpf, cpf_iv, cpf_tag, data_nascimento, telefone, endereco, email, email_iv, email_tag]
    );

    return {
        id: resultado.insertId,
        nome,
        cpf,
        cpf_iv,
        cpf_tag,
        data_nascimento,
        telefone,
        endereco,
        email,
        email_iv,
        email_tag
    };
}

const atualizar = async (id, nome, cpf, data_nascimento, telefone, endereco, email) => {
    const [resultado] = await db.query(
        "UPDATE hospedes  SET nome=?, cpf=?, data_nascimento=?, telefone=?, endereco=?, email=? WHERE id = ?",
        [nome, cpf, data_nascimento, telefone, endereco, email, id]
    );

    return {
        id,
        nome,
        cpf,
        data_nascimento,
        telefone,
        endereco,
        email
    };
}

const deletar = async (id) => {
    const [resultado] = await db.query(
        "DELETE FROM hospedes WHERE id = ?",
        [id]
    );

    return resultado.affectedRows;
}

module.exports = {
    selecionarTodos,
    selecionarPorId,
    criar,
    atualizar,
    deletar
}
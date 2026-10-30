const db = require(`../config/db`);

const selecionarTodos = async() => {
    const [resultado] = await db.query(
        "SELECT * FROM quartos"
    );

    return resultado;
}

const selecionarPorId = async(id) => {
    const [resultado] = await db.query(
        "SELECT * FROM quartos WHERE id = ?",
        [id]
    );

    return resultado;
}

const criar = async(categoria, capacidade, valor_diaria) => {
    const [resultado] = await db.query(
        "INSERT INTO quartos (categoria, capacidade, valor_diaria) VALUES (?, ?, ?)",
        [categoria, capacidade, valor_diaria]
    );

    return {
        id: resultado.insertId,
        categoria,
        capacidade,
        valor_diaria
    }
}

const atualizar = async(id, categoria, capacidade, valor_diaria) => {
    const [resultado] = await db.query(
        "UPDATE quartos SET categoria=?, capacidade=?, valor_diaria=? WHERE id = ?",
        [categoria, capacidade, valor_diaria, id]
    );

    return {
        id,
        categoria,
        capacidade,
        valor_diaria
    }
}

const deletar = async(id) => {
    const [resultado] = await db.query(
        "DELETE FROM quartos WHERE id = ?",
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
const dotenv = require(`dotenv`);
dotenv.config();

const crypto = require(`crypto`);

const ALGORITMO = `aes-256-gcm`;
const CHAVE = Buffer.from(process.env.CRYPTO_KEY, "hex");

const criptografar = (dado) => {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(ALGORITMO, CHAVE, iv);

    const criptografia = Buffer.concat([cipher.update(dado, "utf8"), cipher.final()]);
    const tag = cipher.getAuthTag();

    return {iv, tag, criptografia}
}

const descriptografar = ({ivSalvo, tagSalva, dadoSalvo}) => {
    const decipher = crypto.createDecipheriv(ALGORITMO, CHAVE, ivSalvo);
    decipher.setAuthTag(tagSalva);

    const descriptografia = Buffer.concat([decipher.update(dadoSalvo), decipher.final()]);

    return descriptografia.toString("utf8");
}

module.exports = {
    criptografar,
    descriptografar
}
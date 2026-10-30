const express = require(`express`);
const router = express.Router();

const quartosController = require(`../controllers/quartosController`);

router.get(`/quartos`, quartosController.listarQuartos);
router.get(`/quartos/:id`, quartosController.listarQuartosPorId);

router.post(`/quartos/cadastrar`, quartosController.cadastrarQuarto);

router.put(`/quartos/atualizar/:id`, quartosController.atualizarQuarto);

router.delete(`/quartos/deletar/:id`, quartosController.deletarQuarto);

module.exports = router;
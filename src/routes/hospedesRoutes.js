const express = require(`express`);
const router = express.Router();

const hospedesController = require(`../controllers/hospedesController`);

router.get(`/hospedes`, hospedesController.listarHospedes);
router.get(`/hospedes/:id`, hospedesController.listarHospedesPorId);

router.post(`/hospedes/cadastrar`, hospedesController.cadastrarHospede);

router.put(`/hospedes/atualizar/:id`, hospedesController.atualizarHospede);

router.delete(`/hospedes/deletar/:id`, hospedesController.deletarHospede);

module.exports = router;
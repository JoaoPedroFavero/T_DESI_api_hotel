const express = require(`express`);
const router = express.Router();

const hospedesController = require(`../controllers/hospedesController`);

router.get(`/hospedes`, hospedesController.listarHospedes);

router.post(`/hospedes/cadastrar`, hospedesController.cadastrarHospede);

module.exports = router;
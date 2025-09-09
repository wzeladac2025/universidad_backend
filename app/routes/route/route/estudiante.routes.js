const controller = require('../controllers/estudiante.controller');
router.get('/validar-requisitos/:estudianteId/:materiaId', controller.validarRequisitos);
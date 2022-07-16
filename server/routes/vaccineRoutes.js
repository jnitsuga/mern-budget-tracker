const express = require('express');
const router = express.Router();

const { 
  getVaccinesList, 
  createVaccineEntry, 
  updateVaccineEntry, 
  deleteVaccineEntry, 
} = require('../controllers/vaccineController');

router.route('/').get(getVaccinesList).post(createVaccineEntry);
// #note    shortened version since both of them use the same route '/'
// router.get('/', getVaccinesList)
// router.post('/', createVaccineEntry)

router.route('/:id').put(updateVaccineEntry).delete(deleteVaccineEntry);
// #note    shortened version since both of them use the same route '/:id'
// router.put('/:id', updateVaccineEntry)
// router.delete('/:id', deleteVaccineEntry)

module.exports = router;
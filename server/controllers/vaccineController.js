const VaccineModel = require('../models/Vaccine')

// @desc    Get vaccines
// @route   GET /api/vaccines
// @access  Private
const getVaccinesList = async (req, res) => {
  VaccineModel.find({}, (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
}

// @desc    Create vaccine entry
// @route   POST /api/vaccines
// @access  Private
const createVaccineEntry = async (req, res) => {
  const vaccine = req.body
  const newVaccine = new VaccineModel(vaccine)
  await newVaccine.save();

  res.json(vaccine)
}

// @desc    Update vaccine entry
// @route   PUT /api/vaccines/:id
// @access  Private
const updateVaccineEntry = async (req, res) => {
  res.status(200).json({message: `Update vaccine ${req.params.id}` })
}

// @desc    Delete vaccine entry
// @route   DELETE /api/vaccines/:id
// @access  Private
const deleteVaccineEntry = async (req, res) => {
  res.status(200).json({message: `Delete vaccine ${req.params.id}` })
}

module.exports = {
  getVaccinesList,
  createVaccineEntry,
  updateVaccineEntry,
  deleteVaccineEntry,
}
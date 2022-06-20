const Pet = require('../models/pet.model')

// module.exports.createPet = (request, response) => {
//   Pet.create(request.body)
//     .then(pet => response.json(pet))
//     .catch(err => response.status(400).json(err))
// }

module.exports.createPet = async(request, response) => {
  // check that pet name is unique
  try {
    const pets = await Pet.find({name: request.body.name})
    if (pets.length!==0) return response.status(400).json( {errors: {name: {message: 'Pet name already taken'}}})
    const pet = await Pet.create(request.body)
    response.json(pet)
  } catch(err) {
    response.status(400).json(err)
  }
}

module.exports.readAllPets = (request, response) => {
  Pet.find()
    .then(pets => response.json(pets))
    .catch(err => response.status(400).json(err))
}

module.exports.readOnePet = (request, response) => {
  Pet.findOne({_id: request.params._id})
    .then(pet => response.json(pet))
    .catch(err => response.status(400).json(err))
}

// module.exports.updatePet = (request, response) => {
//   Pet.findOneAndUpdate({_id: request.params._id}, request.body, {new: true, runValidators: true})
//     .then(updatedPet => response.json(updatedPet))
//     .catch(err => response.status(400).json(err))
// }

module.exports.updatePet = async(request, response) => {
  // check that pet name is unique (except for one with same id)
  try {
    console.log('update req received')
    const pets = await Pet.find({name: request.body.name})
    if (pets.length===1 && pets[0]._id!=request.body._id) return response.status(400).json( {errors: {name: {message: 'Pet name already taken'}}})
    const pet = await Pet.findOneAndUpdate({_id: request.params._id}, request.body, {new: true, runValidators: true})
    response.json(pet)
  } catch(err) {
    response.status(400).json(err)
  }
}

module.exports.deletePet = (request, response) => {
  Pet.deleteOne({_id: request.params._id})
    .then(deleteConfirmation => response.json(deleteConfirmation))
    .catch(err => response.status(400).json(err))
}

module.exports.likePet = (request, response) => {
  Pet.findOneAndUpdate({_id: request.params._id}, {$set: request.body}, {new: true})
    .then(pet => response.json(pet))
    .catch(err => response.status(400).json(err))
}
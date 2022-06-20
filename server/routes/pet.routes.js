const PetController = require('../controllers/pet.controller')

module.exports = (app) => {
  // create pet
  app.post('/api/pets', PetController.createPet)
  // read one pet
  app.get('/api/pets/:_id', PetController.readOnePet)
  // read all pets
  app.get('/api/pets', PetController.readAllPets)
  // update pet
  app.put('/api/pets/:_id', PetController.updatePet)
  // delete pet
  app.delete('/api/pets/:_id', PetController.deletePet)
}
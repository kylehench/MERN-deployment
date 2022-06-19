const ProductController = require('../controllers/product.controller')

module.exports = (app) => {
  app.get('/api/products', ProductController.readAllProducts)
  app.get('/api/products/:_id', ProductController.readOneProduct)
  app.post('/api/products', ProductController.createProduct)
  app.put('/api/products/:_id', ProductController.updateProduct)
  app.delete('/api/products/:_id', ProductController.deleteProduct)
}
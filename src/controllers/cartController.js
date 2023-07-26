const path = require('path');

const renderCart = (req, res) => {
  return res.render(path.resolve('src/views/cart.ejs'), {user: req.session.user}) 
}

module.exports= {renderCart}
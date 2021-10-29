import { Router } from 'express'
const router = Router()

/* GET home page. */

// localhost:3000
router.get('/', function(req, res) {
  res.redirect('flights/index')
})

export { 
  router
}

import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'
const router = Router()

/* GET flights listing. */

// localhost:3000/flights/index - GET
router.get('/index', flightsCtrl.index)

// localhost:3000/flights/:id - GET
router.get('/:id', flightsCtrl.show)

// localhost:3000/flights/new - GET
router.get('/new', flightsCtrl.new)

// localhost:3000/flights - POST
router.post('/', flightsCtrl.create)

// localhost:3000/flights/:id/tickets
router.post('/:id/tickets', flightsCtrl.createTicket)

export {
  router
}

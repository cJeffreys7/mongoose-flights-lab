import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'
const router = Router()

/* GET flights listing. */

// localhost:3000/flights/index
router.get('/index', flightsCtrl.index)

// localhost:3000/flights/new
router.get('/new', flightsCtrl.new)

// localhost:3000/flights
router.post('/', flightsCtrl.create)

export {
  router
}

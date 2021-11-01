import { Router } from 'express'
import * as destinationCtrl from '../controllers/destination.js'
const router = Router ()

// localhost:3000/destinations/new
router.get('/new', destinationCtrl.new)

// localhost:3000/destinations
router.post('/', destinationCtrl.create)

export {
  router
}
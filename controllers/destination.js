import { Destination } from "../models/destination.js"

function newDestination(req, res) {
  Destination.find({}, function(err, destinations) {
    res.render('destinations/new', {
      title: 'New Destination',
      destinations: destinations
    })
  })
}

function create(req, res) {
  Destination.find({ airport: req.body.airport}, function(err, destination){
    if (destination.length) {
      console.log('Unable to create new Destination')
      res.redirect('destinations/new')
    } else {
      Destination.create(req.body, function(err, destination) {
        if (err) {
          console.log('Unable to create new Destination')
          res.redirect('destinations/new')
        }
        res.redirect('destinations/new')
      })
    }
  })
}

export {
  newDestination as new,
  create
}
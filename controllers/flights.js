import { Flight } from "../models/flight.js"

function index(req, res) {
  Flight.find({}, function(err, flights) {
    res.render('flights/index', {
      flights: flights,
      error: err
    })
  })
}

function create(req, res) {
  const flight = new Flight(req.body)
  console.log("New flight:", flight)
  flight.save(function(err) {
    if (err) {
      return res.redirect('flights/new')
    }
    res.redirect('flights/index')
  })
}

function newFlight(req, res) {
  res.render('flights/new')
}

export {
  index,
  create,
  newFlight as new,
}
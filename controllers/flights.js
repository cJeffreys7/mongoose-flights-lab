import { Flight } from "../models/flight.js"
import * as flightModel from "../models/flight.js"

function index(req, res) {
  Flight.find({}, function(err, flights) {
    res.render('flights/index', {
      flights: flights,
      error: err
    })
  })
}

function show(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    res.render('flights/show', {
      flight
    })
  })
}

function newFlight(req, res) {
  const newFlight = new Flight ()
  const dt = newFlight.departs
  const departsDate = dt.toISOString().slice(0, 16)
  res.render('flights/new', {
    departsDate,
    airlines: flightModel.airlines,
    airports: flightModel.airports,
    defaultAirport: flightModel.defaultAirport
  })
}

function create(req, res) {
  for (let key in req.body) {
    if (!req.body[key]) {
      delete req.body[key]
    }
  }
  const flight = new Flight(req.body)
  console.log("New flight:", flight)
  flight.save(function(err) {
    if (err) {
      return res.redirect('flights/new')
    }
    res.redirect('flights/index')
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id, function(err, flight){
    console.log(`Found flight:`, flight.flightNo)
    flight.tickets.push(req.body)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
    console.log(flight)
  })
}

export {
  index,
  show,
  newFlight as new,
  create,
  createTicket
}
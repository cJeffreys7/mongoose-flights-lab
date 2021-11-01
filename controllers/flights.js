import { Flight } from "../models/flight.js"
import * as flightModel from "../models/flight.js"
import { Destination } from "../models/destination.js"

function index(req, res) {
  Flight.find({}, function(err, flights) {
    res.render('flights/index', {
      flights: flights,
      error: err,
      title: 'All Flights'
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
    defaultAirport: flightModel.defaultAirport,
    title: 'New Flight'
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
  .populate('destinations')
  .exec(function(err, flight) {
    Destination.find({_id: {$nin: flight.destinations}}, function(err, destinations) {
      res.render('flights/show', {
        flight,
        title: `${flight.airline} ${flight.flightNo}`,
        destinations: destinations
      })
    })
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
    flight.tickets.push(req.body)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function addToDestinations(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    flight.destinations.push(req.body.destinationId)
    flight.save(function(err){
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function deleteTicket(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    const ticketIdx = flight.tickets.findIndex(ticket => ticket._id === req.params.flightId)
    flight.tickets.splice(ticketIdx, 1)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function deleteDestination(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    const destinationIdx = flight.destinations.findIndex(d => d.toString().includes(req.params.destinationId))
    flight.destinations.splice(destinationIdx, 1)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id, function(err, flight){
    res.redirect('/flights/index')
  })
}

export {
  index,
  show,
  newFlight as new,
  create,
  createTicket,
  addToDestinations,
  deleteTicket,
  deleteDestination,
  deleteFlight as delete
}
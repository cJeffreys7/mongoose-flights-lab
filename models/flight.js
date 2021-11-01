import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat: String,
  price: {
    type: Number,
    min: 0
  }
})

const airlines = ['American', 'Southwest', 'United']

const flightSchema = new Schema ({
  airline: {
    type: String,
    enum: airlines
  },
  airport: {
    type: String
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999
  },
  departs: {
    type: Date,
    default: nextYearDate()
  },
  tickets: [ticketSchema],
  destinations: [{type: Schema.Types.ObjectId, ref: 'Destination'}]
})

function nextYearDate() {
  const date = new Date()
  const nextYear = date.getFullYear()+1
  date.setFullYear(nextYear)
  return date
}

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight,
  airlines
}
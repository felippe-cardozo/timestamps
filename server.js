const express = require('express')
const moment = require('moment')
const path = require('path')

const app = express()

app.use('/', express.static(path.join(__dirname, 'templates')))

app.get('/:time', function(req, res) {
  const formats = [
    moment.ISO_8601,
    'MMMM-DD-YYYY'
  ]
  const time = req.params.time || false
  let timeObject = {
    'unix': null,
    'natural': null
  }
  // unix timestamp is only valid if parsed as an int
  if (!moment(time, formats).isValid() && !moment(+time, formats).isValid())
    return(res.json(timeObject))
  const date = moment(time, formats).isValid() ? 
    moment(time, formats) : moment(+time, formats)
  let natural = date.format('MMMM DD, YYYY')
  let unix = date.unix()
  timeObject['unix'] = unix
  timeObject['natural'] = natural
  res.json(timeObject)
}).listen(3000, function(){
  console.log('app started at port 3000')
})

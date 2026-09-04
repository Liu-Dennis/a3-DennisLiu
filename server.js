const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // On Render, make sure `npm install` is your build command.
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

let appdata = []
let curr_id = 0

const calc_urgency = function (due, length) {
  let dateEntered = new Date(due);
  let dateNow = Date.now()

  // time left to do work
  let timeUntil = (dateEntered - dateNow) + (dateEntered.getTimezoneOffset() * 60 * 1000)

  let daysMs = function(days) {
    return days * 24 * 60 * 60 * 1000
  }
  console.log(dateEntered)
  console.log(dateNow)
  console.log(timeUntil)

  let urgency = (due === "") ? "N/A" : "Low"

  const urgencyBias = {
  "Short": +2,
  "Normal": 0,
  "Long": -3
  };

  let bias_ms = (daysMs(urgencyBias[length]))
  console.log(`BIAS: ${length}`)

  if (timeUntil < 0) {
    urgency = "Overdue"
  }
  else if (timeUntil + bias_ms < daysMs(1)) {
    urgency = "Danger"
  }
  else if (timeUntil + bias_ms < daysMs(3)) {
    urgency = "High"
  }
  else if (timeUntil + bias_ms < daysMs(7)) {
    urgency = "Normal"
  }

  return urgency
}

const del_entry = function (entry_idx) {
  newdata = []
  // console.log(entry_idx)
  for (let entry of appdata) {
    // console.log(entry.id == entry_idx)
    if (entry.id != entry_idx) {
      // console.log(`${appdata.id} does not equal ${entry_idx}`)
      newdata.push(entry)
    }
    
  }
  console.log(JSON.stringify(newdata))
  appdata = newdata
}

const edit_entry = function (entry_idx, newname, newsub, newdue) {
  for (let entry of appdata) {
    if (entry.id == entry_idx) {
      entry.name = newname
      entry.subject = newsub
      entry.due = newdue
      entry.urgency = calc_urgency(newdue, newsub)
    }
  }
  console.log(JSON.stringify(appdata))
}

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else if(request.url === '/get_data') {
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(appdata))
  }
  else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {

  // if( request.url === '/add_row' ) {
  // }
  // else if(request.url === '/edit_row') {
  // }

  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    let entry = JSON.parse( dataString )
    if(request.url === '/delete_row') {
        
      // console.log(`delete row: ${entry.id}, ${typeof entry.id}`)

      del_entry(entry.id)

      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      // change this to incorporate data
      // console.log(`current state:${appdata}`)
      response.end(JSON.stringify(appdata))

    } else if (request.url === '/edit_row') {
      edit_entry(entry.id, entry.name, entry.sub, entry.due)
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      response.end(JSON.stringify(appdata))
    }
    else {
      console.log( JSON.parse( dataString ) )
      // ... do something with the data here!!!

      entry.urgency = calc_urgency(entry.due, entry.subject)


      entry.id = curr_id++
      appdata.push(entry)
      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
      // change this to incorporate data
      response.end(JSON.stringify(appdata))
    }
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )

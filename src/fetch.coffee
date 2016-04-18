class Fetch
  json: (response) -> response.json()
  #request: new Request @address, method: "get"
  
  status: (response) ->
    if response.status in [200..300]
      Promise.resolve response
      console.log "1"
    else
      console.log "2"
      Promise.reject new Error response.statusText
  request: =>
    new Request @address,
      method: @method
  constructor: (@address, @method = "get", callback) ->
    #request = new Request '/api', method: method
    fetch @request()
      #.then @status
      .then @json
      .then (data) ->
        callback data
      .then null, (err) ->
        throw new Error err
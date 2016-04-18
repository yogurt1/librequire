class Require extends Fetch
  constructor: (@address, callback) ->
    @method = get
    #request = new Request '/api', method: method
    fetch @request()
      #.then @status
      .then (response) ->
        response.text()
      .then (data) ->
        callback data
      .then null, (err) ->
        throw new Error err
        
console.log require 'test'
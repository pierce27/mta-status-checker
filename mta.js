var http = require('http');
var sanitizeHtml = require('sanitize-html');
var parseString = require('xml2js').parseString;
var url = 'http://web.mta.info/status/serviceStatus.txt'

exports.status = function(request, response){

	var req = http.get(url, function(res) {
	  // save the data
	  var xml = '';
	  res.on('data', function(chunk) {
	    xml += chunk;
	  });

	  res.on('end', function() {
	    // parse xml
	    parseString(xml, function (err, result) {
	    	console.dir(result.service.bus[0].line);
	    	var buses = result.service.bus[0].line;

		    for(bus in buses){
		    	console.log(buses[bus].text[0])
		    	buses[bus].text[0] = sanitizeHtml(buses[bus].text[0]) 
		    	console.log(buses[bus].text[0])
		    }	    	

		    response.send(result.service.bus[0].line)
		});



	  });

	  // or you can pipe the data to a parser
	  
	});

	req.on('error', function(err) {
	  // debug error
	});

}
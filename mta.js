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
	    	// Create one array of all lines
	    	var data = {'timestamp':result.service.timestamp[0], 'lines':[]}
	    	data.lines = data.lines.concat(sanitize(result.service.subway[0].line, 'subway'));
	    	data.lines = data.lines.concat( sanitize(result.service.bus[0].line, 'bus'));
	    	data.lines = data.lines.concat(sanitize(result.service.BT[0].line, 'bt'));
	    	data.lines = data.lines.concat(sanitize(result.service.LIRR[0].line, 'lirr'));
	    	data.lines = data.lines.concat(sanitize(result.service.MetroNorth[0].line, 'mt'));
	    	

	    	// Send all mta lines to client side
		    response.send(data)

		});

	  });
	  
	});

	req.on('error', function(err) {
	  // send error
	  response.send(err)
	});
}

// Format array of lines to include type and sanitize html
var sanitize = function(lines, type){
    for(line in lines){
    	lines[line].text[0] = sanitizeHtml(lines[line].text[0]); 
    	lines[line].type = type;
    }

    return lines	
}
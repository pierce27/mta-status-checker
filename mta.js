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
	    	console.dir(result.service.LIRR[0].line);
	    	result.service.subway[0].line = sanitize(result.service.subway[0].line);
	    	result.service.bus[0].line = sanitize(result.service.bus[0].line);
	    	result.service.BT[0].line = sanitize(result.service.BT[0].line);
	    	result.service.LIRR[0].line = sanitize(result.service.LIRR[0].line);
	    	result.service.MetroNorth[0].line = sanitize(result.service.MetroNorth[0].line);

	    	// sanitize(subways)

		    // for(subway in subways){
		    // 	subways[subway].text[0] = sanitizeHtml(subways[subway].text[0]) 
		    // }		    

		    // for(bus in buses){
		    // 	buses[bus].text[0] = sanitizeHtml(buses[bus].text[0]) 
		    // }

		    // for(bus in buses){
		    // 	buses[bus].text[0] = sanitizeHtml(buses[bus].text[0]) 
		    // }

		    // for(bus in buses){
		    // 	buses[bus].text[0] = sanitizeHtml(buses[bus].text[0]) 
		    // }

		    // for(bus in buses){
		    // 	buses[bus].text[0] = sanitizeHtml(buses[bus].text[0]) 
		    // }		    		    

		    response.send(result.service)
		});



	  });

	  // or you can pipe the data to a parser
	  
	});

	req.on('error', function(err) {
	  // debug error
	});

}

var sanitize = function(lines){
    for(line in lines){
    	lines[line].text[0] = sanitizeHtml(lines[line].text[0]) 
    }

    return lines	
}
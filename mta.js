var http = require('http'),
	sanitizeHtml = require('sanitize-html'),
	parseString = require('xml2js').parseString,
	url = 'http://web.mta.info/status/serviceStatus.txt';

// Init count vars for stautus counts
var good = 0,
	delays = 0,
	planned = 0,
	changes = 0,
	suspended = 0,
	other = 0;


exports.status = function(request, response){

	// Get data from MTA site
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
	    	var data = {'timestamp':result.service.timestamp[0], 'counts':{'good': 0, 'delays':0, 'planned':0, 'changes':0, 'suspensions':0}, 'lines':[]}
	    	data.lines = data.lines.concat(sanitize(result.service.subway[0].line, 'subway'));
	    	data.lines = data.lines.concat( sanitize(result.service.bus[0].line, 'bus'));
	    	data.lines = data.lines.concat(sanitize(result.service.BT[0].line, 'bt'));
	    	data.lines = data.lines.concat(sanitize(result.service.LIRR[0].line, 'lirr'));
	    	data.lines = data.lines.concat(sanitize(result.service.MetroNorth[0].line, 'mt'));
	    	// Add counts of different status's to data object
	    	data.counts.good = good;
	    	data.counts.delays = delays;
	    	data.counts.changes = changes;
	    	data.counts.planned = planned;
	    	data.counts.suspended = suspended;
		    

	    	// Reset count vars
		    good = 0;
		    delays = 0;
		    planned = 0;
		    changes = 0;
		    suspensions = 0;
		    other = 0;	    	
	    	

	    	// Send all mta lines to client side
		    response.send(data);

		});

	  });
	  
	});

	req.on('error', function(err) {
	  // send error
	  response.send(err);
	});
}

// Format array of lines to include type and sanitize html
var sanitize = function(lines, type){
	
	// Loop through the lines and sanitize HTML as well as assign each one the proper type.
    for(line in lines){

    	var l = lines[line];

    	// Sanitize HTML
    	if(l.text){
    		l.text[0] = sanitizeHtml(l.text[0]); 
    	}

    	// Assignt type to type attr on line object
    	l.type = type;

    	// Increment status count
    	if(l.status[0] == 'GOOD SERVICE'){
    		good = good + 1;
    	} else if(l.status[0] == 'DELAYS'){
    		delays += 1;
    	} else if(l.status[0] == 'SERVICE CHANGE'){
    		changes += 1;
    	} else if(l.status[0] == 'PLANNED WORK'){
    		planned += 1;
    	} else if(l.status[0] == 'SUSPENDED'){
    		suspended += 1;
    	} else{
    		other += 1;
    	}

    	
    }
   
    

    return lines;	
}
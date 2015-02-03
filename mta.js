var http = require('http');
var sanitizeHtml = require('sanitize-html');
var parseString = require('xml2js').parseString;
var url = 'http://web.mta.info/status/serviceStatus.txt'

var good = 0;
var delays = 0;
var planned = 0;
var changes = 0;
var suspended = 0;	


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
	    	var data = {'timestamp':result.service.timestamp[0], 'counts':{'good': 0, 'delays':0, 'planned':0, 'changes':0, 'suspensions':0}, 'lines':[]}
	    	data.lines = data.lines.concat(sanitize(result.service.subway[0].line, 'subway'));
	    	data.lines = data.lines.concat( sanitize(result.service.bus[0].line, 'bus'));
	    	data.lines = data.lines.concat(sanitize(result.service.BT[0].line, 'bt'));
	    	data.lines = data.lines.concat(sanitize(result.service.LIRR[0].line, 'lirr'));
	    	data.lines = data.lines.concat(sanitize(result.service.MetroNorth[0].line, 'mt'));
	    	data.counts.good = good;
	    	data.counts.delays = delays;
	    	data.counts.changes = changes;
	    	data.counts.planned = planned;
	    	data.counts.suspended = suspended;
		    


		    good = 0;
		    delays = 0;
		    planned = 0;
		    changes = 0;
		    suspensions = 0;	    	
	    	

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

    	var l = lines[line];
    	// console.log(l.name)
    	// console.log(l.status)
    	// console.log('LINE NUMBER: ' + line)

    	if(l.text){
    		l.text[0] = sanitizeHtml(l.text[0]); 
    	}

    	l.type = type;

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
    	}

    	
    }
   
    

    return lines	
}
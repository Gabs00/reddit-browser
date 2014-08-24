var express = require('express');
var restler = require('restler');

var app = express.createServer(express.logger());
app.get('/', function(req, res, next){
  fs.readFile('index.html', function(data){
    res.send(data);
  });
});
app.all('/reddit', function(request, response) {
	restler.get('http://reddit.com/.json').on('complete', function(reddit) {
		var titles = "<Response>";
		for(var i=0; i<5; i++) {
			titles += "<div style='border: 1px solid red'>" + reddit.data.children[i].data.title + "</div>";
		}
		titles += "</Response>";
		response.send(titles);
	});
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
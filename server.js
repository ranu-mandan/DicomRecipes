var express = require("express");
var app = express();

// for CORS
// app.use(function(request, response, next) {
// 	  response.header("Access-Control-Allow-Origin", "*");
// 	  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	  next();
// });

//app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));


// app.get('/', function(request, response){
// 	//response.send('Hello world');
// 	response.write('Hello world');
// 	response.end();
// });

app.get('/search', function(request, response) {

    var Tags = [{
        'tag': '(0000,0000)',
        'vr': 'UL',
        'vm': '1',
        'name': 'CommandGroupLength'
    }, {
        'tag': '(0000,0001)',
        'vr': 'UL',
        'vm': '1',
        'name': 'CommandLengthToEnd'
    }, {
        'tag': '(0000,0002)',
        'vr': 'UI',
        'vm': '1',
        'name': 'AffectedSOPClassUID'
    }, {
        'tag': '(0000,0003)',
        'vr': 'UI',
        'vm': '1',
        'name': 'RequestedSOPClassUID'
    }, {
        'tag': '(0000,0010)',
        'vr': 'SH',
        'vm': '1',
        'name': 'CommandRecognitionCode'
    }];

    //response.json(Tags);
    //console.log(Tags, 'tags found');

    setTimeout(function() {
        response.json(Tags);
        console.log(Tags, 'tags found');
    }, 2000);

});

app.listen(3000, function() {
    console.log('listening on port 3000');
});
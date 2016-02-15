var http = require('http');
var controller = require('./library/controller.js');
var server = http.createServer(controller);
server.listen(process.env.OPENSHIFT_NODEJS_PORT||process.env.PORT||8080||4000||3333||6666,process.env.OPENSHIFT_NODEJS_IP);
console.log(server.on('error',function (argument) {
	console.log(argument,'====argument');
}),'===========');

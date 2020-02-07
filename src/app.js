//1.   Importing section
var http = require('http');
var fs = require('fs');


//2.    Creating a server with a callback function    
var server = http.createServer(function (req, resp) {
    
    
    //3. Providing a route to send the HTML page as response
    if (req.url === "/create") {
        fs.readFile("./src/index.html", function (error, pgResp) {
            if (error) {
              console.log('error')
                resp.writeHead(404);
                resp.write('Contents you are looking are Not Found');
            } else {
               console.log('send')
                resp.writeHead(200, { 'Content-Type': 'text/html' });
                resp.write(pgResp);
            }
             
            resp.end();
        });
    } else {
           console.log('other url')
        
        //4.  If the above specified url is not found, then send the following response.
        resp.writeHead(200, { 'Content-Type': 'text/html' });
        resp.write('<h1>Welcome</h1>');
        resp.end();
    }
});


//5.  Make the server listen to the port number 5050
server.listen(5050);
 
console.log('Server Started listening on 5050');

module.exports = server;
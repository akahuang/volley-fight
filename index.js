var fs = require('fs');
var http = require('http');
var mime = require('mime');
var path = require('path');

var cache = {};

function send404(response) {
  console.log('Send 404');
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: resouce not found');
  response.end();
}

function sendFile(response, file_path, file_content) {
  console.log('Send file: %s', file_path);
  response.writeHead(200, {'Content-Type': mime.lookup(path.basename(file_path))});
  response.end(file_content);
}

function serveStatic(response, file_path, cache) {
  console.log('serveStatic: %s', file_path);
  if (cache[file_path]) {
    sendFile(response, file_path, cache[file_path]);
  } else {
    fs.exists(file_path, function(is_exist) {
      if (!is_exist) {
        send404(response);
      } else {
        fs.readFile(file_path, function(err, data) {
          if (err) {
            send404(response);
          } else {
            cache[file_path] = data;
            sendFile(response, file_path, data);
          }
        });
      }
    });
  }
}

var server = http.createServer(function (request, response) {
  var file_path = './public/' + (request.url == '/' ? 'index.html' : request.url);
  serveStatic(response, file_path, cache);
});
server.listen(3000, function() {
  console.log('Server listening on port 3000');
});

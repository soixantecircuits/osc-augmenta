var osc = require('node-osc'),
  config = {
    oscServer: {
      address: '0.0.0.0',
      port: 8080
    },
    socketioServer: {
      port: 3300
    }
}
oscServer = new osc.Server(config.oscServer.port, config.oscServer.address),
app = require('http').createServer(handler),
io = require('socket.io')(app),
fs = require('fs');

console.log('goto : http://localhost:' + config.socketioServer.port);

app.listen(config.socketioServer.port);

function handler(req, res) {
  fs.readFile(__dirname + '/index.html',
    function(err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200);
      res.end(data);
    });
}

io.on('connection', function(socket) {
  console.log('client connected.');
});

var checkPath = function() {
  var data = {};
  switch (path) {
    case "/au/personEntered":
    case "/au/personWillLeave":
    case "/au/personUpdated":
      data = {
        pid: msg[1],
        oid: msg[2],
        age: msg[3],
        centroid: {
          x: msg[4],
          y: msg[5]
        },
        velocity: {
          x: msg[6],
          y: msg[7]
        },
        depth: msg[8],
        boundingRect: {
          x: msg[9],
          y: msg[10],
          width: msg[11],
          height: msg[12]
        },
        highest: {
          x: msg[13],
          y: msg[14],
          z: msg[15]
        }
      };
      break;
    case "/au/scene":
      data = {
        currentTime: msg[1],
        percentCovered: msg[2],
        numPeople: msg[3],
        averageMotion: {
          x: msg[4],
          y: msg[5]
        },
        scene: {
          width: msg[6],
          height: msg[7],
          depth: msg[8]
        }
      };
      break;
    default:
      console.log("Sorry, we do not know " + path + ".");
  }
  return data;
}

oscServer.on("message", function(msg, rinfo) {
  var path = msg[0],
    data = {};
    
  console.log(msg);
  //console.log(msg);
  //console.log(path);

  data = checkPath(msg);

  io.sockets.emit(path, data);
});
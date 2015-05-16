var osc = require('node-osc'),

  serveStatic = require('serve-static'),
  config = {
    oscServer: {
      address: '0.0.0.0',
      port: 8080
    },
    socketioServer: {
      port: 3300
    }
  },
  oscServer = new osc.Server(config.oscServer.port, config.oscServer.address),
  finalhandler = require('finalhandler'),
  http = require('http'),
  serveStatic = require('serve-static'),


  serve = serveStatic(__dirname, {
    'index': ['index.html', 'index.htm']
  });

// Create server
var server = http.createServer(function(req, res) {
  var done = finalhandler(req, res)
  serve(req, res, done)
})
var io = require('socket.io')(server);
// Listen
server.listen(config.socketioServer.port);
console.log('app runing on http://localhost:' + config.socketioServer.port);

/*-----------*/

function stripTrailingSlash(str) {
  if (str.substr(-1) == '/') {
    return str.substr(0, str.length - 1);
  }
  return str;
}

io.on('connection', function(socket) {
  console.log('client connected.');
});

var checkPath = function(path, msg) {
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
  // patch because for unknow reason, it is not decoded normally.
  // with simulator augmenta it works OOTB.

  if (msg[0] == '#bundle') {
    msg = msg[2];
  }
  var path = stripTrailingSlash(msg[0]),
    data = {};
  //console.log(msg);
  //console.log(path);

  data = checkPath(path, msg);

  io.sockets.emit(path, data);
});
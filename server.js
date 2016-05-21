var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var BASE_URL = 'https://hopit.herokuapp.com/';
//var BASE_URL = 'http://hop-lodfs.c9users.io/';
function randomStr(s) {
    return Math.round((Math.pow(36, s + 1) - Math.random() * Math.pow(36, s))).toString(36).slice(1);
}

var delMessages = {};

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));


app.post("/newHop", function (req, res) {
    var key = randomStr(5);
    delMessages[key] = [];
    console.log('Made Key ' + key);
    res.send(`<!DOCTYPE html>
    <html>
    <head>
    <title>New Hop</title>
    <link rel='stylesheet' href='./public/css/styles.css'/>
    </head>
    <body>
    <div class='text-center centered'>
    <h3 id='delUrl'>
    <a href='` + BASE_URL +  key + `' target='_blank'>` +  key + `</a>
    </h3>
    <button class="btn btn-outline" data-clipboard-text='` + BASE_URL +  key + `'>Copy To Clipboard</button>
    </div>
    <footer id="footer">
        Made with <span id="heart" class="animate pulse">&#9825;</span> By <a href="http://kingpixil.github.io/Me" target="_blank">Kabir</a>
    </footer>
    <script src='./public/js/lib/clipboard.min.js'></script>
    <script src='./public/js/loader.js'></script>
    <script src='./public/js/scripts.js'></script>
    </body>
    </html>`);
});

app.get("/:index", function (req, res) {
    var index = req.params.index;
    if(delMessages[index] != undefined) {
    res.send(`<!DOCTYPE html>
    <html>
    <head>
    <title>Hop</title>
    <link rel='stylesheet' href='./public/css/styles.css'/>
    </head>
    <body>
    <ul id="messages"></ul>
    <form id="hopNameForm" class="text-center centered">
        <input autocomplete="off" id="hopName" type="text" placeholder="Your Username"/>
    </form>
    <form id="hopChatForm">
      <input autocomplete="off" id="hopChatMes" placeholder="Your message"/><button class="btn btn-outline">Send</button>
    </form>
    <script src="/socket.io/socket.io.js"></script>
    <script src="./public/js/lib/paint.min.js"></script>
    <script src='./public/js/hop.js'></script>
    <script src='./public/js/scripts.js'></script>
    </body>
    </html>`);
    } else {
        res.send(`<!DOCTYPE html><html><head><title>404</title><link rel='stylesheet' href='./public/css/styles.css'/></head><body><div class='text-center centered animate fadeIn'><h1>404</h1><br><img id="frown" src='http://emojipedia-us.s3.amazonaws.com/cache/9e/ed/9eed096cb7f1adf49b7495df19945d15.png'/></div></body></html>`);
    }
});
io.on('connection', function(socket){
    socket.on('hop message', function(data){
        io.emit('hop message', {msg: data.msg, name: data.name});
    });
});



http.listen(process.env.PORT, function (req, res) {
    console.log("Listening");
});

const express = require('express');
const app = express();
const http = require('http').createServer(app);
app.use(express.static('public'));
const io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('A Lister connected');

    socket.on('start_List',function(lister){
        console.log('Welcome: ' + lister);
        io.emit('start_List', lister);
    });

    socket.on('add_Item',function(add){
        console.log('Item added' + add);
        io.emit('add_Item', add);
    });

    socket.on('claim',function(move){
        console.log('Item Claimed' + move);
        io.emit('claim', move);
    });

    socket.on('leave_List', function(lister){
        console.log(lister + ' disconnected');
        io.emit('leave_List', lister);
    });
});

http.listen(process.env.PORT || 3000, function(){
    console.log('Waiting for Listers ');
});
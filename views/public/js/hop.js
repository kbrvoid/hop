var socket = io();
var name;

document.getElementById("hopNameForm").addEventListener("submit", function(e) {
    if (document.getElementById("hopName").value.match(/^\s*$/)) {
         name = "Anonymous";
    } else {
        name = document.getElementById("hopName").value;
    }
    $("#hopNameForm").addClass("animate");
    $("#hopNameForm").addClass("fadeOut");
    $("#hopChatForm").addClass("animate");
    $("#hopChatForm").addClass("fadeIn");
    e.preventDefault();
});

document.getElementById("hopChatForm").addEventListener("submit", function(e) {
    socket.emit("hop message", {msg:document.getElementById("hopChatMes").value, name: name});
    document.getElementById("hopChatMes").value = '';
    e.preventDefault();
});


socket.on('hop message', function(data){
    var li = document.createElement('li');
    document.getElementById('messages').appendChild(li);
    li.innerText = data.name + ' - ' + data.msg;
});
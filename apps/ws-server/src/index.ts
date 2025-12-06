import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port: 8080})

wss.on("connection", (socket)=> {
    socket.send("websocket connection success");

    socket.on("message", (data)=> {
        const parseData = JSON.parse(data.toString());
        if(parseData.message == "hello"){
            socket.send("bye");
            return
        }

        socket.send("tata");
    })
})
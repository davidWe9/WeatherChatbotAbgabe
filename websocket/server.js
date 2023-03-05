const WebSocket = require(`ws`);
const wss = new WebSocket.Server({port: 8080})
const axios = require('axios');

wss.on("connection", ws => {
    console.log("New client connected!");
    ws.on("message", data => {
        //console.log(`Client has sent us:${data}`);
        axios.post('http://localhost:5005/webhooks/rest/webhook', {
            message: data.toString()
        })
            .then(function (response) {
                console.log(response.config.data);
                ws.send(response.data[0].text);
            })
            .catch(function (error) {
                console.log(error)
            });
    })
    ws.on("close", () => {
        console.log("Client has disconnected");
    })
})



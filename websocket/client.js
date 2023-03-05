let output = '';
let inputText='';

function clientconnect(text) {
const ws = new WebSocket("ws://localhost:8080");


  ws.addEventListener("open", () => {
    console.log("WebSocket connection established");
    ws.send(text)
    ws.addEventListener("message", (e) => {
      console.log("Received data:", e.data);
      output = e.data;
      console.log("Output value:", output);
    });
  });

  ws.addEventListener("error", (error) => {
    console.error("WebSocket error:", error);
  });

  ws.addEventListener("close", () => {
    console.log("WebSocket connection closed");
  });
}

function setinputText(text){
  inputText = text;
}

export {clientconnect, output, setinputText}








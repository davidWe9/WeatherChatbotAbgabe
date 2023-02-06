const ws = new WebSocket("ws://localhost:8080");


class Chatbox {

    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')

        }

        this.state = false;
        this.messages = [];
    }


    display() {
        const {openButton, chatBox, sendButton} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if (this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }


    onSendButton(chatbox) {
        const textField = chatbox.querySelector('input');
        const text1 = textField.value;
        if (!text1) return;

        const msg1 = {name: 'user_uttered', message: text1};
        ws.send(text1);
        this.messages.push(msg1);

        const handleMessage = e => {
            console.log(e)
            const msg2 = {name: 'bot_uttered', message: e.data};
            this.messages.push(msg2);
            this.updateChatText(chatbox);
            textField.value = '';

            if (e.data === 'Das Wetter in Stuttgart ist:') {
                const weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=2825297&appid=e3b561757bafc55f9075e613caf26f7b';
                fetch(weatherUrl, {method: 'GET', headers: {}})
                    .then(res => res.json())
                    .then(data => {
                        const output = `${data.list[data.list.length - 1].weather[0].description}
                        Temperatur: ${data.list[data.list.length - 1].main.temp / 100}°C
                        Gefühlt wie: ${data.list[data.list.length - 1].main.feels_like / 100}°C\n`;

                        const msg3 = {name: 'bot_uttered', message: output};
                        this.messages.push(msg3);
                        this.updateChatText(chatbox);
                    })
                    .catch(error => console.error('Error', error));
            }
            //durch = false;
            ws.removeEventListener('message', handleMessage);
        };
        ws.addEventListener('message', handleMessage);
    }

    updateChatText(chatbox) {
        let html = '';
        this.messages.slice().reverse().forEach(function (item, index) {
            if (item.name === "bot_uttered") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            } else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}


const chatbox = new Chatbox();
chatbox.display();
import {clientconnect, output, setinputText} from "./client.js";



class Chatbox{

    constructor() {

        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),



        }

        this.state = false;
        this.aktive = true;
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
            if(this.aktive) {

            setTimeout(() => {
   let msg = {name: 'bot_uttered', message: 'Hallo'};
    document.getElementsByClassName('typingIndicatorContainer')[0].style.visibility = 'hidden';
                this.messages.push(msg);
                this.updateChatText(chatbox);

            }, 3000)
                this.aktive = false;
            }


        } else {
            chatbox.classList.remove('chatbox--active')

        }
    }

    onSendButton(chatbox) {
document.getElementsByClassName('typingIndicatorContainer')[0].style.visibility = 'visible';
        const textField = chatbox.querySelector('input');
        const text1 = textField.value;

        if (!text1) return;
        let msg1 = {name: 'user_uttered', message: text1};
        clientconnect(text1)
        this.messages.push(msg1);


    setTimeout(() => {
            let msg2 = {};

            if (output=== 'Das Wetter in Stuttgart ist:') {

                const weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=2825297&appid=e3b561757bafc55f9075e613caf26f7b';
                fetch(weatherUrl, {method: 'GET', headers: {}})
                    .then(res => res.json())
                    .then(data => {
                        const output = this.getFormatedTemp(data);

                        msg2 = {name: 'bot_uttered', message: output};
                        this.messages.push(msg2);
                        this.updateChatText(chatbox);
                        textField.value = '';


                    })
                    .catch(error => console.error('Error', error));


            } else {

              msg2 = {name: 'bot_uttered', message: output};
              this.messages.push(msg2);
              this.updateChatText(chatbox);
              textField.value = '';
              document.getElementsByClassName('typingIndicatorContainer')[0].style.visibility = 'hidden';

            }
   }, 3000)
        document.getElementsByClassName('typingIndicatorContainer')[0].style.visibility = 'visible';
    }




    getFormatedTemp(data) {
        console.log([data])
        return `In Stuttgart sind es ${Math.round((data.list[0].main.temp)-273.15)}°C
                        Gefühlt wie: ${Math.round((data.list[0].main.feels_like)-273.15)}°C\n`;
    }




        getFormatedWeather(data) {
        console.log([data])
        return `In Stuttgart sind es: ${data.list[0].weather[0].description}
        
                        Temperatur: ${Math.round((data.list[0].main.temp)-273.15)}°C
                        Gefühlt wie: ${Math.round((data.list[0].main.feels_like)-273.15)}°C\n`;
    }

    updateChatText(chatbox) {
        let html = '';



        this.messages.slice().reverse().forEach(function (item) {
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
import {clientconnect, output, setinputText} from "./websocket/client.js";
import {OpenWeather, WeatherDataForecast, WeatherDataToday, WeatherData7days} from "./openWeather.js";
// @author David Wentsch, Simon Briem, Lukas Hüttl
OpenWeather.setDataForecast();
OpenWeather.setWeatherDataToday();

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
        //first message
            setTimeout(() => {
   let msg = {name: 'bot_uttered', message: 'Hey, ich bin Sam 😎' +'<br>'+
           'Frag mich etwas über das Wetter'};
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
        this.updateChatText(chatbox);
        textField.value = '';



    setTimeout(() => {

       let msg = this.setOutput(output);

            let msg2 = {};
                        msg2 = {name: 'bot_uttered', message: msg};
                        this.messages.push(msg2);
                        this.updateChatText(chatbox);
                        textField.value = '';

            document.getElementsByClassName('typingIndicatorContainer')[0].style.visibility = 'hidden';

   }, 3000)
        document.getElementsByClassName('typingIndicatorContainer')[0].style.visibility = 'visible';
    }

    setOutput(output){
        switch (output) {
            case "Das Wetter wird morgen:":
                return WeatherDataForecast
                break;
            case "Das Wetter in Stuttgart ist:":
                return WeatherDataToday
                break;
            case "Das Wetter wird nächste Woche:":
                return WeatherData7days
            default:
                return output;

        }
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
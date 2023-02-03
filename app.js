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

        var textField = chatbox.querySelector('input');
        let output = ''

        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let msg1 = {name: "user_uttered", message: text1}
        this.messages.push(msg1);

        fetch('http://localhost:5005/webhooks/rest/webhook', {
            method: 'POST',
            body: JSON.stringify({message: text1}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json()
        })
            .then(data => {

                output = data[0].text
                console.log(typeof(data[0].text))

                    console.log(output)
                  if (output === 'Hey! How are you?') {
                      fetch("http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=e3b561757bafc55f9075e613caf26f7b", {
                          method: "GET",
                          headers: {}
                      })
                          .then(res => res.json())

                          .then(data => {

                              output += JSON.stringify(data.list[0].main.temp)

                              let msg2 = {name: "bot_uttered", message: output}
                      this.messages.push(msg2)
                      this.updateChatText(chatbox)
                      textField.value = ''

                          })



                  }
            })
            .catch(error => console.error('Error'))






    }

    updateChatText(chatbox) {
        var html = '';
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
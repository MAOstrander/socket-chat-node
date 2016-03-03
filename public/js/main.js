;(function () {
  'use strict';

  const ws = io.connect();
  ws.on('connect', () => {
    console.log("Signature socket, you're ready to rock-it");
  });

  ws.on('receiveChat', (msg) => {
    displayChat(msg.target, msg.myMessage);
  });

  const myForm = document.querySelector('form');
  const target = document.querySelector("input[name='target'");
  const myMessage = document.querySelector("input[name='message'");
  const ul = document.querySelector('ul')

  myForm.addEventListener('submit', () => {
    const [ n, t ] = [ target.value, myMessage.value ]
    ws.emit('sendChat', {
      target: n,
      myMessage: t
    })

    displayChat(n, t);
    event.preventDefault();
  })

  function displayChat (name, text) {
    const li = generateLI(name, text);

    target.value = '';
    myMessage.value = '';
    ul.appendChild(li);
  }

  function generateLI (name, text) {
    const li = document.createElement('li')
    const textNode = document.createTextNode(`${name}: ${text}`);

    li.appendChild(textNode);
    return li;
  }

}());


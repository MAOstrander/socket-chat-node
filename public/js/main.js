;(function () {
  'use strict';

  const ws = io.connect();
  ws.on('connect', () => {
    console.log("Signature socket, you're ready to rock-it");
  });

  ws.on('receiveChat', (msgs) => {
    msgs.forEach(displayChat);
  });

  const myForm = document.querySelector('form');
  const sender = document.querySelector("input[name='sender'");
  const mymessage = document.querySelector("input[name='message'");
  const ul = document.querySelector('ul')

  myForm.addEventListener('submit', () => {
    const chat = {
      sender:sender.value,
      mymessage: mymessage.value
    };
    ws.emit('sendChat', chat);

    // displayChat(chat);
    event.preventDefault();
  })

  function displayChat (chat) {
    if (!document.querySelector(`[data-id="${chat._id}"]`)) {
      const li = generateLI(chat)

      ul.appendChild(li)
    }
    mymessage.value = '';
  }

  function generateLI (chat) {
    const li = document.createElement('li')
    const textNode = document.createTextNode(`${chat.sender}: ${chat.mymessage}`);
    const dataId = document.createAttribute('data-id');
    dataId.value = chat._id;

    li.setAttributeNode(dataId);
    li.appendChild(textNode);
    return li;
  }

  function getJSON(url, cb) {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = () => {
      cb(JSON.parse(request.responseText))
    };
    request.send();
  }

  // document.addEventListener('DOMContentLoaded', () => {
  //   getJSON('/chats', (chats) => {
  //     chats.forEach(chat => displayChat(chat))
  //   })
  // })

}());

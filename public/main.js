const socket = io()

const clientTotal = document.getElementById('client-total');
const SmsCont = document.getElementById("massage-container");
const nameInput = document.getElementById("name-input");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("massage-input");


messageForm.addEventListener("submit" , (e) =>
{
    e.preventDefault();
    sendMessage();
})

socket.on("client-total" , (data) => {
    clientTotal.innerText = `Total Client ${data}`;
})
socket.on("client-total" , (data) => {
    clientTotal.innerText = `Total Client ${data}`;
})

function sendMessage()
{
    console.log(messageInput.value)
    const data = 
    {
        name : nameInput.value,
        message : messageInput.value,
        datatime : new Date()
    }
    socket.emit("message" , data)
    AddMsgToUI(true ,data)
    messageInput.value = ""
};

socket.on("chat-message" , (data) =>
{
    console.log(data)
    AddMsgToUI(false , data)
})


function AddMsgToUI(isOwn , data)
{
    const ele = `
    <li class="${isOwn ? "massage-right"  :"massage-left "}">
                <p class="message">
                    ${data.message}
                    <span>${data.name} ⚪  </span>
                </p>
            </li>`

            SmsCont.innerHTML += ele
}
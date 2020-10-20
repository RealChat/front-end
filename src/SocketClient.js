class SocketClient{
    constructor(){
        // let scr = document.createElement("script");
        // scr.src = "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.1/socket.io.js"
        // document.body.appendChild(scr);
        this.socket = window.io("http://localhost:9008");
        this.socket.on("connect",e=>{
            this.onConnect();
            this.onMessage();
        })
        // scr.onload = ()=>{
        // }
    }
    onConnect(){
        // alert("Connected to backend");
    }
    onMessage(){
        this.socket.on("sentMessage",(data)=>{
            console.log("RECEIVED",data);
        })
    }
    sendMessage(message){
        this.socket.emit("message",{text:message})
    }
}

export default new SocketClient().socket;
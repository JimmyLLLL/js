const dgram = require('dgram')
let udpClient = dgram.createSocket('udp4')

udpClient.on('close', () => {
    console.log('udp client closed.')
})

// 错误处理
udpClient.on('error', () => {
    console.log('some error on udp client.')
})

// 接收消息
udpClient.on('message', (message, rinfo) => {
    console.log(`receive message from ${rinfo.address}: ${rinfo.port}: ${message}`)
})

// 定时向服务器发送消息
setInterval(() => {
    const sendStr = 'hello.'
    const sendStrLen = sendStr.length
    udpClient.send(sendStr, 0, sendStrLen, 5678, '172.30.20.10')
}, 3000)
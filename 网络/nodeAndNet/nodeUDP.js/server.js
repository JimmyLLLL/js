const dgram = require('dgram')

// 创建 UDP server
let udpServer = dgram.createSocket('udp4')
// 绑定端口
udpServer.bind(5678)

// 监听端口
udpServer.on('listening', () => {
    console.log('udp server linstening 5678.')
})

//接收消息
udpServer.on('message', (message, rinfo) => {
    const messageStr = message.toString()
    udpServer.send(messageStr.toString(), 0, messageStr.length, rinfo.port, rinfo.address)
    console.log(`udp server received data: ${messageStr} from ${rinfo.address}:${rinfo.port}`)
})

//错误处理
udpServer.on('error', err => {
    console.log('some error on udp server.')
    udpServer.close()
})
//基于TCP数据通信

const net = require('net')

const server = net.createServer(socket => {
	console.log('客户端已经链接')
    console.log(socket.address())
})

server.listen('8080', () => {
    /* 获取地址信息，得到的是一个json { address: '::', family: 'IPv6', port: 8000 } */
    const address = server.address()

    /* TCP 服务器监听的地址 */
    console.log(`the port of server is ${address.port}`)

    /* IPv6 还是 IPv4 */
    console.log(`the family of server is ${address.family}`)
})

server.getConnections((err,count) => {
    console.log(`已经链接 ${count} 个用户`)
})

server.maxConnections = 2
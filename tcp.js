import net from 'net';

const server = net.createServer(c => {
    console.log('got c');
});

server.listen(23045, '0.0.0.0', () => {
    console.log('start');
})

server.on('connection', c =>{
    console.log('connection from', c.address());

    c.on('data', d => {
        console.log(c.address(), 'sent', d);
    })
})
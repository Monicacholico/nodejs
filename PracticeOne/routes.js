const fs = require('fs');

const reqHandler= ((req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/') {
        res.setHeader('content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Greeting Page</title></head>')
        res.write(
            `<body>
            <h1>This is a greeting! How are you doing?</h1>
            <form action="/create-user" method="POST">
            <input type="text" name="user">
            <button type="submit">Username</button>
            </form>
            </body>`);
        res.write('</html>');
        return res.end();
    }
    if(url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            console.log(chunk);
            body.push(chunk);
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const user = parsedBody.split('=')[1];
            console.log(user);
            fs.writeFile('userText.txt', user, err => {
                res.writeHead(302, {
                    Location: '/'
                });
                return res.end();
            })
        });
    }
    if(url === '/users'){
        res.setHeader('content-Type', 'text/html');
        res.write('<html>');
        res.write(`
        <body>
            <ul>
                <li>User 1</li>
                <li>User 2</li>
                <li>User 3</li>
            </ul>
        </body>`);
        res.write('</html>');
        return res.end();
    }

})

exports.handler = reqHandler;
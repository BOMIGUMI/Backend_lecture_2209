const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const member = [{uid:'james', pwd:'1111',name:'제임스'},
                {uid:'maria', pwd:'2222', name:'마리아'}]

const server = http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    let method = req.method;
    switch(pathname) {
    case '/input':
        if (method === 'GET') {         // 입력양식 화면을 사용자에게 보여줌
            fs.readFile('view/12.form.html', 'utf8', (err, html) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(html);
            });
        } else {        // method기 POST인 경우 => 입력 데이터 처리
            let body = '';
            req.on('data', data => {
                body += data;
            });
            req.on('end', () => {
                let param = qs.parse(body);
                //console.log(param);
                //console.log(param.uid, param.pwd); // name으로 정의 되어있음.
                res.end(`<h1>UID: ${param.uid}, PWD: ${param.pwd}</h1>`);
                // 입력 데이터로 필요한 작업을 수행 : 예) 로그인
                // 다음 작업을 위한 화면을 보내줌
            });
        }
        break;
    default:
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end();   
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
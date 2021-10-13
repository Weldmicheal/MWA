var http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

http.createServer(function(req, res){
    console.log("req.method", req.method);
    console.log("req.url", req.url);
    const page = req.url 
    var pageNum = -1;
    const queryString = url.parse(req.url, true).query.page


    const callBack = function(err, data){
        if(err){
            console.log(err);
        }else{
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            return res.end()
        }
    }

    if(queryString){
        console.log("query available", queryString);
        pageNum = parseInt(queryString)

        switch(pageNum){
            case 1:
                fs.readFile( path.join(__dirname, 'public', 'page1.html'), callBack)
                break;
            case 2:
                fs.readFile( path.join(__dirname, 'public', 'page2.html'), callBack)
                break;
            case 3:
                fs.readFile( path.join(__dirname, 'public', 'page3.html'), callBack)
                break
            default:
                fs.readFile('index.html', callBack)

        }
    }else{
        switch(page){
            case '/page1.html':
                fs.readFile( path.join(__dirname, 'public', 'page1.html'), callBack)
                break;
            case '/page2.html':
                fs.readFile(path.join(__dirname, 'public', 'page2.html'), callBack)
                break;
            case '/page3.html':
                fs.readFile(path.join(__dirname, 'public', 'page3.html'), callBack)
                break;
            case '/index.html':
            default:
                fs.readFile('index.html', callBack)
        }  
    }
    

   

   
}).listen(4444)
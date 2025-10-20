const fileSystem = require('fs')
fileSystem.appendFileSync('results.json', 
    'Testing write into a file'
)
const os = require('os')

console.log(os.cpus())
const totalmem = os.totalmem()

if (totalmem > 9000000000){
    console.log('This server resources is enough')
}else{
    console.log('This server resource is just too low')
}

const path = require('path');
console.log(path.dirname(__filename))

console.log('Hello')
const ans = 5 + 2
fileSystem.readFile('test.txt', 'utf8', (err, fileContent) => {
    if(err){
        console.log("Problem occured while reading file")
        return;
    }
    console.log('success');
    console.log(fileContent)
})


// calculete
// create process to write result in a file
// call mr olumide

const olumidScore = 2+8
const danScore = 2+9

fileSystem.writeFileSync('results.json', 
    JSON.stringify({olumidScore, danScore})
)

console.log(JSON.parse('{"olumidScore":10,"danScore":11}'))
fileSystem.writeFile(
    'file2.json', 
    JSON.stringify({olumidScore, danScore}), 
    'utf8', 
    () => console.log('Just finished writing new file')
)

console.log('Calling Olumid')

const http = require('http')

const server = http.createServer((req, res)=> {

    const endpoint = req.url;
    switch (endpoint) {
        case '/':
            res.write("Hello My Endpoint Caller")
            res.end()
            break;

        case '/about':
            res.write("This is about page")
            res.end() 
            break;
               
        default:
            res.write('API endpoint is not found')
            res.end()
            break;
    }
})

server.listen(4500, ()=>{
    console.log('App is up and running at port 3000')
})
const express = require("express")
const path = require("path")
const app = express()

app.set("port", 3000)


app.use("/images", function(req, res, next){
    console.log(req.method, req.url)
    next()
})

app.use(express.static(path.join(__dirname,'public')))


// access using localhost:3000/public or localhost:3000/public/index.html
//app.use("/public", express.static(path.join(__dirname,'public')))

// app.get("/", function(req, res){
//     console.log("req received!")

//     // Using absolute path
//     //res.sendFile("C:/MIU/MWA/MWA/Practice/MEANApp/public/index.html")
//     console.log(__dirname)
//     //console.log(__dirname+"\\public\\index.html")
//     //res.sendFile(__dirname+"\\public\\index.html")
    
//     // Using path
//     res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'))

    
// })

const server = app.listen(app.get("port"), function(){
    const port = server.address().port
    console.log("Listening on: ", port)
})
const fs = require("fs")
let words = fs.readFileSync(`words.txt`, "utf-8");
const lines = words.split(/\r?\n/);
var unirest = require('unirest');
lines.forEach(function(line,index,collection) {
    setTimeout(() => {
    var req = unirest('POST', 'https://api.minehut.com/server/YOURSERVERNAME/change_name')
    .headers({
      'content-type': 'application/json',
      'Authorization': 'YOURTOKEN',
      'x-session-id': 'YOURSESSION'
    })
    .send(JSON.stringify({"name": line}))
    .end(function (res) { 
      if (res.error){}
      try{
      if(res.raw_body.includes("That name is already in use! Please pick another name.")){
          return console.log(line + ": already in use smh")
      } else {
          if(res.raw_body.includes("error")){
            console.log(res.raw_body)
              fs.appendFile('./unknown_errors.txt', `WORD: ${line} ERROR: ${res.raw_body}` + '\n', (err) => {
                  if (err) throw err;
              })
              return
          }
          fs.appendFile('./WORKINGnames.txt', line + '\n', (err) => {
              if (err) throw err;
              console.log(`[ADDED NAME] ${line}`)
              console.log(res.raw_body)
          })
      }
    }
    catch(error){
        console.log(error)
    }
    });

    }, index * 100)
})

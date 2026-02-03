//app.js
//es5 syntax => import express from 'express'
//we are in es6
import express from 'express'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const readFile = FileSystem.readFile('.')
let myVar = 'demo purposes only';

//middlewares aka endpoints aka 'get to slash' {http verb} to slash {you name your endpoint}
app.post('api/body', (req, res) => {
  //res.send('Hello Express')
  //res.sendfile('index.html')
  res.sendFile(join(__dirname, 'public', 'barry.html')) 

})

//start the server. 
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
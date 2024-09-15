const express = require('express')
const app = express()
const port = 3000
app.get('/', (req, res) => {
    res.send('Hello World from YAT DEPI! YAT 225 with Build Number TEST WEB HOOK')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

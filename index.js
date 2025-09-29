const express = require('express');
const app = express()
const port = process.env.PORT || 3000;

app.get('/', (req,res) => {
    res.send('user management system')
})

app.listen(port, () => {
    console.log(`user has been successfull:${port}`)
})
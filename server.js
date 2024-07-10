const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello word!')
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')))

// https://docs.google.com/document/d/19z913LVtDRj6j5_ehT3MiPNx3TUikRAtIKuZfYlE_qo/edit
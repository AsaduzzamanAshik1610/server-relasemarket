const express = require('express');
const cors = require ('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Hellow seller server side')
});

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
})

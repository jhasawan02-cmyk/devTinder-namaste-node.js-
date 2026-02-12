const express = require("express");

const app = express();



app.use("/conatct",(req,res) => {
    res.send("hello from  the server  from conatct page page!");
});

app.use("/test",(req,res) => {
    res.send("hello from  the server  from test page!");
});
app.use("/conatct",(req,res) => {
    res.send("hello from  the server  from contact page!");
});

app.use("/", (req,res) => {
    res.send("hello from  the server home  page!");
});

app.listen(7777, () => {
    console.log(`server is running na dlistening from port : 7777`);
})
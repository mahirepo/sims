const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3000;
const DEVICE = "IFE";

var ID = {
    "id": 1,
    "name": DEVICE,
    "description": "Ethernet interface for LV breaker",
    "FwRev": 1.0,
    "HwRev": 1.0,
    "UserAppName": "",
    "Manufacurer": "Schneider-electric"   
};

var STATUS = {
    "CommStatus": "OK",
    "OpenConnections": 10,
    "Breaker": "NA",
    "BreakerId":0  
};

app.get("/", (req, res) => {
    res.send(DEVICE + " simulator(virtual device) is running on port " + PORT);
});
app.get("/identification", (req, res) => {
    res.json(ID);
});

app.get("/status", (req, res) => {
    res.json(STATUS);
});

app.get("/time", (req, res) => {
    res.send("Time in " + DEVICE + ": " + new Date().toDateString());
});

app.post("/identification", (req, res) => {
    const name = req.body.UserAppName;
    if (name != undefined) {
        ID.UserAppName = name;
        res.send("update success!");
    }else{
        res.send("Invalid parameter!");
    }
});

app.post("/status", (req, res) => {
    const value = req.body.BreakerId;
    if (value != undefined) {
        STATUS.BreakerId = value;
        STATUS.Breaker="Connected";

        setTimeout(function () {
            res.send("update success!");
        }, 2000);        
    }else{
        res.send("Inavlid parameter!");
    }
});

app.get("/close", (req, res) => {
    process.exit();
});

const start = async () => {

    app.listen(3000, () => {
        console.log(DEVICE + " simulator(virtual device) is running on port " + PORT);

    });

};

start();
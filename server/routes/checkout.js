const express = require("express");
const app = express.Router();
const db = require("../db");

/*
For checkout page:
    Inital loading page:
        - Need orderid passed in
        - Pass back ordering entity 

    Submit button:
        - TODO: Insert into checkout        
        - TODO: Update amount in inventory table 
*/

/*
Get ordering information for specific order 
To call: http://localhost:3500/api/checkout/getOrder
*/
app.get("/getOrder", async (req, res) => {
    try {
        const { orderid } = req.body;
        const todo = await db.query(
            "SELECT * FROM ordering WHERE orderid = $1",
            [orderid]
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/*
Insert checkout information for specific order 
To call: http://localhost:3500/api/checkout/postCheckout
*/
app.post("/postCheckout", async (req, res) => {
    try {
        const { paymentmethod, amount, cardnumber, orderid } = req.body;

        const todo = await db.query(
            "INSERT INTO public.checkout(paymentmethod, amount, cardnumber, orderid) VALUES ($1, $2, $3, $4)",
            [paymentmethod, amount, cardnumber, orderid]
        );

        console.log(todo.rows);
        // res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = app;

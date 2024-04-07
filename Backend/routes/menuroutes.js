const express = require("express")

const router = express.Router()

router.get("/menu" , (req, res)=>{
    res.send([{
        name : "Fish curry",
        price : "20$",
    }])
})


module.exports = router
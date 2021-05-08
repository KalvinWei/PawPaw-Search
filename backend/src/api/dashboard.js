import express from "express"
import getDashboard from "../DAO/dashboardDAO";

const dashboard = express()

dashboard.get('/',async (req,res)  =>{
    const dashboard = await getDashboard()
    res.send(dashboard)
})

export default dashboard;
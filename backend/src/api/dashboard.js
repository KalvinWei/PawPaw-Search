import express from "express"
import getDashboard from "../DAO/dashboardDAO";

const dashboard = express()

dashboard.get('/',async (req,res)  =>{
    //TODO: API-B6
    // let dashboard = {
    //     userTotal:531,
    //     foundTotal:870,
    //     lostTotal:920,
    //     reunionTotal:235,
    //     foundToday:67,
    //     lostToday:82,
    //     reunionToday:3
    // }
    //TODO use DAO operations to replace below.
    const dashboard = await getDashboard()
    res.send(dashboard)
})

export default dashboard;
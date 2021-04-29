import User from "../db/schemas/UserSchema";
import Post from "../db/schemas/PostSchema";

export default async function getDashboard(){
    let dashboard = {
        userTotal:0,
        foundTotal:0,
        lostTotal:0,
        reunionTotal:0,
        foundToday:0,
        lostToday:0,
        reunionToday:0
    }

    dashboard.userTotal = await User.countDocuments()
    dashboard.foundTotal = await Post.countDocuments({status:'Found'})
    dashboard.lostTotal = await Post.countDocuments({status:'Lost'})
    dashboard.reunionTotal = await Post.countDocuments({status:'Reunited'})

    const today = new Date()
    today.setHours(0,0,0,0)
    dashboard.foundToday = await Post.countDocuments({status:'Found',createAt:{$gte:today}})
    dashboard.lostToday = await Post.countDocuments({status:'Lost',createAt:{$gte:today}})
    dashboard.reunionToday = await Post.countDocuments({status:'Reunited',createAt:{$gte:today}})
    return dashboard
}
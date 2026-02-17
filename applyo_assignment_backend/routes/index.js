import express from "express"
import pollrouter from "./pollroute.js"
import voterouter from "./voteroute.js"
const index_router=express.Router()

index_router.use("/pollcreate",pollrouter)
index_router.use("/vote",voterouter)


export default index_router
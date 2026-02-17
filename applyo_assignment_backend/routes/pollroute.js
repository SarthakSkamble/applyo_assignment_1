import express from "express"
import createPoll from "../controllers/pollcreate.js"
const pollrouter= express.Router()

pollrouter.post("/",createPoll)

export default pollrouter
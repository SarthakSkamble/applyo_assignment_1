import express from "express"
import votePoll from "../controllers/votecreate.js"
import getPoll from "../controllers/getpoll.js"

const voterouter=express.Router()

voterouter.post("/voteforpoll/:pollId",votePoll)
voterouter.get("/:pollId", getPoll);

export default voterouter
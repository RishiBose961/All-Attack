import express from "express";
import { CardAvlVulnerable, CreateTransactionVulnerable,getTransactionsBySender } from "../controller/card.controller.js";
const router = express.Router();


router.get("/getcard", CardAvlVulnerable);

router.post("/createtransaction-vulnerable", CreateTransactionVulnerable);

router.get("/getcard/:senderCardId", getTransactionsBySender);

export default router;

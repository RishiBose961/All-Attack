import express from "express";
import { checkEmailExistsVulnerable, getUserByIdVulnerable, loginUserVulnerable, registerUser, searchUsersVulnerable,updateNameVulnerable } from "../controller/user.controller.js";
import { uploadCardCsv } from "../script/Uploadscript.js";
import upload from "../script/middleupload.js";
const router = express.Router();


router.post("/register", registerUser);

router.post("/login-vulnerable", loginUserVulnerable);

router.get("/search-vulnerable", searchUsersVulnerable);

router.put("/update-name-vulnerable", updateNameVulnerable);

router.get("/get-user-by-id-vulnerable/:id", getUserByIdVulnerable);

router.post("/check-email-exists-vulnerable", checkEmailExistsVulnerable);

// router.post(
//   "/cards/upload-csv",
//   upload.single("file"),
//   uploadCardCsv
// );

export default router;

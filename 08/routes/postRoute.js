const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController.list);           //리스트
router.get("/:id", postController.get);         //상세조회
router.post("/", postController.create);        //등록
router.put("/:id", postController.update);      //수정
router.delete("/:id", postController.remove);   //삭제

module.exports = router;
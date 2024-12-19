const express = require("express");
const router = new express.Router();
const todoController = require("../controller/todoController");
const upload = require("../multerconfig/admin/adminStorageConfig");

// router.post("/additems",upload.single("blogHeadingImage"),todoController.AddItems);
router.post("/additems", upload.fields([
    { name: "blogHeadingImage", maxCount: 1 },
    { name: "blogWriterImage", maxCount: 1 }
  ]), todoController.AddItems);
router.get("/gettodoitems", todoController.GetTodoItems);
router.delete("/deleteitems/:itemid", todoController.DeleteItems);
// router.put("/updateitems/:itemid",upload.single("blogHeadingImage"),todoController.UpdateItem); 
router.put("/updateitems/:itemid", upload.fields([
    { name: "blogHeadingImage", maxCount: 1 },
    { name: "blogWriterImage", maxCount: 1 }
  ]), todoController.UpdateItem);
router.get("/editItem/:itemid", todoController.getItemByid); // Add this line

module.exports = router;

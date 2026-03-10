
                     const express = require("express");
const router = express.Router();
const upload=require("../middleware/upload")
const { sendMessage, loginUser,getMessages,deleteMessage,addSkill,getSkills,deleteSkill,addProject,getProjects,deleteProject
    ,getProfile,updateProfile


 } = require("../controller/Controller");



router.post("/login", loginUser); // ✅ NO ()

router.post("/add-skill", addSkill);
router.get("/skills", getSkills);
router.delete("/delete-skill/:id", deleteSkill);

router.post("/add-project", addProject);
router.get("/projects", getProjects);
router.delete("/delete-project/:id", deleteProject);


const protect = require("../middleware/authMiddleware");


router.get("/profile", getProfile);

router.put(
  "/update-profile",
  upload.single("profileImage"),
  updateProfile
);

router.post("/send", sendMessage);


// 🔒 Protected routes
router.get("/messages", protect, getMessages);
router.delete("/message/:id", protect, deleteMessage);

module.exports = router;
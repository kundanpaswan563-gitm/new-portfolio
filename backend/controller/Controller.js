

const nodemailer = require("nodemailer");
const Message = require("../model/messageSchema");

const User = require("../model/userSchema");  
const bcrypt = require("bcryptjs");          
const jwt = require("jsonwebtoken");          
// Nodemailer transporter with TLS fix
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // false for port 587
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS, // App Password
  },
  tls: {
    rejectUnauthorized: false, // Fix self-signed certificate error
  },
});

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // 1️⃣ Save message to MongoDB
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // 2️⃣ Send email notification
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "New Contact Message",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    // 3️⃣ Respond with success
    res.status(200).json({
      success: true,
      message: "Message sent successfully ✅",
    });
  } catch (error) {
    console.log(error); // Print full error for debugging
    res.status(500).json({
      success: false,
      message: "Something went wrong ❌",
    });
  }
};
// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    // 2️⃣ Compare password with hashed password in Atlas
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // 3️⃣ Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  }catch (error) {
  console.log("LOGIN ERROR:", error);
  res.status(500).json({ message: error.message });
}
};

// GET ALL MESSAGES (For Dashboard)
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      messages
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
// DELETE MESSAGE
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    await Message.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Message Deleted Successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const Skill = require("../model/skillSchema");

// ADD SKILL
exports.addSkill = async (req, res) => {
  try {

    const skill = new Skill(req.body);

    await skill.save();

    res.json({ message: "Skill Added", skill });

  } catch (error) {
    res.status(500).json(error);
  }
};


// GET SKILLS
exports.getSkills = async (req, res) => {
  try {

    const skills = await Skill.find();

    res.json(skills);

  } catch (error) {
    res.status(500).json(error);
  }
};


// DELETE SKILL
exports.deleteSkill = async (req, res) => {

  try {

    await Skill.findByIdAndDelete(req.params.id);

    res.json({ message: "Skill Deleted" });

  } catch (error) {
    res.status(500).json(error);
  }

};
const Project = require("../model/projectSchema");

// add project
exports.addProject = async (req,res)=>{
  const project = new Project(req.body);
  await project.save();
  res.json(project);
};

// get projects
exports.getProjects = async (req,res)=>{
  const projects = await Project.find();
  res.json(projects);
};

// delete project
exports.deleteProject = async (req,res)=>{
  await Project.findByIdAndDelete(req.params.id);
  res.json({message:"Deleted"});
};

const Profile = require("../model/profileSchema");

exports.getProfile = async (req, res) => {

  const profile = await Profile.findOne();
  res.json(profile);

};
exports.updateProfile = async (req, res) => {

  const { name, heroTitle, heroLine1, heroLine2, description } = req.body;

  let imageName = "";

  if (req.file) {
    imageName = req.file.filename;
  }

  const profile = await Profile.findOneAndUpdate(
    {},
    {
      name,
      heroTitle,
      heroLine1,
      heroLine2,
      description,
      profileImage: imageName
    },
    { new: true, upsert: true }
  );

  res.json(profile);
};
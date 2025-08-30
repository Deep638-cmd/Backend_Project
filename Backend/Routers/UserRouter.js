import express from "express"
const router=express.Router();
import item from "../Models/UserModel.js"
import {verify,generate} from "../Authentication.js"
router.post("/register", async (req, res) => {
  try {
    console.log("📩 Received body:", req.body);
res.send("Ayan")
    const { name, email, number, password, Cpassword } = req.body;

    // 1️⃣ Check confirm password
    if (password !== Cpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // 2️⃣ Create new user
    const newUser = new item({ name, email, number, password });

    // 3️⃣ Save to DB (hashing handled in schema pre-save hook)
    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: savedUser,
    });

  } catch (err) {
    console.log("❌ Error in register:", err);

    // Handle duplicate email/mobile errors
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email or Mobile already exists" });
    }

    res.status(500).json({ error: "Server error, please try again" });
  }
});


router.post("/login",async(req,res)=>{  // Login
    try{
        const {email,password}=req.body;
const user=await item.findOne({email: email});
// res.send("Deep")
if(!user){
    
    console.log("User is not found")
}
if(!(await user.comparePassword(password))){
   return console.log("password Not match");
}
const payload=user.id;
console.log(payload)
 const token = generate(payload.toString());
console.log("The token is: "+token);
if(user){
  res.status(201).json({
    msg:"Login succesfully",
    tokens: token,
    UserId: user.id.toString()
  })

}
else{
res.status(500).json({err: "Invalid Something"})
}
    }
    catch(err){
        console.log(err)
        res.status(500).json({err: "Bhulbhal"})
    }
})
router.get("/me", verify, async (req, res) => {
  try {
    const user = await item.findById(req.userId).select("email name");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "There is an Internet issue" });
  }
});
router.put("/change",async(req,res)=>{
    
})



export default router;
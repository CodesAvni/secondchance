import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import {
  updateUserProfile,
  getUserProfile,
} from "../controllers/profile.controller";
import { prisma } from "../utils/prisma";
import {upload} from "../middleware/upload";
const router = Router();

router.get("/", protect, getUserProfile);
router.put("/", protect, updateUserProfile);
router.post(
"/resume",protect,
upload.single("resume"),

async(req:any,res)=>{

try{

console.log("RESUME ROUTE HIT");
console.log(req.file);
console.log(req.user);

const userId =
req.user.userId;
if(!req.file){

return res.status(400).json({

message:"No file uploaded",

});

}



const profile = await prisma.profile.upsert({

where:{
  userId:userId
},

update:{
  resumeUrl:req.file.path
},

create:{
  userId:userId,
  resumeUrl:req.file.path
}

});


return res.json({

message:"Resume uploaded successfully",profile

});


}
catch(error){

console.log("RESUME ERROR:",error);


return res.status(500).json({

message:"Resume upload failed"

});


}


}

);

export default router;
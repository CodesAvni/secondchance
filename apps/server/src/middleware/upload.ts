import multer from "multer";


const storage = multer.diskStorage({

destination:(req,file,cb)=>{

cb(null,"uploads/");

},


filename:(req,file,cb)=>{

cb(
null,
Date.now()+"-"+file.originalname
);

}

});



export const upload = multer({

storage,

fileFilter:(req,file,cb)=>{


if(file.mimetype !== "application/pdf"){

return cb(
new Error("Only PDF allowed")
);

}


cb(null,true);


}

});
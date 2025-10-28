import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL });

const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: "blog" },
});

export const upload = multer({ storage });

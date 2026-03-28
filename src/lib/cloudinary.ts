import { Cloudinary } from "@cloudinary/url-gen";

export const myCld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },
});

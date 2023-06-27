import { axiosInstance } from "@refinedev/simple-rest";
import { UploadFile } from "antd/lib/upload";
import { API_URL } from "pages/_app";

// This function doesnot provide an accurate publicId for urls with nested folders
const getPublicIdFromURL = (url: string) => {
  const splitUrl = url.split("/"); // split the url into an array

  // get the publicId from the url (banners/344856823748.jpg)
  const imageId = splitUrl[splitUrl.length - 1];
  const imageFolder = splitUrl[splitUrl.length - 2];
  const publicId = `${imageFolder}/${imageId}`;

  return publicId.split(".")[0];
};

export const handleFileRemove = (
  file: UploadFile<any>
): boolean | Promise<boolean> => {
  const url = file?.response?.url;
  if (!url) {
    return true;
  }

  let publicId = getPublicIdFromURL(url);
  return axiosInstance.delete(`${API_URL}/image?publicId=${publicId}`);
};

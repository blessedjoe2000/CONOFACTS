async function uploadImage(image) {
  const CLOUD_NAME = "dpn75vlns";
  const UPLOAD_PRESET = "conofacts";
  if (!image) return;

  const formData = new FormData();

  formData.append("file", image);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );

    const data = await response.json();
    const imageUrl = data["secure_url"];

    return imageUrl;
  } catch (error) {
    console.log(error);
  }
}

export default uploadImage;

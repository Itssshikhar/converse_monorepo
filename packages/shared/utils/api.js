const uploadAudio = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
  
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/upload-audio`, {
      method: "POST",
      body: formData,
    });
    return response.json();
  };
  
  export default uploadAudio;
  
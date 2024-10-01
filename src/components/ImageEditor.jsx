import Cropper from "react-easy-crop";
import { useState, useCallback } from "react";

const ImageEditor = ({
  picture,
  setPicture,
  setUser,
  setError,
  setLoading,
  showAlert,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null); // Store the image URL
  const [croppedImage, setCroppedImage] = useState(null); // Store the cropped image

  // Open modal
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  // Convert the uploaded file to a URL
  const handleImageUpload = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file); // Convert to URL
      setPicture(file);
      setImageSrc(imageUrl); // Set the image URL for the Cropper
    } else {
      setPicture(null);
      setImageSrc(null); // Clear image if no file is selected
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Function to generate the cropped image
  const getCroppedImg = async () => {
    try {
      const image = new Image();
      image.src = imageSrc;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const { width, height } = croppedAreaPixels;
      canvas.width = width;
      canvas.height = height;

      image.onload = () => {
        const { x, y } = croppedAreaPixels;
        ctx.drawImage(
          image,
          x, // source x
          y, // source y
          width, // source width
          height, // source height
          0, // destination x
          0, // destination y
          width, // destination width
          height // destination height
        );
        const base64Image = canvas.toDataURL("image/jpeg");
        setCroppedImage(base64Image); // Set the cropped image
        handleCloseModal();
      };
    } catch (e) {
      console.error("Error cropping image: ", e);
    }
  };

  // Handle picture submit with cropped image
  const handlePictureSubmit = async () => {
    const token = localStorage.getItem("token")?.replace(/['"]+/g, "");
    if (!token) {
      setError("No token found, user is not authenticated");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    if (croppedImage) {
      // Convert base64 cropped image to Blob and append to formData
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      formData.append("profilePic", blob, "croppedImage.jpg");
    } else {
      formData.append("profilePic", picture);
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/user/profile/picture", {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const errorData = await res.text(); // Define errorData to hold the error response
        showAlert("error", "Profile picture upload failed.");
        throw new Error(errorData.error || "Profile picture upload failed."); // Use errorData for error messages
      }
      const data = await res.json();
      setUser(data.user);
      setPicture(data.profilePic);
      showAlert("success", "Profile Picture successfully created");
    } catch (error) {
      console.error("Error creating profile picture:", error);
    } finally {
      setLoading(false); // End loading
      handleCloseModal(); // Close the modal after submission
    }
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button onClick={handleOpenModal}>Edit Image</button>

      {/* Modal content */}
      {isOpen && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="">
              {imageSrc ? (
                <Cropper
                  image={imageSrc} // Use the image URL
                  crop={crop}
                  zoom={zoom}
                  aspect={4 / 4}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              ) : (
                <p>Please upload an image.</p>
              )}
            </div>
            <div className="controls">
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => {
                  setZoom(e.target.value);
                }}
                className="zoom-range"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="text-xs"
              />
            </div>

            {/* Action buttons */}
            <div className="flex justify-between mt-4">
              <button onClick={handleCloseModal} className="btn-cancel">
                Cancel
              </button>
              <button onClick={getCroppedImg} className="btn-crop">
                Crop
              </button>
              <button onClick={handlePictureSubmit} className="btn-submit">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display cropped image */}
      {croppedImage && (
        <div>
          <h3>Cropped Image:</h3>
          <img src={croppedImage} alt="Cropped" />
        </div>
      )}
    </div>
  );
};

export default ImageEditor;

import { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./utils/cropImage";
import { Cancel, Save } from "@mui/icons-material";

const CropEasy = ({ picture, setOpenCrop, setPicture }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    try {
      const { file } = await getCroppedImg(
        picture,
        croppedAreaPixels,
        rotation
      );
      setPicture(file); // Set the cropped file in the parent state
      setOpenCrop(false); // Close the crop modal
    } catch (e) {
      console.error("Error while cropping:", e);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gray-800 p-4 rounded-md shadow-lg max-w-[600px] h-[550px] w-[90%]">
        {/* Cropper - Ensuring it occupies full space above the controls */}
        <div className="relative w-full h-80">
          <Cropper
            image={picture} // Use the image to crop
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={1}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropChange={setCrop}
            onCropComplete={cropComplete}
            className="rounded-md absolute inset-0" // Cover the area of the parent
          />
        </div>

        {/* Controls - buttons and sliders */}
        <div className="flex flex-col items-start mt-4">
          <div className="mb-2 w-full">
            {" "}
            {/* Full width container */}
            <span className="text-white">Zoom: {Math.round(zoom * 100)}%</span>
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full mt-1 accent-blue-500" // Full width slider
            />
          </div>
          <div className="mb-4 w-full">
            {" "}
            {/* Full width container */}
            <span className="text-white">Rotation: {rotation}°</span>
            <input
              type="range"
              min="0"
              max="360"
              value={rotation}
              onChange={(e) => setRotation(parseInt(e.target.value))}
              className="w-full mt-1 accent-blue-500" // Full width slider
            />
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition"
              onClick={() => setOpenCrop(false)}
            >
              <Cancel className="inline mr-1" /> Cancel
            </button>
            <button
              className="bg-gradient-to-r from-cyan-500 to-teal-400 text-white py-2 px-4 rounded-lg text-base"
              onClick={cropImage}
            >
              <Save className="inline mr-1" /> Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropEasy;

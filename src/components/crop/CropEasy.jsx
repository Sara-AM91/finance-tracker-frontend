import { useState } from "react";
import Cropper from "react-easy-crop";
import {
  Box,
  DialogActions,
  DialogContent,
  Slider,
  Typography,
  Button,
} from "@mui/material";
import { Cancel, Save } from "@mui/icons-material";
import getCroppedImg from "./utils/cropImage";

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
      const { file, url } = await getCroppedImg(
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
    <>
      <DialogContent
        dividers
        sx={{
          background: "#333",
          position: "relative",
          height: 400,
          width: "auto",
          minWidth: { sm: 500 },
        }}
      >
        {picture && (
          <Cropper
            image={URL.createObjectURL(picture)}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={1}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropChange={setCrop}
            onCropComplete={cropComplete}
          />
        )}
      </DialogContent>
      <DialogActions sx={{ flexDirection: "column", mx: 3, my: 2 }}>
        <Box sx={{ width: "100%", mb: 1 }}>
          <Box>
            <Typography>Zoom: {Math.round(zoom * 100)}%</Typography>
            <Slider
              valueLabelDisplay="auto"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </Box>
          <Box>
            <Typography>Rotation: {rotation + "°"}</Typography>
            <Slider
              valueLabelDisplay="auto"
              min={0}
              max={360}
              value={rotation}
              onChange={(e, rotation) => setRotation(rotation)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<Cancel />}
            onClick={() => setOpenCrop(false)}
          >
            Cancel
          </Button>
          <Button variant="contained" startIcon={<Save />} onClick={cropImage}>
            Save
          </Button>
        </Box>
      </DialogActions>
    </>
  );
};

export default CropEasy;

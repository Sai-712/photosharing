// components/UploadImage.js
import { useState } from "react";
import axios from "axios";

export default function UploadImage() {
    const [image, setImage] = useState(null);
    const [qrCode, setQrCode] = useState("");

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", image);

        const response = await axios.post("/api/upload-image", formData);
        setQrCode(response.data.qrCode);
    };

    return (
        <div className="p-5">
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
            {qrCode && <img src={qrCode} alt="QR Code" />}
        </div>
    );
}

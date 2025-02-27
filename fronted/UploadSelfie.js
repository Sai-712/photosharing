// components/UploadSelfie.js
import { useState } from "react";
import axios from "axios";

export default function UploadSelfie({ qrCode }) {
    const [selfie, setSelfie] = useState(null);
    const [matchedImages, setMatchedImages] = useState([]);

    const handleSelfieUpload = async () => {
        const formData = new FormData();
        formData.append("file", selfie);
        formData.append("qrCode", qrCode);

        const response = await axios.post("/api/upload-selfie", formData);
        setMatchedImages(response.data.images);
    };

    return (
        <div>
            <input type="file" onChange={(e) => setSelfie(e.target.files[0])} />
            <button onClick={handleSelfieUpload}>Upload</button>
            {matchedImages.length > 0 && matchedImages.map((img) => <img key={img} src={img} alt="Matched" />)}
        </div>
    );
}

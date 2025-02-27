// components/ScanQR.js
import { useState } from "react";
import QrReader from "react-qr-reader";

export default function ScanQR({ onScan }) {
    const handleScan = (data) => {
        if (data) {
            onScan(data);
        }
    };

    return (
        <div>
            <QrReader delay={300} onScan={handleScan} />
        </div>
    );
}

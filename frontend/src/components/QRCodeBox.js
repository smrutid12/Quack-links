// src/components/QRCodeBox.jsx
import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeBox({ value }) {
  const qrRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!value) return null;

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "quacklink-qr.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="ql-qr-box">
      <button
        type="button"
        className="ql-qr-toggle"
        onClick={() => setOpen((current) => !current)}
      >
        <span>▦</span>
        {open ? "Hide QR code" : "Create QR code"}
      </button>

      {open && (
        <div className="ql-qr-content">
          <div className="ql-qr-preview" ref={qrRef}>
            <QRCodeCanvas
              value={value}
              size={156}
              bgColor="#ffffff"
              fgColor="#1a1a1a"
              level="H"
              includeMargin
            />
          </div>

          <div className="ql-qr-info">
            <div className="ql-qr-title">QR ready to share 🦆</div>
            <p>
              Scan this QR code to open your QuackLink instantly on any device.
            </p>

            <div className="ql-qr-actions">
              <button type="button" onClick={handleDownload}>
                Download PNG
              </button>

              <button type="button" onClick={handleCopyLink}>
                {copied ? "Copied ✓" : "Copy link"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
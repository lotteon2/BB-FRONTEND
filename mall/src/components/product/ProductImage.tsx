/* eslint-disable */
import { useRef, useState } from "react";
import styled from "styled-components";
import { position } from "stylis";
interface param {
  src: string;
  alt: string;
}
interface position {
  left: number;
  top: number;
  size: number;
}

interface zoom {
  src: string;
  position: position;
  left: number;
  size: number;
}

const ScannerStyle = styled.span<position>`
  position: absolute;
  top: ${(position: position) => position.top}px;
  left: ${(position: position) => position.left}px;
  width: ${(size: position) => size.size / 2}px;
  height: ${(size: position) => size.size / 2}px;
  border: 1px solid #c2dabc;
  background-color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
`;

const ZoomStyle = styled.div<zoom>`
  position: absolute;
  z-index: 100;
  top: 0px;
  left: ${(prop: zoom) => prop.left}px;
  width: ${(prop: zoom) => prop.size}px;
  height: ${(prop: zoom) => prop.size}px;
  background-image: url(${(prop: zoom) => prop.src});
  background-repeat: no-repeat;
  background-position: ${(prop: zoom) => prop.position.left}px
    ${(prop: zoom) => prop.position.top}px;
  background-size: 200% 200%;
`;

export default function ProductImage(param: param) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [scannerPosition, setScannerPosition] = useState<position | null>(null);
  const [viewPosition, setViewPosition] = useState<position>({
    left: 0,
    top: 0,
    size: 0,
  });

  const handleMouseEvent = (e: React.MouseEvent) => {
    if (imageRef.current) {
      const imageWidth = imageRef.current.width;
      const imageHeight = imageRef.current.height;
      const scannerWidth = imageWidth / 2;
      const scannerHeight = imageHeight / 2;

      const scannerPosLeft = e.clientX - scannerWidth / 2 - imageRef.current.x;
      const scannerPosTop = e.clientY - scannerHeight / 2 - imageRef.current.y;

      const allowedPosLeft =
        scannerPosLeft >= 0 && scannerPosLeft <= imageWidth - scannerWidth;
      const allowedPosTop =
        scannerPosTop >= 0 && scannerPosTop <= imageHeight - scannerHeight;

      const scannerPosition = {
        left: 0,
        top: 0,
        size: imageRef.current.width / 2,
        isHidden: true,
      };

      if (allowedPosLeft) {
        scannerPosition.left = scannerPosLeft;
      } else {
        if (scannerPosLeft < 0) {
          scannerPosition.left = 0;
        } else {
          scannerPosition.left = imageRef.current.width - scannerWidth;
        }
      }

      if (allowedPosTop) {
        scannerPosition.top = scannerPosTop;
      } else {
        if (scannerPosTop < 0) {
          scannerPosition.top = 0;
        } else {
          scannerPosition.top = imageRef.current.height - scannerHeight;
        }
      }

      setScannerPosition(scannerPosition);
      setViewPosition({
        left: scannerPosition.left * -2,
        top: scannerPosition.top * -2,
        size: imageRef.current.width,
      });
    }
  };

  const handleMouseLeave = () => {
    setScannerPosition(null);
  };

  return (
    <div
      onMouseMove={handleMouseEvent}
      onMouseLeave={handleMouseLeave}
      className="w-[33vw] h-[33vw] max-w-[440px] max-h-[440px] min-w-[370px] min-h-[370px]"
    >
      <img
        src={param.src}
        alt={param.alt}
        ref={imageRef}
        className="w-full h-full"
      />

      {imageRef.current && scannerPosition && (
        <div>
          <ScannerStyle
            left={scannerPosition.left}
            top={scannerPosition.top}
            size={imageRef.current.width}
          />
          <ZoomStyle
            src={param.src}
            position={viewPosition}
            left={imageRef.current.width + 20}
            size={imageRef.current.width}
          />
        </div>
      )}
    </div>
  );
}

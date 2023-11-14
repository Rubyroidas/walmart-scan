import React, {FC, useEffect, useRef, useState} from "react";
import Tesseract from 'tesseract.js';
import styled from "@emotion/styled";

type Props = {
    imageUrl: string;
    boxes?: Tesseract.Bbox[] | null;
}

export const Canvas = styled.canvas`
  height: 100vh;
  width: 100vw;
`;
export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
`;

export const ScanPreview: FC<Props> = ({imageUrl, boxes}) => {
    const canvas = useRef<HTMLCanvasElement | null>(null);
    const image = useRef<HTMLImageElement | null>(null);
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);
    
    useEffect(() => {
        if (!canvas.current) {
            return;
        }
        
        if (imageUrl && !(imageWidth || imageHeight)) {
            image.current = new Image();
            image.current.addEventListener('load', () => {
                setImageWidth(image.current!.naturalWidth);
                setImageHeight(image.current!.naturalHeight);
                canvas.current!.width = image.current!.naturalWidth;
                canvas.current!.height = image.current!.naturalHeight;
            });
            image.current.src = imageUrl;
            return;
        }
        
        const ctx = canvas.current.getContext('2d');
        if (!ctx) {
            return;
        }

        ctx.clearRect(0, 0, imageWidth, imageHeight);
        ctx.drawImage(image.current!, 0, 0);
        
        if (!boxes) {
            return;
        }
        
        for (const box of boxes) {
            ctx.fillStyle = 'rgba(255, 128, 128, 0.5)';
            ctx.fillRect(box.x0, box.y0, box.x1 - box.x0 + 1, box.y1 - box.y0 + 1);
        }
    }, [imageUrl, imageWidth, imageHeight, boxes]);
    
    return (
        <Wrapper>
            <Canvas ref={canvas}/>
        </Wrapper>
    );
};

import React, {useRef} from "react";
import {Camera} from "@capacitor/camera";
import {CameraResultType} from "@capacitor/camera/dist/esm/definitions";

export const App = () => {
    const image = useRef<HTMLImageElement | null>(null);
    
    const handleScanClick = async () => {
        if (!image.current) {
            return;
        }
        try {
            const photo = await Camera.getPhoto({
                resultType: CameraResultType.Uri,
            });
            
            if (!photo.webPath) {
                return;
            }

            image.current.src = photo.webPath;
        } catch (e) {
            console.warn('User cancelled', e);
        }
    }

    
    return (
        <div>
            <h1>My App</h1>
            <button onClick={handleScanClick}>scan</button>
            <img ref={image}/>
        </div>
    );
}



import React, {useState} from 'react';
import {Camera} from '@capacitor/camera';
import {CameraResultType} from '@capacitor/camera/dist/esm/definitions';
import Tesseract from 'tesseract.js';

import {Loading, Button, Title, Wrapper, UpcListWrapper, UIWrapper} from './App.styles';
import {recognizeTextFromImage} from '../ocr';
import {loadUpcData} from '../walmartApi';
import {ScanPreview} from './ScanPreview';

const UpcList = ({list}: {list: string[]}) => (
    <UpcListWrapper>
        <div>UPCs list:</div>
        <ul>
            {list.map(upc => (
                <li key={upc}>{upc}</li>
            ))}
        </ul>
    </UpcListWrapper>
);

const initialUpcList = [...new Set([
    "188781000060",
    "188781000060",
    "188781000060",
    "064420010040",
    "059631823150",
    "681131628680",
    "062913734280",
    "047400663770",
    "047400663770",
    "066013143600",
    "033383671010",
    "000000947590",
    "033383651010",
    "000000041630",
    "628915409190",
    "041598000460",
    "000000034380",
    "037000937550",
    "037000979490",
    "064767343110",
    "000000046880",
    "057836021170",
    "057836021890",
    "063435710230",
    "063435710230",
    "770981092510"
])];

export const App = () => {
    const [imageUrl, setUmageUrl] = useState<string | null>(null);
    const [inProgress, setInProgress] = useState(false);
    const [processingProgress, setProcessingProgress] = useState(0);
    const [upcList, setUpcList] = useState<null | string[]>(null);
    const [highlightBoxes, setHighlightBoxes] = useState<null | Tesseract.Bbox[]>(null);
    
    const handleScanClick = async () => {
        if (inProgress) {
            return;
        }
        try {
            const photo = await Camera.getPhoto({
                resultType: CameraResultType.Uri,
            });
            
            if (!photo.webPath) {
                return;
            }

            setInProgress(true);
            setUmageUrl(photo.webPath);
            const recognizeResult = await recognizeTextFromImage(photo.webPath, m => {
                console.log(m);
                setProcessingProgress(m.progress);
            });
            console.log(recognizeResult);
            const text = recognizeResult.data.text;
            console.log(text);
            const highlightBlocks = recognizeResult.data.lines.map(line => line.bbox);
            console.log(highlightBlocks);
            setHighlightBoxes(highlightBlocks);
            const upcs = [...new Set([...text.matchAll(/\d{12}/g)].map(r => r[0]))];
            console.log(upcs);
            setUpcList(upcs);
            setInProgress(false);
        } catch (e) {
            console.warn('User cancelled', e);
        }
    };
    const handleLoadData = async () => {
        if (!upcList || upcList.length === 0) {
            return;
        }
        console.log('loading data for upcs...', upcList);
        const upc = upcList[0];
        const walmartItemData = await loadUpcData(upc);
        console.log(walmartItemData);
    };
    const intProgress = Math.floor(processingProgress * 100);
    
    return (
        <Wrapper>
            {imageUrl && (
                <ScanPreview imageUrl={imageUrl} boxes={highlightBoxes}/>
            )}
            <UIWrapper>
                <Title>Walmart receipt scanner</Title>
                <Button onClick={handleScanClick}>📷</Button>
                {upcList && (
                    <Button onClick={handleLoadData}>⏬</Button>
                )}
                {inProgress && (<Loading>
                    Recognizing... {intProgress}%
                </Loading>)}
                {upcList && (
                    <UpcList list={upcList}/>
                )}
            </UIWrapper>
        </Wrapper>
    );
}



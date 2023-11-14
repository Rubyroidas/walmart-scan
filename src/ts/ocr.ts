import {createWorker, LoggerMessage, RecognizeResult} from "tesseract.js";

export const recognizeTextFromImage = async (url: string, logger: (arg: LoggerMessage) => void): Promise<RecognizeResult> => {
    const worker = await createWorker('eng', undefined, {
        logger
    });

    await worker.load();
    const result = await worker.recognize(url);
    await worker.terminate();
    return result;
}
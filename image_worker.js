import sharp from 'sharp';
import { parentPort, workerData } from 'worker_threads';

sharp(workerData.buffer) 
  .resize(workerData.width, workerData.height) 
  .jpeg() 
  .toBuffer()
  .then((resizedBuffer) => {
    console.log('Resized image buffer size:', resizedBuffer.length); 
    parentPort.postMessage(resizedBuffer); 
  })
  .catch((err) => {
    console.error('Error during image resizing:', err);
    parentPort.postMessage(null); 
  });

import express from "express";
import multer from "multer";
import { Worker } from "worker_threads";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const upload = multer({ storage: multer.memoryStorage() }).single("file");

app.post("/resize", upload, (req, res) => {
  const { file, body } = req;

  if (!file) {
    return res.status(400).send("No file uploaded");
  }

  const width = parseInt(body.width) || 300;
  const height = parseInt(body.height) || 300;

  console.log("Received file for resizing, width:", width, "height:", height);

  const worker = new Worker("./image_worker.js", {
    workerData: {
      buffer: file.buffer,
      width: width,
      height: height,
    },
  });

  worker.on("message", (resizedBuffer) => {
    if (resizedBuffer) {
      res.writeHead(200, {
        "Content-Type": "image/jpeg",
        "Content-Length": resizedBuffer.length,
        "Content-Disposition": 'inline; filename="resized.jpg"',
      });
      res.end(Buffer.from(resizedBuffer));
    } else {
      res.status(500).send("Error processing image"); 
    }
  });

  worker.on("error", (err) => {
    console.error("Worker error:", err);
    res.status(500).send("Error processing image");
  });

  worker.on("exit", (code) => {
    if (code !== 0) {
      console.error(`Worker stopped with exit code ${code}`);
      res.status(500).send("Worker failed to complete");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

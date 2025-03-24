# Image Resizing API

A Node.js-based image resizing API that processes image uploads, resizes them, and returns the resized image. The API supports handling multiple image formats, and it utilizes **worker threads** to process image resizing asynchronously.

## Features

- Resize images based on width and height parameters provided by the user.
- Utilizes **worker threads** to offload image processing, improving performance.
- Accepts image uploads through `multipart/form-data` using **Multer**.
- Supports **JPEG** image format for resizing.

## Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v16 or above)
- **npm** (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/chamalg/image-scaling-api.git
   cd image-scaling-api
   ```

2. Install dependencies, create a .env file, and start the server:

   ```bash
   npm install
   ```

   Create a .env file and set the PORT variable.
   Start the server:

```bash
  npm run dev
```

The server will be available at http://localhost:5000 by default.

## Request Example using curl:

```bash
curl --location 'http://localhost:5000/resize' \
  --form 'width="300"' \
  --form 'height="300"' \
  --form 'file=@"/path/to/your/image.jpg"'
```

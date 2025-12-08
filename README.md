# Salamander Finder Application

A web-based tool that allows users to upload videos, select a color threshold, and binarize frames to identify salamander movement and centroid positions.

This tool was created to help identify and track salamander position in videos using binarization and color filtering.

## 🚀 Features

* **Video Upload & Preview** – Upload a video and view a generated thumbnail.
* **Color Selection** – Choose a color using a color picker for binarization.
* **Threshold Adjustment** – Fine‑tune threshold values to isolate the salamander more accurately.
* **Frame Processing** – Extract and display the original and binarized images.
* **Responsive UI** – Clean, playful interface styled with a lavender‑purple theme.

---

## 📸 How It Works

1. User uploads a video.
2. Server extracts a specific frame using JCodec.
3. Color + threshold settings are applied.
4. Binarized image is generated.
5. Both original & binarized thumbnails are displayed.

---

## 🛠️ Tech Stack

* **Next.js 14** (App Router)
* **TypeScript**
* **Node.js** API routes
* **Custom CSS (no frameworks)**
* **JCodec (server-side video frame extraction)**

---

<!-- ## 📂 Project Structure

```
project-root/
├── public/
│   ├── icons/
│   └── images/
├── src/
│   ├── app/
│   │   ├── page.tsx
|   |   ├── layout.tsx
│   │   ├── binarize/page.tsx
│   │   ├── process/page.tsx
|   |   └── globals.css
│   └── api/
│       └── videos/route.ts
└── README.md
``` -->

## 🔧 Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/yourname/your-repo.git
cd your-repo
```

### 2. Install dependencies

```
npm install
```

### 3. Run the development server

```
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** to find that salamander!

---

<!-- ## 🔌 API Endpoints

### `POST /api/process`

Processes a frame from an uploaded video.

### `GET /api/videos`

Returns available uploaded videos.

--- -->

<!-- ## 🎨 UI Notes

* Navbar and footer use a deep purple background.
* All page text is styled dark purple with controlled overrides.
* Cards use a soft peach color with glow accents. -->


<!-- ## 🧪 Testing

You can add Jest or Vitest for unit testing. (Optional)

--- -->

<!-- ## 📜 License

MIT License.

--- -->

<!-- ## 🤝 Contributing

Pull requests welcome! Open an issue if you'd like to suggest features or report bugs.

--- -->

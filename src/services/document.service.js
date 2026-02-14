export function uploadDocument(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File required" });
    }

    if (!fs.existsSync(DATA_PATH)) {
      fs.writeFileSync(DATA_PATH, JSON.stringify([]));
    }

    const content = fs.readFileSync(req.file.path, "utf-8");
    const docs = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));

    docs.push({
      id: Date.now(),
      name: req.file.originalname,
      content
    });

    fs.writeFileSync(DATA_PATH, JSON.stringify(docs, null, 2));
    res.json({ message: "Document uploaded successfully" });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
}

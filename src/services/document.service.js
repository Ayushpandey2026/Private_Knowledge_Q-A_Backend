import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src/data/documents.json");

// Helper to ensure data file exists
const ensureFile = () => {
    if (!fs.existsSync(path.dirname(DATA_PATH))) {
        fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
    }
    if (!fs.existsSync(DATA_PATH)) {
        fs.writeFileSync(DATA_PATH, JSON.stringify([]));
    }
};

export const saveDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "File required" });
        }

        ensureFile();

        const content = fs.readFileSync(req.file.path, "utf-8");
        const docs = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));

        const newDoc = {
            id: Date.now(),
            name: req.file.originalname,
            content,
            uploadedAt: new Date().toISOString()
        };

        docs.push(newDoc);
        fs.writeFileSync(DATA_PATH, JSON.stringify(docs, null, 2));

        // Temporary file delete karein jo multer ne 'uploads/' me banayi
        fs.unlinkSync(req.file.path);

        res.json({ message: "Document uploaded successfully", document: newDoc });
    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({ error: "Upload failed" });
    }
};

export const listDocuments = async (req, res) => {
    try {
        ensureFile();
        const docs = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
        res.json(docs);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch documents" });
    }
};
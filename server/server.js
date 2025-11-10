const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Node's built-in file system module
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'items.json');

const PDFDocument = require('pdfkit');

// Middleware
app.use(cors()); // Allow cross-origin requests from Angular client
app.use(express.json()); // To parse incoming JSON requests (POST, PUT)

// Helper function to read data from the JSON file
const readData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading data file:', err);
    return []; // Return an empty array on error
  }
};

// --- Routes (API Endpoints) ---

// GET all items
app.get('/api/items', (req, res) => {
  const items = readData();
  res.json(items);
});

// GET item by ID (Example of a dynamic route)
app.get('/api/items/:id', (req, res) => {
  const items = readData();
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);

  if (item) {
    res.json(item);
  } else {
    res.status(404).send({ message: 'Item not found' });
  }
});

//TODO: redo
app.post('/add-user', (req, res) => {
  const newUser = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.writeFile(filePath, JSON.stringify([newUser], null, 2), (err) => {
          if (err) {
            return res.status(500).send('Error during save');
          }
          res.status(201).send('User added');
        });
      } else {
        return res.status(500).send('Error during reading file');
      }
    } else {
      const users = JSON.parse(data);
      users.push(newUser);

      fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          return res.status(500).send('Error during save');
        }
        res.status(201).send('User added');
      });
    }
  });
});

app.post('/generate-pdf1', (req, res) => {
  console.log("🔥 /generate-pdf endpoint hit!", req.body);
});

app.post('/generate-pdf', (req, res) => {
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="example.pdf"');
  // ✅ Pipe *before* writing
  doc.pipe(res);
  // PDF Content
  doc.fontSize(22).text(`Hello ${req.body.name}, you pay ${req.body.monthPrice} euros for ${req.body.monthInput}`, 100, 100);
  // ✅ End PDF properly
  doc.end();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
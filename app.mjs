import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, 'public'), { index: false }));
app.use(express.json());

const serverVar = 'server variable example';

// In-memory attendance storage (works immediately)
const attendance = [];

// Pages
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'attend.html'));
});

app.get('/inject', async (req, res) => {
  try {
    const html = await readFile(join(__dirname, 'public', 'index.html'), 'utf8');
    res.send(html.replace('{{serverVar}}', serverVar));
  } catch (err) {
    res.status(500).send('Error loading page');
  }
});

// API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    endpoints: [
      'GET /api/class',
      'GET /api/attendance',
      'POST /api/attendance',
      'PUT /api/attendance/:id',
      'DELETE /api/attendance/:id',
    ],
  });
});

app.get('/api/class', (req, res) => {
  res.json({
    courseNumber: 'CIS 486',
    courseName: 'Projects in IS',
    nickname: 'Full Stack DevOps',
    semester: 'Spring 2026',
    calendar: 'Class calendar coming soon!',
  });
});

// CREATE
app.post('/api/attendance', (req, res) => {
  const { studentName, date, keyword } = req.body || {};
  if (!studentName || !date || !keyword) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const record = {
    _id: String(Date.now()),
    studentName,
    date,
    keyword,
    timestamp: new Date().toISOString(),
  };

  attendance.push(record);
  return res.json({ message: 'Attendance recorded!', id: record._id });
});

// READ
app.get('/api/attendance', (req, res) => {
  res.json(attendance);
});

// UPDATE
app.put('/api/attendance/:id', (req, res) => {
  const { id } = req.params;
  const { studentName, date, keyword } = req.body || {};
  if (!studentName || !date || !keyword) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const idx = attendance.findIndex(r => r._id === id);
  if (idx === -1) return res.status(404).json({ error: 'Record not found' });

  attendance[idx] = {
    ...attendance[idx],
    studentName,
    date,
    keyword,
    updatedAt: new Date().toISOString(),
  };

  return res.json({ message: 'Attendance updated!' });
});

// DELETE
app.delete('/api/attendance/:id', (req, res) => {
  const { id } = req.params;
  const idx = attendance.findIndex(r => r._id === id);
  if (idx === -1) return res.status(404).json({ error: 'Record not found' });

  attendance.splice(idx, 1);
  return res.json({ message: 'Attendance deleted!' });
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

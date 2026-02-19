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

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/class', (req, res) => {
  res.json({
    courseNumber: 'CIS 486',
    courseName: 'Projects in IS',
    semester: 'Spring 2026'
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

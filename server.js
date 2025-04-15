const express = require('express');
const cors = require('cors');
const connectDB = require('./connect_db'); 
const Notes = require('./models/Notes.js');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

const metrics = {
  totalRequests: 0,
  routeHits: {}
};

app.use((req, res, next) => {
  metrics.totalRequests += 1;

  const route = `${req.method} ${req.path}`;
  metrics.routeHits[route] = (metrics.routeHits[route] || 0) + 1;

  next();
});

app.get('/', (req, res)=> {
    // console.log('server running');
    res.send('server is running');
});

app.get('/metrics', (req, res) => {
  res.json(metrics);
});

app.get('/getAllNotes', async (req, res) => {
  try {
    const data = await Notes.find();
    // console.log('all notes', data); 
    return res.json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/findNotes', async (req, res) => {

  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  try {
    // console.log('searchText', req.query);
    let searchText = req.query.searchText || '';
    // searchText = escapeRegex(searchText);
    const regex = new RegExp(searchText, 'i');
    // console.log('regex', regex);

    Notes.find({
      $or: [
        { title: { $regex: regex } },
        { content: { $regex: regex } },
        { catfact: { $regex: regex } }
      ]
    })
      .then((data) => {
        // console.log("Data fetched:", data);
        res.json(data);
      })
  } catch (error) {
    // console.log('error', error);
    res.status(500).send('Error fetching data from MongoDB');
  }
});

app.post('/createNote', async (req, res) => {
    try {
        // console.log(11111111, req.body);
        let catFact = await fetch('https://catfact.ninja/fact');
        catFact = await catFact.json();
        // console.log('catFact', catFact.fact);
        await Notes.create({
          title: req.body.title,
          content: req.body.content,
          catfact: catFact.fact
        })
        res.status(201).json({ message: 'Note created successfully!'});
      } catch (error) {
        res.status(500).json({ message: 'Error creating data', error: error.message });
      }
});

app.delete('/deleteNote', async (req, res) => {
  const q = req.query.q || '';
  if (!q.trim()) return res.status(400).json({ error: 'Search term is required' });

  const safeQuery = q.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  const regex = new RegExp(safeQuery, 'i');

  try {
    const deletedNotes = await Notes.findOneAndDelete({
      $or: [
        { title: { $regex: regex } },
        { content: { $regex: regex } },
        { catfact: { $regex: regex } }
      ]
    });

    if (!deletedNotes) {
      return res.status(404).json({ message: 'No matching note found' });
    }

    res.status(200).json({ message: 'Note deleted', deletedNotes });
  } catch (err) {
    // console.error('Delete error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

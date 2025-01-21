const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const contactRoutes = require('./routes/contactRoutes');

const { logger, errorHandler } = require('./middleware/authMiddleware');
dotenv.config({ path: './api/.env' });
const mongoURI = process.env.MONGO_URI;

console.log('mongoURI:', process.env.MONGO_URI);


const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(logger);


mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('MongoDB connection error:', error));

// Routes
app.use('/api', contactRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

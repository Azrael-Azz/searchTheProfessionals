//Initialization
import app from './app.js';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';

// MongoDB URI
const uri = "mongodb+srv://SujalMazan:test123@sujalmazan.sbbxb6c.mongodb.net/?retryWrites=true&w=majority&appName=SujalMazan";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// Register routes before starting the server
app.use('/api/users', userRoutes);

// Start MongoDB connection and then the server
async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Connected to MongoDB");

    const port = 3000;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });

  } catch (err) {
    console.error("MongoDB connection failed", err);
  }
}

run();
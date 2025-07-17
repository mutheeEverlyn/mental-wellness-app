const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const cors = require('cors')
const connectDB = require('./config/db')
const port = process.env.PORT
const phq9Routes = require('./routes/phq9Routes')
const userRoutes = require('./routes/userRoute')
const testimonialRoutes = require('./routes/testimonialRoutes')
const User = require('./models/userModel');
const jwt = require('jsonwebtoken');


connectDB()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Placeholder authentication middleware (replace with real JWT auth in production)
app.use(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Fetch user from DB to get the name
      const user = await User.findById(decoded.id).select('name');
      if (user) {
        req.user = { _id: decoded.id, name: user.name };
      } else {
        req.user = undefined;
      }
    } catch (err) {
      req.user = undefined;
    }
  }
  next();
});

app.use('/phq9', phq9Routes);
app.use('/user', userRoutes)
app.use('/testimonials', testimonialRoutes);


app.listen(port, () => {
    console.log(`Server started at ${port}`)
})
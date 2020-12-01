const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

// MongoDB
connectDB();
// body parser
app.use(express.json({ extended: false }));
// routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
/*********************** Heroku Production Setup **********************************/
// having Express handle routes that are located inside the client folder
if(process.env.NODE_ENV === 'production') {
   // express will serve production assets (main.js or main.css)
   app.use(express.static('client/build'));
   // express will serve index.html if it doesn't recognize the route
   // last resort for responding to a route request that isn't located in any other folder
   app.get('*', (req, res) => 
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
   );
}
/********************************************************************************/
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
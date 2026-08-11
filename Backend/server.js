const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const app = express();
const cors = require('cors');
const aiRoutes = require('./src/routes/ai.routes');

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/ai', aiRoutes);

app.listen(3000, () => {
    console.log('server started on 3000');
}) 
const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors');
const newsRoutes = require('./routes/api/news');
const tagsRoutes = require('./routes/api/tags');

const app = express();

app.use('/uploads', express.static('uploads'));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    next();
});
app.use('/api', newsRoutes);
app.use('/api', tagsRoutes);


if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000

async function start() {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(config.get('mongoURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
        console.log('MongoDB is Connected...');
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()
const express = require('express');
const multer = require('multer');
const app = express();
const port = 3000;
const fs = require('fs').promises;
const upload = multer({ dest: 'uploads/' });
const convertSvgToPng = require('./src/services/svgToPng');
const convertPngToJpeg = require('./src/services/svgToJpg');


app.post('/convert-to-png', upload.single('svgFile'), async (req, res) => {
    try {
        const svgContent = await fs.readFile(req.file.path, { encoding: 'utf-8' });
        const pngBase64 = await convertSvgToPng(svgContent);

        res.send({ base64: pngBase64 });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error converting SVG to PNG');
    }
});

app.post('/convert-to-jpeg', upload.single('svgFile'), async (req, res) => {
    try {
        const svgFilePath = req.file.path;
        const pngFilePath = await convertSvgToPng(svgFilePath); 
        const jpegFilePath = await convertPngToJpeg(pngFilePath); 
        console.log(`JPEG file saved at: ${jpegFilePath}`);
        res.send(`SVG converted to JPEG successfully. JPEG file saved at: ${jpegFilePath}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error converting SVG to JPEG');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
});

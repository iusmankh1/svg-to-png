const sharp = require('sharp');

async function convertPngToJpeg(pngFilePath) {
    const jpegFilePath = pngFilePath.replace('.png', '.jpeg');

    await sharp(pngFilePath)
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .jpeg({ quality: 90 }) 
        .toFile(jpegFilePath);

    return jpegFilePath;
}

module.exports = convertPngToJpeg;

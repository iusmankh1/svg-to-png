const { convert } = require('convert-svg-to-png');
const fs = require('fs').promises;

async function convertSvgToPng(svgContent) {
    const options = {
        scale: 2, 
        width: 1024,  
        height: 1024, 
    };
    const pngBuffer = await convert(svgContent, options);
    return pngBuffer.toString('base64');
}

module.exports = convertSvgToPng;

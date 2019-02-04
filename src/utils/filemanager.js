var fs = require('fs');
var Image = require('../model/image');
var Jimp = require('jimp');

var PATH = "./output/";

var FORMAT_PPM = "ppm";
var FORMAT_PNG = "png";

async function convertImageToPPM(imageInput, sFileName) {
    var sFilePath = PATH + sFileName + "." + FORMAT_PPM;
    var sData = "P3\n" + imageInput.resolutionX + " " + imageInput.resolutionY + "\n255\n";
    for (var j = 0; j < imageInput.resolutionY; j++) {
        for (var i = 0; i < imageInput.resolutionX; i++) {
            var color = imageInput.pixel(i, j);
            sData = sData + color.red + " " + color.green + " " + color.blue + "\n";
        }
    }
    return await fs.writeFile(sFilePath, sData, onSave);
}

async function convertImageToPNG(imageInput, sFileName) {
    var sFilePath = PATH + sFileName + "." + FORMAT_PNG;
    let oJimpImage = new Jimp(imageInput.resolutionX, imageInput.resolutionY, function (oError, oImage) {
        if (oError) {
            throw oError;
        }
        imageInput.pixelArray.forEach((pixelRow, y) => {
            pixelRow.forEach((pixel, x) => {
                oImage.setPixelColor(Jimp.rgbaToInt(pixel.red, pixel.green, pixel.blue, 255), x, y);
            })
        });
        oImage.write(sFilePath, onSave);
    });
}

var saveImage = async function (sFileName, sFormat, imageInput) {
    if (!(imageInput instanceof Image)) {
        throw new Error("Input is not an Image");
    }
    switch (sFormat) {
        case FORMAT_PPM:
            return await convertImageToPPM(imageInput, sFileName);
            break;
        case FORMAT_PNG:
            return await convertImageToPNG(imageInput, sFileName);
            break;
        default:
            throw new Error("Image format not supported");
    }
}

function onSave(oError) {
    if (oError) {
        console.log("Error while saving file");
    } else {
        console.log("Successfully saved the file in " + PATH + " folder");
    }
}

module.exports = {
    "format": {
        "ppm": FORMAT_PPM,
        "png": FORMAT_PNG
    },
    "saveImage": saveImage
};
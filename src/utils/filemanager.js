var fs = require('fs');
var Image = require('../model/image');

var PATH = "./output/";

var FORMAT_PPM = "ppm";

async function convertImageToPPM(imageInput) {
    var sData = "P3\n" + imageInput.resolutionX + " " + imageInput.resolutionY + "\n255\n";
    for (var j = 0; j < imageInput.resolutionY; j++) {
        for (var i = 0; i < imageInput.resolutionX; i++) {
            var color = imageInput.pixel(i, j);
            sData = sData + color.red + " " + color.green + " " + color.blue + "\n";
        }
    }
    return sData;
}

var saveImage = async function (sFileName, sFormat, imageInput) {
    if (!(imageInput instanceof Image)) {
        throw new Error("Input is not an Image");
    }
    var fileData;
    var sFilePath = PATH + sFileName + "." + sFormat;
    switch (sFormat) {
        case FORMAT_PPM:
            fileData = await convertImageToPPM(imageInput);
            break
        default:
            throw new Error("Image format not supported");
    }
    return await fs.writeFile(sFilePath, fileData, errorOnSave);

    function errorOnSave(oError) {
        if (oError) {
            console.log("Error while saving file");
        } else {
            console.log("Successfully saved the file to " + sFilePath);
        }
    }
};

module.exports = {
    "format": {
        "ppm": FORMAT_PPM
    },
    "saveImage": saveImage
};
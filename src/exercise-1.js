var Image = require("./model/image");
var FileManager = require("./utils/filemanager");

console.log("---------------------------");
console.log("Exercise 1: Output An Image")
console.log("---------------------------");

var iResX = 200,
    iResY = 100;
var mImage = new Image(iResX, iResY);

for (var j = iResY - 1; j >= 0; j--) {
    for (var i = 0; i < iResX; i++) {
        var red = i / iResX;
        var green = j / iResY;
        var blue = 0.2;
        mImage.pushRawPixel(red, green, blue);
    }
}

var sFileName = __filename.slice(__dirname.length + 1, -3);
FileManager.saveImage(sFileName, FileManager.format.png, mImage);
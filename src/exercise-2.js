var Image = require("./model/image");
var FileManager = require("./utils/filemanager");
var Vector = require("./model/vector");
var Ray = require("./model/ray");

console.log("----------------------------------------------");
console.log("Exercise 2: Rays, A Simple Camera & Background");
console.log("----------------------------------------------");

var iResX = 200,
    iResY = 100;
var mImage = new Image(iResX, iResY);

var vectorLowerLeftCorner = new Vector(-2, -1, -1);
var vectorHorizontal = new Vector(4, 0, 0);
var vectorVertical = new Vector(0, 2, 0);
var vectorOrigin = new Vector(0, 0, 0);

for (var j = iResY - 1; j >= 0; j--) {
    for (var i = 0; i < iResX; i++) {
        var u = i / iResX;
        var v = j / iResY;
        var vectorHPos = vectorHorizontal.multiply(u);
        var vectorVPos = vectorVertical.multiply(v);
        var ray = new Ray(vectorOrigin, vectorLowerLeftCorner.add(vectorHPos.add(vectorVPos)));
        var color = generateColor(ray);
        mImage.pushRawPixel(color.x, color.y, color.z);
    }
}

function generateColor(rayIn) {
    var vectorDirectionUnit = rayIn.direction.getUnit();
    var posY = 0.5 * (vectorDirectionUnit.y + 1);
    var colorStart = new Vector(1, 1, 1);
    var colorEnd = new Vector(0.5, 0.7, 1.0);
    return colorStart.multiply(1 - posY).add(colorEnd.multiply(posY)); // (1 - posY) * colorStart + posY * colorEnd
}

var sFileName = __filename.slice(__dirname.length + 1, -3);
FileManager.saveImage(sFileName, FileManager.format.png, mImage);
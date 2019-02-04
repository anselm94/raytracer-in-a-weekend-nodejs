var Image = require("./model/image");
var FileManager = require("./utils/filemanager");
var Vector = require("./model/vector");
var Ray = require("./model/ray");

console.log("----------------------------------------------");
console.log("Exercise 4: Surface Normals & Multiple Objects");
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
    var vectorSphereCenter = new Vector(0, 0, -1);
    var t = isSphereHit(vectorSphereCenter, 0.5, rayIn);
    if (t > 0) {
        var vectorSurfaceNormal = rayIn.pointAt(t).subtract(vectorSphereCenter);
        var vectorUnitSurfaceNormal = vectorSurfaceNormal.getUnit();
        var vectorColor = new Vector(vectorUnitSurfaceNormal.x + 1, vectorUnitSurfaceNormal.y + 1, vectorUnitSurfaceNormal.z + 1);
        return vectorColor.multiply(0.5);
    }
    var vectorDirectionUnit = rayIn.direction.getUnit();
    t = 0.5 * (vectorDirectionUnit.y + 1);
    var colorStart = new Vector(1, 1, 1);
    var colorEnd = new Vector(0.5, 0.7, 1.0);
    return colorStart.multiply(1 - t).add(colorEnd.multiply(t)); // (1 - posY) * colorStart + posY * colorEnd
}

function isSphereHit(vectorCenter, iRadius, rayIn) {
    var vectorOriginCenter = rayIn.origin.subtract(vectorCenter);
    var a = rayIn.direction.dot(rayIn.direction);
    var b = vectorOriginCenter.dot(rayIn.direction) * 2;
    var c = vectorOriginCenter.dot(vectorOriginCenter) - (iRadius * iRadius);
    var iDiscriminant = (b * b) - (4 * a * c);
    if (iDiscriminant < 0) {
        return -1;
    } else {
        return ((-1 * b) - Math.sqrt(iDiscriminant)) / (2 * a);
    }
}

var sFileName = __filename.slice(__dirname.length + 1, -3);
FileManager.saveImage(sFileName, FileManager.format.png, mImage);
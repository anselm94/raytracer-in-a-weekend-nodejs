var Image = require("./model/image");
var FileManager = require("./utils/filemanager");
var Vector = require("./model/vector");
var HitRecord = require("./model/hitable").HitRecord;
var HitableList = require("./model/hitablelist");
var Sphere = require("./model/shape/sphere");
var Camera = require("./model/camera");

console.log("------------------------");
console.log("Exercise 6: Antialiasing");
console.log("------------------------");

var iResX = 200,
    iResY = 100,
    iSamples = 100;
var mImage = new Image(iResX, iResY);

var sphereSubject = new Sphere(new Vector(0, 0, -1), 0.5);
var sphereSky = new Sphere(new Vector(0, -100.5, -1), 100);
var listHitable = [sphereSubject, sphereSky];
var hitableWorld = new HitableList(listHitable);
var camera = new Camera();

for (var j = iResY - 1; j >= 0; j--) {
    for (var i = 0; i < iResX; i++) {
        var color = new Vector(0, 0, 0);
        for (var sample = 0; sample < iSamples; sample++) {
            var u = (i + Math.random()) / iResX;
            var v = (j + Math.random()) / iResY;
            ray = camera.getRay(u, v);
            var vectorPoint = ray.pointAt(2);
            color.addTo(generateColor(ray, hitableWorld))
        }
        color = color._divide(iSamples);
        mImage.pushRawPixel(color.x, color.y, color.z);
    }
}

function generateColor(rayIn, hitableWorld) {
    var hitrecord = new HitRecord();
    var iTmax = 3.4 * Math.pow(10, 38);
    if (hitableWorld.hit(rayIn, 0, iTmax, hitrecord)) {
        var vectorTemp = new Vector(hitrecord.normal.x + 1, hitrecord.normal.y + 1, hitrecord.normal.z + 1);
        return vectorTemp.multiply(0.5);
    } else {
        var t = (rayIn.direction.getUnit().y + 1) * 0.5;
        var colorStart = new Vector(1, 1, 1);
        var colorEnd = new Vector(0.5, 0.7, 1.0);
        return colorStart.multiply(1 - t).add(colorEnd.multiply(t)); // (1 - posY) * colorStart + posY * colorEnd
    }
}

var sFileName = __filename.slice(__dirname.length + 1, -3);
FileManager.saveImage(sFileName, FileManager.format.png, mImage);
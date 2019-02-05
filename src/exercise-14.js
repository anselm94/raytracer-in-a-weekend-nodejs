var Image = require("./model/image");
var FileManager = require("./utils/filemanager");
var Vector = require("./model/vector");
var Ray = require("./model/ray");
var HitRecord = require("./model/hitable").HitRecord;
var HitableList = require("./model/hitablelist");
var Sphere = require("./model/shape/sphere");
var Camera = require("./model/camera-positionable-with-focus");
var Lambertian = require('./model/material/lambertian');
var Metal = require('./model/material/metal');
var Dielectric = require('./model/material/dielectric');

console.log("-------------------------");
console.log("Exercise 14: Defocus Blur");
console.log("-------------------------");

var iResX = 200,
    iResY = 100,
    iSamples = 100;
var mImage = new Image(iResX, iResY);

var listHitable = [];
listHitable.push(new Sphere(new Vector(0, 0, -1), 0.5, new Lambertian(new Vector(0.1, 0.2, 0.5))));
listHitable.push(new Sphere(new Vector(0, -100.5, -1), 100, new Lambertian(new Vector(0.8, 0.8, 0))));
listHitable.push(new Sphere(new Vector(1, 0, -1), 0.5, new Metal(new Vector(0.8, 0.6, 0.2), 0.25)));
listHitable.push(new Sphere(new Vector(-1, 0, -1), 0.5, new Dielectric(1.5)));
listHitable.push(new Sphere(new Vector(-1, 0, -1), -0.45, new Dielectric(1.5)));
var hitableWorld = new HitableList(listHitable);

var vectorLookFrom = new Vector(3, 3, 2);
var vectorLookAt = new Vector(0, 0, -1);
var iFocalDistance = vectorLookFrom.subtract(vectorLookAt).length();
var iAperture = 2;
var camera = new Camera(vectorLookFrom, vectorLookAt, new Vector(0, 1, 0), 20, iResX / iResY, iAperture, iFocalDistance);

for (var j = iResY - 1; j >= 0; j--) {
    for (var i = 0; i < iResX; i++) {
        var color = new Vector(0, 0, 0);
        for (var sample = 0; sample < iSamples; sample++) {
            var u = (i + Math.random()) / iResX;
            var v = (j + Math.random()) / iResY;
            ray = camera.getRay(u, v);
            var vectorPoint = ray.pointAt(2);
            color.addTo(generateColor(ray, hitableWorld, 0));
        }
        color = color._divide(iSamples);
        color = new Vector(Math.sqrt(color.x), Math.sqrt(color.y), Math.sqrt(color.z));
        mImage.pushRawPixel(color.x, color.y, color.z);
    }
}

function generateColor(rayIn, hitableWorld, iDepth) {
    var hitrecord = new HitRecord();
    var iTmax = Math.pow(10, 38);
    if (hitableWorld.hit(rayIn, 0.001, iTmax, hitrecord)) {
        var rayScattered = new Ray(new Vector(0, 0, 0), new Vector(0, 0, 0));
        var vectorAttenuation = new Vector(0, 0, 0);
        if (iDepth < 50 && hitrecord.material.scatter(rayIn, hitrecord, vectorAttenuation, rayScattered)) {
            var color = generateColor(rayScattered, hitableWorld, iDepth + 1);
            return new Vector(vectorAttenuation.x * color.x, vectorAttenuation.y * color.y, vectorAttenuation.z * color.z);
        } else {
            return new Vector(0, 0, 0);
        }
    } else {
        var t = (rayIn.direction.getUnit().y + 1) * 0.5;
        var colorStart = new Vector(1, 1, 1);
        var colorEnd = new Vector(0.5, 0.7, 1.0);
        return colorStart.multiply(1 - t).add(colorEnd.multiply(t)); // (1 - posY) * colorStart + posY * colorEnd
    }
}

var sFileName = __filename.slice(__dirname.length + 1, -3);
FileManager.saveImage(sFileName, FileManager.format.png, mImage);
var Vector = require("./vector");
var Ray = require("./ray");

class Camera {
    constructor(vectorLookFrom, vectorLookAt, vectorUp, iFieldOfView, iAspectRatio, iAperture, iFocalDistance) {
        var theta = iFieldOfView * Math.PI / 180;
        var iHeightHalf = Math.tan(theta / 2);
        var iWidthHalf = iAspectRatio * iHeightHalf;
        this._origin = vectorLookFrom;
        this._w = vectorLookFrom.subtract(vectorLookAt).getUnit();
        this._u = vectorUp.cross(this._w).getUnit();
        this._v = this._w.cross(this._u);
        this._lens_radius = iAperture / 2;
        this._corner_lowerleft = this._origin.subtract(this._u.multiply(iWidthHalf * iFocalDistance)).subtract(this._v.multiply(iHeightHalf * iFocalDistance)).subtract(this._w.multiply(iFocalDistance));
        this._horizotal = this._u.multiply(2 * iWidthHalf * iFocalDistance);
        this._vertical = this._v.multiply(2 * iHeightHalf * iFocalDistance);
    }

    getRay(iU, iV) {
        var vectorRandom = this.getRandomInUnitSphere().multiply(this._lens_radius);
        var vectorOffset = this._u.multiply(vectorRandom.x).add(this._v.multiply(vectorRandom.y));
        var vectorHPos = this._horizotal.multiply(iU);
        var vectorVPos = this._vertical.multiply(iV);
        return new Ray(this._origin.add(vectorOffset), this._corner_lowerleft.add(vectorHPos.add(vectorVPos)).subtract(this._origin).subtract(vectorOffset));
    }

    getRandomInUnitSphere() {
        var vectorRandom;
        do {
            var vectorTemp = new Vector(Math.random(), Math.random(), 0);
            vectorRandom = vectorTemp.multiply(2).subtract(new Vector(1, 1, 0));
        } while (vectorRandom.dot(vectorRandom) >= 1);
        return vectorRandom;
    }
}

module.exports = Camera;
var Vector = require("./vector");
var Ray = require("./ray");

class Camera {
    constructor(vectorLookFrom, vectorLookAt, vectorUp, iFieldOfView, iAspectRatio) {
        var theta = iFieldOfView * Math.PI / 180;
        var iHeightHalf = Math.tan(theta / 2);
        var iWidthHalf = iAspectRatio * iHeightHalf;
        this._origin = vectorLookFrom;
        var vectorW = vectorLookFrom.subtract(vectorLookAt).getUnit();
        var vectorU = vectorUp.cross(vectorW).getUnit();
        var vectorV = vectorW.cross(vectorU);
        this._corner_lowerleft = this._origin.subtract(vectorU.multiply(iWidthHalf)).subtract(vectorV.multiply(iHeightHalf)).subtract(vectorW);
        this._horizotal = vectorU.multiply(2 * iWidthHalf);
        this._vertical = vectorV.multiply(2 * iHeightHalf);
    }

    getRay(iU, iV) {
        var vectorHPos = this._horizotal.multiply(iU);
        var vectorVPos = this._vertical.multiply(iV);
        return new Ray(this._origin, this._corner_lowerleft.add(vectorHPos.add(vectorVPos)).subtract(this._origin));
    }
}

module.exports = Camera;
var Vector = require("./vector");
var Ray = require("./ray");

class Camera {
    constructor() {
        this._corner_lowerleft = new Vector(-2, -1, -1);
        this._horizotal = new Vector(4, 0, 0);
        this._vertical = new Vector(0, 2, 0);
        this._origin = new Vector(0, 0, 0);
    }

    getRay(iU, iV) {
        var vectorHPos = this._horizotal.multiply(iU);
        var vectorVPos = this._vertical.multiply(iV);
        return new Ray(this._origin, this._corner_lowerleft.add(vectorHPos.add(vectorVPos)).subtract(this._origin));
    }
}

module.exports = Camera;
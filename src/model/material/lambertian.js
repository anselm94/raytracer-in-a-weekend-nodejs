var Material = require("../material");
var Vector = require('../vector');

class Lambertian extends Material {
    constructor(vectorAlbedo) {
        super();
        this._albedo = vectorAlbedo;
    }

    scatter(rayIn, hitRecord, vectorAttenuation, rayScattered) {
        var vectorTarget = hitRecord.incident.add(hitRecord.normal).add(this.getRandomInUnitSphere());
        rayScattered.origin = hitRecord.incident;
        rayScattered.direction = vectorTarget.subtract(hitRecord.incident);
        vectorAttenuation.x = this._albedo.x;
        vectorAttenuation.y = this._albedo.y;
        vectorAttenuation.z = this._albedo.z;
        return true;
    }

    getRandomInUnitSphere() {
        var vector;
        do {
            var vectorTemp = new Vector(Math.random(), Math.random(), Math.random());
            vector = vectorTemp.multiply(2).subtract(new Vector(1, 1, 1));
        } while (vector.squaredLength() >= 1);
        return vector;
    }
}

module.exports = Lambertian;
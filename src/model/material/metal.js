var Material = require("../material");
var Vector = require("../vector");

class Metal extends Material {
    constructor(vectorAlbedo, iRoughness) {
        super();
        this._albedo = vectorAlbedo;
        if(iRoughness) {
            this._roughness = iRoughness < 1 ? iRoughness : 1;
        } else {
            this._roughness = 0;
        }
    }

    scatter(rayIn, hitRecord, vectorAttenuation, rayScattered) {
        var vectorReflected = this.reflect(rayIn.direction.getUnit(), hitRecord.normal);
        rayScattered.origin = hitRecord.incident;
        rayScattered.direction = vectorReflected.add(this.getRandomInUnitSphere().multiply(this._roughness));
        vectorAttenuation.x = this._albedo.x;
        vectorAttenuation.y = this._albedo.y;
        vectorAttenuation.z = this._albedo.z;
        return rayScattered.direction.dot(hitRecord.normal) > 0;
    }

    reflect(vectorV, vectorN) {
        var dotVN = vectorV.dot(vectorN);
        return vectorV.subtract(vectorN.multiply(2 * dotVN)); //vectorV - (2 * (vectorV.vectorN) * vectorN)
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

module.exports = Metal;
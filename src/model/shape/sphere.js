var Hitable = require("../hitable").Hitable;

class Sphere extends Hitable {
    constructor(vectorCenter, iRadius, materialSurface) {
        super();
        this._center = vectorCenter;
        this._radius = iRadius;
        this._material = materialSurface;
    }

    hit(rayIn, iTmin, iTmax, hitRecord) {
        var vectorOriginCenter = rayIn.origin.subtract(this._center);
        var a = rayIn.direction.dot(rayIn.direction);
        var b = vectorOriginCenter.dot(rayIn.direction);
        var c = vectorOriginCenter.dot(vectorOriginCenter) - (this._radius * this._radius);
        var iDiscriminant = (b * b) - ( a * c);
        if (iDiscriminant > 0) {
            var temp = ((-1 * b) - Math.sqrt(iDiscriminant)) / a;
            if(temp < iTmax && temp > iTmin) {
                return assignHitRecord(temp, this._center, this._radius, this._material);
            }
            temp = ((-1 * b) + Math.sqrt(iDiscriminant)) / a;
            if(temp < iTmax && temp > iTmin) {
                return assignHitRecord(temp, this._center, this._radius, this._material);
            }
        }
        return false;

        function assignHitRecord(iValue, iCenter, iRadius, materialSurface) {
            hitRecord.t = iValue;
            hitRecord.incident = rayIn.pointAt(hitRecord.t);
            hitRecord.normal = hitRecord.incident.subtract(iCenter)._divide(iRadius);
            hitRecord.material = materialSurface;
            return true;
        }
    }
}

module.exports = Sphere;
var Material = require("../material");
var Vector = require("../vector");

class Dielectric extends Material {
    constructor(iRefractiveIndex) {
        super();
        this._refractiveIndex = iRefractiveIndex;
    }

    scatter(rayIn, hitRecord, vectorAttenuation, rayScattered) {
        var vectorOutwardNormal, iNiOverNt, iReflectProb, iCosine;
        var vectorReflected = this.reflect(rayIn.direction, hitRecord.normal);
        vectorAttenuation.x = 1;
        vectorAttenuation.y = 1;
        vectorAttenuation.z = 1;
        var vectorRefracted = new Vector(0, 0, 0);
        if (rayIn.direction.dot(hitRecord.normal) > 0) {
            vectorOutwardNormal = hitRecord.normal.multiply(-1);
            iNiOverNt = this._refractiveIndex;
            iCosine = this._refractiveIndex * rayIn.direction.dot(hitRecord.normal) / rayIn.direction.length();
        } else {
            vectorOutwardNormal = hitRecord.normal;
            iNiOverNt = 1 / this._refractiveIndex;
            iCosine = -1 * rayIn.direction.dot(hitRecord.normal) / rayIn.direction.length();
        }
        if (this.refract(rayIn.direction, vectorOutwardNormal, iNiOverNt, vectorRefracted)) {
            iReflectProb = this.schlick(iCosine);
        } else {
            rayScattered.origin = hitRecord.incident;
            rayScattered.direction = vectorReflected;
            iReflectProb = 1;
        }
        if(Math.random() < iReflectProb) {
            rayScattered.origin = hitRecord.incident;
            rayScattered.direction = vectorReflected;
        } else {
            rayScattered.origin = hitRecord.incident;
            rayScattered.direction = vectorRefracted;
        }
        return true;
    }

    reflect(vectorV, vectorN) {
        var dotVN = vectorV.dot(vectorN);
        return vectorV.subtract(vectorN.multiply(2 * dotVN)); //vectorV - (2 * (vectorV.vectorN) * vectorN)
    }

    refract(vectorV, vectorN, iNiOverNt, vectorRefracted) {
        var vectorUV = vectorV.getUnit();
        var iDt = vectorUV.dot(vectorN);
        var iDiscriminant = 1 - iNiOverNt * iNiOverNt * (1 - iDt * iDt);
        if (iDiscriminant > 0) {
            var vectorTemp = vectorUV.subtract(vectorN.multiply(iDt)).multiply(iNiOverNt).subtract(vectorN.multiply(Math.sqrt(iDiscriminant)));
            vectorRefracted.x = vectorTemp.x;
            vectorRefracted.y = vectorTemp.y;
            vectorRefracted.z = vectorTemp.z;
            return true;
        } else {
            return false;
        }
    }

    schlick(iCosine) {
        var iR0 = (1 - this._refractiveIndex) / (1 + this._refractiveIndex);
        iR0 = iR0 * iR0;
        return iR0 + (1 - iR0) * Math.pow((1 - iCosine), 5);
    }
}

module.exports = Dielectric;
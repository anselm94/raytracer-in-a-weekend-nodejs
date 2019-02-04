var Vector = require("./vector");
var Material = require("./material");

class Hitable {
    hit(rayIn, iTmin, iTmax, hitRecord) {

    }
}

class HitRecord {
    constructor() {
        this._t = 0;
        this._incident = new Vector(0, 0, 0);
        this._normal = new Vector(0, 0, 0);
        this._material = new Material();
    }

    get t() {
        return this._t;
    }

    get incident() {
        return this._incident;
    }

    get normal() {
        return this._normal;
    }

    get material() {
        return this._material;
    }

    set t(iT) {
        this._t = iT;
    }

    set incident(vectorIncident) {
        this._incident = vectorIncident;
    }

    set normal(vectorNormal) {
        this._normal = vectorNormal;
    }

    set material(material) {
        this._material = material;
    }
}

module.exports = {
    "Hitable": Hitable,
    "HitRecord": HitRecord
};
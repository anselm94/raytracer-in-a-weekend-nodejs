var Vector = require("./vector");

class Hitable {
    hit(rayIn, iTmin, iTmax, hitRecord) {

    }
}

class HitRecord {
    constructor() {
        this._t = 0;
        this._incident = new Vector(0, 0, 0);
        this._normal = new Vector(0, 0, 0);
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

    set t(iT) {
        this._t = iT;
    }

    set incident(vectorIncident) {
        this._incident = vectorIncident;
    }

    set normal(vectorNormal) {
        this._normal = vectorNormal;
    }
}

module.exports = {
    "Hitable": Hitable,
    "HitRecord": HitRecord
};
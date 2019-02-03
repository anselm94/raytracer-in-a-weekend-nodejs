var Hitable = require("./hitable").Hitable;
var HitRecord = require("./hitable").HitRecord;

class HitableList extends Hitable{
    constructor(listHitable) {
        super();
        this._list = listHitable || [];
    }

    get size () {
        return this._list.length;
    }

    hit(rayIn, iTmin, iTmax, hitRecord) {
        var hasHitSomething = false;
        var closestHit = iTmax;
        for(var i = 0; i < this._list.length; i++) {
            if(this._list[i].hit(rayIn, iTmin, closestHit, hitRecord)) {
                hasHitSomething = true;
                closestHit = hitRecord.t;
            }
        }
        return hasHitSomething;
    }
}

module.exports = HitableList;
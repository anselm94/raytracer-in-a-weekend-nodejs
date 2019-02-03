class Ray {
    constructor(vectorOrigin, vectorDirection) {
        this._origin = vectorOrigin;
        this._direction = vectorDirection;
    }

    get origin() {
        return this._origin;
    }

    get direction() {
        return this._direction;
    }

    pointAt(iPosX) {
        return this.origin.add(this._direction.multiply(iPosX)); //origin + (t * direction)
    }
}

module.exports = Ray;
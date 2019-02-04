class Vector3D {
    constructor(fX, fY, fZ) {
        this._x = fX;
        this._y = fY;
        this._z = fZ;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get z() {
        return this._z;
    }

    set x(fX) {
        this._x = fX;
    }

    set y(fY) {
        this._y = fY;
    }

    set z(fZ) {
        this._z = fZ;
    }

    get red() {
        return Math.abs(Math.round(this._x * 255));
    }

    get green() {
        return Math.abs(Math.round(this._y * 255));
    }

    get blue() {
        return Math.abs(Math.round(this._z * 255));
    }

    add(vector3d) {
        return new Vector3D(this._x + vector3d.x, this._y + vector3d.y, this._z + vector3d.z);
    }

    subtract(vector3d) {
        return new Vector3D(this._x - vector3d.x, this._y - vector3d.y, this._z - vector3d.z);
    }

    multiply(iCount) {
        return new Vector3D(this._x * iCount, this._y * iCount, this._z * iCount);
    }

    _divide(iCount) {
        return new Vector3D(this._x / iCount, this._y / iCount, this._z / iCount);
    }

    addTo(vector3d) {
        this._x += vector3d.x;
        this._y += vector3d.y;
        this._z += vector3d.z;
    }

    subtractFrom(vector3d) {
        this._x -= vector3d.x;
        this._y -= vector3d.y;
        this._z -= vector3d.z;
    }

    /**
     * Scalar multiplication of vector
     * 
     * @param {integer} iCount 
     */
    scaleUpBy(iCount) {
        this._x *= iCount;
        this._y *= iCount;
        this._z *= iCount;
    }

    /**
     * Scalar division of vector
     * 
     * @param {integer} iCount 
     */
    scaleDownBy(iCount) {
        this._x /= iCount;
        this._y /= iCount;
        this._z /= iCount;
    }

    getUnit() {
        return this._divide(this.length());
    }

    dot(vector3d) {
        return (this._x * vector3d.x) + (this._y * vector3d.y) + (this._z * vector3d.z);
    }

    cross(vector3d) {
        var x = this._y * vector3d.z - this._z * vector3d.y;
        var y = this._z * vector3d.x - this._x * vector3d.z;
        var z = this._x * vector3d.y - this._y * vector3d.x;
        return new Vector3D(x, y, z);
    }

    length() {
        return Math.sqrt(this.squaredLength());
    }

    squaredLength() {
        return (this._x * this._x) + (this._y * this._y) + (this._z * this._z);
    }
}

module.exports = Vector3D;
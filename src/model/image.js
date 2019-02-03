var Vector = require('./vector');

class Image {
    constructor(iResolutionX, iResolutionY) {
        this._resX = iResolutionX;
        this._resY = iResolutionY;
        this._resolution = 0;
        this._pixelArray = [];
    }

    get resolutionX () {
        return this._resX;
    }

    get resolutionY () {
        return this._resY;
    }

    get resolution () {
        return this._resolution;
    }

    get pixelArray () {
        return this._pixelArray;
    }
    
    pixel(iPosX, iPosY) {
        if(iPosX >= this._resX || iPosY >= this._resY) {
            throw new Error("Pixel unavailable");
        }
        return this._pixelArray[iPosY][iPosX];
    }

    pushRawPixel(iRed, iGreen, iBlue) {
        var pixelRGB = new Vector(iRed, iGreen, iBlue);
        this.pushPixel(pixelRGB);
    }

    pushPixel(pixelRGB) {
        var posX = this._resolution % this._resX;
        var posY = Math.floor(this._resolution / this._resX);
        if(posY < this._resY) {
            if(posX === 0) {
                this._pixelArray.push([]);
            }
            this._pixelArray[posY].push(pixelRGB);
            this._resolution += 1;
        } else {
            throw Error("Pixel Overflow Error");
        }
    }
}

module.exports = Image;
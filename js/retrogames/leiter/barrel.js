var barrelId = 0;

class Barrel {

    constructor(position) {
      this.id = ++barrelId;
      this.position = position;
      this.direction = 0;
    }

    getId()
    {
        this.getId();
    }

    getPosition()
    {
        return this.position;
    }

    getDirection()
    {
        return this.direction;
    }

    setPosition(position)
    {
        this.position = position;
    }
    
    setDirection(direction)
    {
        this.direction = direction;
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports.Barrel = Barrel;

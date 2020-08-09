class Model {

    constructor(level) {
      this.field = [...level.map]
      this.level = level;
      this.barrels = [];
      this.player = undefined;
      this.message = undefined;
      this.omas   = 4;
      this.points = 0;
    }

    getLines() {

        var lines = [...this.field];
        this.barrels.forEach(function(barrel) {
     
            var p = barrel.getPosition();
            lines[p.y] = lines[p.y].substring(0,p.x) + 'o' + lines[p.y].substring(p.x+1);
        });

        var pos = this.player.getPosition();
        lines[pos.y] = lines[pos.y].substring(0,pos.x) + 'p' + lines[pos.y].substring(pos.x+1);

        //set Omas
        //lines[this.level.status.y] = lines[this.level.status.y].substring(0,this.level.status.omas) + this.omas +lines[this.level.status.y].substring(this.level.status.omas +1);
        //set points
        //lines[this.level.status.y] = lines[this.level.status.y].substring(0,this.level.status.stand) + this.points +lines[this.level.status.y].substring(this.level.status.stand +this.points.toString().length);

        if(this.message != undefined)
        {
            lines[10] = lines[10].substring(0,10) + "+------------------------------+"+lines[10].substring(10+32);
            lines[11] = lines[11].substring(0,10) + "|                              |"+lines[11].substring(10+32);
            lines[12] = lines[12].substring(0,10) + "|                              |"+lines[12].substring(10+32);
            lines[13] = lines[13].substring(0,10) + "|                              |"+lines[13].substring(10+32);
            lines[14] = lines[14].substring(0,10) + "+------------------------------+"+lines[14].substring(10+32);
            lines[12] = lines[12].substring(0,13) + this.message+ lines[12].substring(13+this.message.length);
        }

        return lines;
    }
    addPoints(points) {
        this.points += points;
    }

    setMessage(message) {
        this.message = message;
    }

    getField(pos)
    {
        if(pos.y < 0) return '';
        if(pos.y >= this.field.length) return '';
        var line = this.field[pos.y];

        if(pos.x < 0) return '';
        if(pos.x >= line.length) return '';

        return line.charAt(pos.x);

    }

    setField(pos,c)
    {
        if(pos.y < 0) return '';
        if(pos.y >= this.field.length) return '';
        var line = this.field[pos.y];

        if(pos.x < 0) return '';
        if(pos.x >= line.length) return '';

        this.field[pos.y] = line.substring(0,pos.x) + c + line.substring(pos.x + 1);

    }

    getStart() {
        return this.level.start;
    }

    setPlayer(player)
    {
        this.player = player;
    }

    getPlayer()
    {
        return this.player;
    }

    getSources() {
        return this.level.sources;
    }
    getMaxBarrels() {
        return this.level.maxBarrels;
    }

    getBarrelPosibility() {
        return this.level.barrelPosibility;
    }

    getBarrels()
    {
        return this.barrels;
    }

    addBarrel(barrel)
    {
        this.barrels.push(barrel);
    }

    deleteBarrels(deleteIt)
    {
        this.barrels = this.barrels.filter(b => deleteIt(b) == false);
    }

    setOmas(omas)
    {
        this.omas = omas;
    }

    getOmas()
    {
        return this.omas;
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports.Model = Model;

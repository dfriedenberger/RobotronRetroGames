class KeyBoard {
    
    constructor()
    {
        this.keys = {}
    }

    _identKey(keyCode) {
        var c = String.fromCharCode(keyCode);
        //console.log(keyCode+" "+c);
        switch(keyCode)
        {
            case 13:
                return 'enter';
            case 27:
                return 'esc';
            case 32:
                return 'jump';
            case 37:
                return 'left';
            case 38:
                return 'up';
            case 39:
                return 'right';
            case 40:
                return 'down';
            default:
                if(c == "P") return 'play';
                if(c == "L") return 'level';
                if(c == "I") return 'instruction';
                if(c == "E") return 'end';

                return undefined;
        }
    }

    keydown(keyCode) {
        
        var key = this._identKey(keyCode);
        if(key == undefined) return false;
        this.keys[key] = true;
        return true;
    }

    keyup(keyCode) {
        
        var key = this._identKey(keyCode);
        if(key == undefined) return false;

        delete this.keys[key];
        return true;
    }

    is(key)
    {
        return key in this.keys;
    }
  }
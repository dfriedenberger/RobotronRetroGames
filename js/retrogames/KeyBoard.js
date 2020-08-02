class KeyBoard {
    
    constructor()
    {
        this.keys = {}
    }

    _identKey(keyCode) {
        switch(keyCode)
        {
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
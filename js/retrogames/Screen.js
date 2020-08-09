class Screen {
  
    constructor(id) {
      this.id = id;
    }

    _getLength(line)
    {
      var l = 0;
      var esc = undefined;
      for (var x = 0, c=''; c = line.charAt(x); x++) { 

        if(c == "&") esc = "";
        if(c == ";") 
        {
          if(esc.endsWith("uml") || esc.endsWith("arr") || esc.endsWith("quot"))
            l -= esc.length;
          esc = undefined;
        }

        if(esc != undefined) 
           esc += c;
        
        l++;

      }
      return l;
    }
    printLines(lines) {
        $(this.id).empty();
        var l = lines.length;
        var space = Array(80).join(' ');
        for(var i = 0;i < 22;i++)
        {
            var line = "";
            if(i < l)
              line = lines[i];

            var ll = this._getLength(line);
            if(ll < 80)
            {
               line += space.substring(0,80 -ll);
            }
            if(ll > 80)
            {
              line = line.substring(0,80);
            }
            $(this.id).append(line+'\n');
        }
    }

  }
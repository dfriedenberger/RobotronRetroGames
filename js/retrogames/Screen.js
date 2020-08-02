class Screen {
    constructor(id) {
      this.id = id;
    }

    printLines(lines) {
        $(this.id).empty();
        var l = lines.length;
        for(var i = 0;i < l;i++)
        {
            $(this.id).append(lines[i]+'\n');
        }
    }

  }
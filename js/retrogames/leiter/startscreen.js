class StartScreen
{
    constructor(version)
    {
        this.version = version;
    }

    leiter = [
        "##                ##   ##",
        "##                     ##",
        "##         ####   ##  ####   ####   #######",
        "##        ##  ##  ##   ##   ##  ##  ##    ##",
        "##        ######  ##   ##   ######  ##",
        "##        ##      ##   ##   ##      ##",
        "########   ####   ##   ##    ####   ##"
    ];
   
    info = [
        "Version : ",
        "Computer: PC 1715",
        "Level : ",
        "Auf= &uarr; Abw.= &darr; Links= &larr; Rechts= &rarr;",
        "Sprung= Space"
    ];

    instruction = [
        "P = Start",
        "L = Level aendern",
        "I = Instruktion"
    ];
    

    replace(y,x,lines,content) {
        var space = Array(80).join(' ');
        var l = lines.length;
        var c = content.length;
        for(var i = 0;i < y + c;i++)
        {
            if(i >= lines.length)
                lines.push("");
            var ll = lines[i].length;
            if(ll < 80)
            {
                lines[i] += space.substring(0,80 -ll);
            }

            var ix = i - y;
            if(ix >= 0)
            {
                lines[i] = lines[i].substring(0,x) + content[ix] + lines[i].substring(x + content[ix].length);
            }

        }
    }    
    
  

    setLevel(level) 
    {
        this.level = level;
    }

    getLines() {
        var lines = [];

        this.replace(1,15,lines,this.leiter);

        var infox = 40;
        var infoy = 12;
        this.replace(infoy,infox,lines,this.info);
        this.replace(infoy,infox+this.info[0].length,lines,[this.version]);
        this.replace(infoy+2,infox+this.info[2].length,lines,["&quot;"+this.level+"&quot;"]);

        this.replace(12,5,lines,this.instruction);
        
        this.replace(18,5,lines,["Waehle bitte aus"]);

        

        return lines;

    }

    
}
$( document ).ready(function() {


    var screen = new Screen('#screen');
    var keyboard = new KeyBoard();


    $(document).keydown(function(e) {
        if(keyboard.keydown(e.keyCode))
            e.preventDefault();
    });
    $(document).keyup(function(e) {
        if(keyboard.keyup(e.keyCode))
            e.preventDefault();
    });


    var level = [
        { name: "EasyStreet" , id: level_easystreet },
        { name: "GhostTown" , id: level_ghosttown },
        { name: "BugCity" , id: level_bugcity },
        { name: "GangLand" , id: level_gangland },
        { name: "IdlePlace" , id: level_idleplace },
        { name: "LongIsland" , id: level_longisland },
        { name: "LongWalk" , id: level_longwalk },
        { name: "OneChance" , id: level_onechance },
        { name: "Plinko" , id: level_plinko },
        { name: "PointOfNoReturn" , id: level_pointofnoreturn },
        { name: "SecretRoad" , id: level_secretroad },
        { name: "SNP" , id: level_snp },
        { name: "SNPNotForBeginners" , id: level_snpnotforbeginners },
        { name: "TunnelVision" , id: level_tunnelvision }
    ];

    var model = undefined;
    var barrelStrategy = new BarrelStrategy();
    var playerStrategy = new PlayerStrategy();

    var play_init = function(level)
    {
        model = new Model(level);
        model.setPlayer(new Player(model.getStart()));
    };

    var play_run = function run()
    {

            screen.printLines(model.getLines());

          

            function check() {
                var match = false;
                var player = model.getPlayer();
                var ppos = player.getPosition();
                model.getBarrels().forEach(function(barrel) {
                    var bpos = barrel.getPosition();
                    if(ppos.x == bpos.x && ppos.y == bpos.y)
                    {
                        //reset
                        match = true;
                    }
                });

                if(match)
                {
                    //reset or end
                    var omas = model.getOmas();
                    omas--;
                    model.setOmas(omas);
                    if(omas > 0)
                    {
                        //reset
                        model.setPlayer(new Player(model.getStart()))
                        model.deleteBarrels(function(barrel) { return true; });
                    }
                    
                }

            }

            var player = model.getPlayer();
            var ppos = player.getPosition();
    
            var field = model.getField(ppos);
            if(field == '$')
            {
                model.setMessage("Gewonnen");
                screen.printLines(model.getLines());
                mode = 66;
                return;
            }
            
            playerStrategy.handle(model,keyboard);  
            check();

            barrelStrategy.handle(model);           

           
            check();

            if(model.getOmas() == 0)
            {
                model.setMessage("Verloren");
                screen.printLines(model.getLines());
                mode = 66;
                return;
            }

            if(keyboard.is('esc'))
            {
                mode = 0;
                return;
            }

    };

    var lix = 0;
    var start = new StartScreen("0.0.1");
    start.setLevel(level[0].name);
    screen.printLines(start.getLines());

    function instruction()
    {
        screen.printLines(help_instruction);
        if(keyboard.is('enter'))
        {
            mode = 0;
        }
    }

    function main()
    {
        screen.printLines(start.getLines());
        if(keyboard.is('play'))
        {
            mode = 2;
        }
        if(keyboard.is('level'))
        {
            lix = (lix +1)%level.length;
            start.setLevel(level[lix].name);

        }
        if(keyboard.is('instruction'))
        {
            mode = 99;
        }
    }


    var mode = 0;
    function loop()
    {

        switch(mode)
        {
            default: //main
                main();
                break;
            case 2:
                play_init(level[lix].id);
                mode = 3; 
                //Fallthrough
            case 3:
                play_run();
                break;
            case 66: //Pause
              mode = 0;
              break;
            case 99: //instruction
                instruction();
                break;                
        }

    }

    setInterval(loop,100);

    

});
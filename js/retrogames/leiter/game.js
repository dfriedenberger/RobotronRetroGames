$( document ).ready(function() {

    console.log( "ready!" );

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

    var model = new Model(level_easystreet);


    var barrelStrategy = new BarrelStrategy(model);

    model.setPlayer(new Player(model.getStart()))

    function run()
    {
        screen.printLines(model.getLines());

        function canFallDown(field)
        {
            switch(field)
            {
                case ' ':
                case '&':
                        return true;
                default:
                    return false;
            }
        }
        function canMove(field)
        {
            switch(field)
            {
                case '':
                case '=':
                    return false;
                default:
                    return true;
            }
        }
        function canMoveUpDown(field)
        {
            switch(field)
            {
                case 'H':
                case '$':
                    return true;
                default:
                    return false;
            }
        }

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

        function canJumpFromPlatform(field)
        {
            switch(field)
            {
                case 'H':
                case '=':
                case '-':
                    return true;
                default:
                    return false;
            }
        }
        //move person
        var player = model.getPlayer();
        var ppos = player.getPosition();
  
        var field = model.getField(ppos);
        if(field == '&')
        {
            model.setField(ppos,' ');
            model.addPoints(300);
        }

        if(field == '$')
        {
            model.setMessage("Gewonnen");
            screen.printLines(model.getLines());
            return;
        }

        var platformpos = { x: ppos.x, y: ppos.y + 1};
        var platformfield = model.getField(platformpos);

        var jump = player.getJumpMode();

        if(jump == undefined)
        {
            var nextpos =  { x: ppos.x, y: ppos.y+1 };
            var nextfield = model.getField(nextpos);
            if(canFallDown(nextfield))
            {
                //fall down
                player.setPosition(nextpos);

            } else {

                if(keyboard.is('right')) {
                    var nextpos =  { x: ppos.x + 1, y: ppos.y };
                    var nextfield = model.getField(nextpos);
                    if(canMove(nextfield))
                    {
                        player.setPosition(nextpos);
                    }
                }
                if(keyboard.is('left')) 
                {
                    var nextpos =  { x: ppos.x - 1, y: ppos.y };
                    var nextfield = model.getField(nextpos);
                    if(canMove(nextfield))
                    {
                        player.setPosition(nextpos);
                    }
                }
                if(keyboard.is('up')) 
                {
                    var nextpos =  { x: ppos.x, y: ppos.y - 1};
                    var nextfield = model.getField(nextpos);
                    if(canMoveUpDown(nextfield))
                    {
                        player.setPosition(nextpos);
                    }
                }
                if(keyboard.is('down')) 
                {
                    var nextpos =  { x: ppos.x, y: ppos.y + 1};
                    var nextfield = model.getField(nextpos);
                    if(canMoveUpDown(nextfield))
                    {
                        player.setPosition(nextpos);
                    }
                }
            }
            if(keyboard.is('jump')) 
            {
                if(canJumpFromPlatform(platformfield))
                {
                    jump = {
                        cnt: 0,
                        direction: 'up',
                        pos: { x: 0, y: -1 }
                    };
                    if(keyboard.is('right')) jump.pos.x = 1;
                    if(keyboard.is('left')) jump.pos.x = -1;
                }
            }
        }
        
        if(jump != undefined)
        {
            var nextpos =  { x: ppos.x + jump.pos.x , y: ppos.y + jump.pos.y};
            var nextfield = model.getField(nextpos);
            switch(jump.direction)
            {
                case 'up':
                    if(canMove(nextfield))
                    {
                        player.setPosition(nextpos);
                        jump.cnt++;
                        if(jump.cnt > 1)
                        {
                            jump.direction = 'down';
                            jump.pos.y = 1;
                        }
                        if(nextfield == 'H')
                        {
                            jump = undefined;
                        }
                    }
                    else 
                        jump = undefined;
                    break;
                case 'down':
                    if(canFallDown(nextfield))
                    {
                        player.setPosition(nextpos);
                        if(nextfield == 'H')
                        {
                            jump = undefined;
                        }                    
                    }
                    else 
                        jump = undefined;
                    break;
            }
            player.setJumpMode(jump);
        
        }

        if(platformfield == '-')
        {
            model.setField(platformpos,' ');
        }
        
        check();


        barrelStrategy.cleanUpBarrels();

        //move barrels
        model.getBarrels().forEach(function(barrel) {

            var pos = barrel.getPosition();
            var nextpos =  { x: pos.x, y: pos.y+1 };
            var nextfield = model.getField(nextpos);

            if(canFallDown(nextfield))
            {
                //fall down
                barrel.setPosition(nextpos);
                barrel.setDirection(0);
            } else {
                var dir = barrel.getDirection();
                if(dir != 0)
                {
                    var nextpos =  { x: pos.x +  dir, y: pos.y };
                    var nextfield = model.getField(nextpos);
                    if(canMove(nextfield))
                    {
                        barrel.setPosition(nextpos);
                    }
                    else
                    {
                        dir = 0;
                    }
                }
                if(dir == 0)
                {
                    var rightpos =  { x: pos.x +  1, y: pos.y };
                    var rightfield = model.getField(rightpos);

                    var leftpos =  { x: pos.x - 1, y: pos.y };
                    var leftfield = model.getField(leftpos);

                    if(!canMove(leftfield))
                    {
                        barrel.setPosition(rightpos);
                        barrel.setDirection(1);
                    } 
                    else if(!canMove(rightfield))
                    {
                        barrel.setPosition(leftpos);
                        barrel.setDirection(-1);
                    }
                    else {
                        var r = Math.random();
                        if(r < 0.5)
                        {
                            barrel.setPosition(rightpos);
                            barrel.setDirection(1);
                        }
                        else
                        {
                            barrel.setPosition(leftpos);
                            barrel.setDirection(-1);
                        }

                    }

                }
            }

        })
        //create Sbarrels
        if(model.getBarrels().length < model.getMaxBarrels())
        {
            model.getSources().forEach(function (source) {
                var r = Math.random();
                if(r > model.getBarrelPosibility()) return;
                model.addBarrel(new Barrel(source));
            });
        }

        check();

        if(model.getOmas() == 0)
        {
            model.setMessage("Verloren");
            screen.printLines(model.getLines());
            return;
        }

        //restart
        setTimeout(run, 100);

    }

    run();

});
class PlayerStrategy {

    handle(model,keyboard)
    {
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
     
    }

}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports.PlayerStrategy = PlayerStrategy;


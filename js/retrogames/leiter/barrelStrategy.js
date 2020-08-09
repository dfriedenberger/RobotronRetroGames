class BarrelStrategy {

    handle(model)
    {
        
        function canFallDown(field)
        {
            switch(field)
            {
                case ' ':
                case '^':
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

        //delete barrels who reached ther goals
        model.deleteBarrels(function(barrel) {

            var pos = barrel.getPosition();
            var field = model.getField(pos);
            //TODO config
            if(field == '*') return true;
            return false;

        });

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

        //create new barrels
        if(model.getBarrels().length < model.getMaxBarrels())
        {
            model.getSources().forEach(function (source) {
                var r = Math.random();
                if(r > model.getBarrelPosibility()) return;
                model.addBarrel(new Barrel(source));
            });
        }


    }

}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports.BarrelStrategy = BarrelStrategy;


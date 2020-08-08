class BarrelStrategy {

    constructor(model) {
        this.model = model;
    }

    cleanUpBarrels() {

        var model = this.model;
        //delete barrels wich reached target '*'
        model.deleteBarrels(function(barrel) {

            var pos = barrel.getPosition();
            var field = model.getField(pos);

            //TODO config
            if(field == '*') return true;
            
            return false;

        });
    }
}
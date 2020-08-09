var expect  = require('chai').expect;
var BarrelStrategy = require('../../js/retrogames/leiter/barrelStrategy.js').BarrelStrategy;
var Barrel = require('../../js/retrogames/leiter/barrel.js').Barrel;
var Model = require('../../js/retrogames/leiter/model.js').Model;



describe('BarrelStrategy', function() {
    describe('handle', function() {

        it('delete barrels in goal', function(done) {
        
            var levelMock = {
                map: []
            }

            var modelMock = new Model(levelMock);
            modelMock.getField = function(pos)
            {
                if(pos.x == 0) return "*";
                return " ";
            }

            modelMock.addBarrel(new Barrel({x:0 }));
            modelMock.addBarrel(new Barrel({x:0 }));
            modelMock.addBarrel(new Barrel({x:1 }));

            var barrelStrategy = new BarrelStrategy(modelMock);

            barrelStrategy.handle();

            expect(modelMock.getBarrels().length).to.be.equal(1);

            done();
        });

       
    });
});
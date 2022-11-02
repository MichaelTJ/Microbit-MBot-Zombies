
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#f7cac9',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
        //render: render
    },
    plugins: {
        scene: [
            {
                key: 'PhaserRaycaster',
                plugin: PhaserRaycaster,
                mapping: 'raycasterPlugin'
            }
        ]
    }
};


var game = new Phaser.Game(config);
var microbits = [];
var beacons = [];
var mBots;
var zombies;
function preload ()
{
    this.load.image('mBot', 'assets/mBot.png');
    this.load.image('green', 'assets/green.png');
    this.load.image('red', 'assets/red.png');
}
function create ()
{
    globalScene = game.scene.scenes[0];
    globalScene.raycaster = globalScene.raycasterPlugin.createRaycaster({debug:false});
    globalScene.ray = globalScene.raycaster.createRay();

    mBots = this.physics.add.group();

    if(level === 0){
        let numberOfmicrobits = 1;
        for(let i=0;i<numberOfmicrobits;i++){
            //each microbit creates an mBot to add to group above
            microbits.push(new Microbit(this, i));
            
            microbits[i].wrapFunctions();
        }
        microbits.push(new Beacon(this, 255, 'green'));
        

    }

    else if(level === 1){
        let numberOfmicrobits = 10;
        for(let i=0;i<numberOfmicrobits;i++){
            //each microbit creates an mBot to add to group above
            microbits.push(new Microbit(this, i));
            
            microbits[i].wrapFunctions();
        }
    }
    else if(level ===2){
        
        let numberOfmicrobits = 5;
        for(let i=0;i<numberOfmicrobits;i++){
            //each microbit creates an mBot to add to group above
            microbits.push(new Microbit(this, i));
            microbits[i].wrapFunctions();
        }

    }
    
    
    globalScene.raycaster.mapGameObjects(mBots.getChildren());

    boundaries = this.physics.add.group();
    createBoundary(5, 300, 10, 600);
    createBoundary(795, 300, 10, 600);
    createBoundary(400, 5, 800, 10);
    createBoundary(400, 595, 800, 10);
    globalScene.raycaster.mapGameObjects(boundaries.getChildren());
    
    globalScene.physics.add.collider(mBots, mBots);
    globalScene.physics.add.collider(mBots, boundaries);

    
}
function createBoundary(x,y,width,height){
    let temp = globalScene.physics.add.sprite(x, y, '');
    temp.setDisplaySize(width, height);
    temp.body.setImmovable(true);
    temp.setPushable(false);
    boundaries.add(temp);
}

function update ()
{
    //if they have a forever function, run it.
    microbits.forEach(microbit => {
        curMicro = microbit;
        if(curMicro.isProcessingLast){return;}
        curMicro.forever();
    });


    

}





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
        let numberOfmicrobits = 10;
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

//Fill in the blanks (_____) with a helpful comment
//________________________________________
var ourData = [];
//Special function that runs once per frame of the game
function update ()
{
    //________________________________________
    var thisFrameData = [];
    //________________________________________
    thisFrameData.push(this.time.now);

    //foreach microbit in the array of microbits (robots)
    microbits.forEach(microbit => {
        //____________________________________
        thisFrameData.push(microbit.mBot.x)
        thisFrameData.push(microbit.mBot.y)

        //if the microbit has a forever function
        //deal with async await issues then run it
        curMicro = microbit;
        if(curMicro.isProcessingLast){return;}
        curMicro.forever();
    });
    //_________________________________________
    ourData.push(thisFrameData);
}


//create a function that ______________________  
function download_csv_file() {  
  
    //____________________________________________ 
    var csv = 'Time (ms),'
    //____________________________________________
    for(let i=0;i<microbits.length;i++){
        //____________________________________________
        csv += `M${i} x, M${i} y,`;
    } 
    //____________________________________________
    csv+='\n';
    
    //____________________________________________ 
    ourData.forEach(function(row) {  
            //____________________________________________
            csv += row.join(',');  
            csv += "\n";  
    });  
   
    //display the created CSV data on the web browser   
    //document.write(csv);  
  
    //____________________________________________
    var hiddenElement = document.createElement('a');  
    //Set the csv data as what opens when you click the link
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);  
    //Set the target of the link to a new tab so it doesn't stop
    //the sim
    hiddenElement.target = '_blank';  
      
    //____________________________________________ 
    hiddenElement.download = 'MBot data.csv';
    //____________________________________________  
    hiddenElement.click();  
}  




class Beacon extends Microbit{
    constructor(scene, id, type){
        super(scene, id);
        if(type==='green'){
            this.mBot.setTexture('green');
        }else{
            this.mBot.setTexture('red');
        }
    }
}
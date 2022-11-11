class Beacon extends Microbit{
    constructor(scene, id, type){
        super(scene, id);
        if(type==='green'){
            this.mBot.setTexture('green');
        }else{
            this.mBot.setTexture('red');
        }
        this.mBot.setScale(1);
        this.mBot.setSize(30,30,true);
        this.mBot.setImmovable(true);
        this.forever = () => {}
        this.onReceivedNumber = () => {}
        this.onStart(scene)
    }
    onStart(scene){
        let timer = scene.time.addEvent({
            delay: 1000,                // ms
            callback: this.sendBeaconRadioSig,
            //args: [],
            callbackScope: this,
            loop: true
        });
        
    }
    sendBeaconRadioSig(){
        //console.log('sig sent');
        let origMicro = curMicro;
        curMicro=this;
        radio.sendNumber(0)
        curMicro = origMicro;
    }

}
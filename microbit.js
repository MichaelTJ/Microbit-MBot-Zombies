//global vars required for radio communication.
//When a signal is sent, the other robots process the signal before
//the original robot continues.
var curMicro = null;
var curRadio = null;

//RadioPacketProperty
class RadioPacketPropertyHolder {
    constructor(value, distance, time, serial){
        this.value = value;
        this.SignalStrength = distance;
        this.SerialNumber = serial;
    }
}
var RadioPacketProperty = new RadioPacketPropertyHolder(undefined,undefined,undefined,undefined);

//Each microbit contains an mBot
//it communicates through showLeds() below.
class Microbit {
    constructor(scene, id) {
        this.mBot = new mBot(globalScene, Phaser.Math.Between(50,750), Phaser.Math.Between(50,550));
        this.mBot._id=id;
        this.id = id;
        this.group = null;
        this.freqBandNum = 0;
        this.onReceivedNumber = undefined;
        this.onReceivedString = undefined;
        this.onReceivedvalue = undefined;
        this.isProcessingLast = false;
        this.forever = undefined;
        this.serialNumber = Phaser.Math.Between(0, 1000000);
        this.curPacket = undefined;
        curMicro = this;
        RadioPacketProperty = null;
        //this.followText = globalScene.add.text(0, 0, id);
        //this.curActionFunctions = [];
    }
    
    wrapFunctions(){
        curMicro = this;
        scratchCode();
        //curMicro=this;
    }

}

class basic {
    
    static async pause(time){
        let contextMicro = curMicro;
        await this.waitup(time);
        curMicro = contextMicro;
        //await this.waitup(time);
        //setup a timer with callback
        //setTimeout(resolve, time)
    }

    static waitup(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    static forever(func){
        //only need to write this func once.
        if(curMicro.forever== undefined){
            curMicro.forever = async() => {
                if(curMicro.isProcessingLast){return;}
                curMicro.isProcessingLast=true;
                await func();
                curMicro.isProcessingLast=false;
            }
        }
    }
    //depending on the number of lights, mBot drives a certain way.
    static showLeds(ledArray){
        if(ledArray.split('#').length-1==0){curMicro.mBot.stop();}
        else if(ledArray.split('#').length-1==5){curMicro.mBot.driveBackwards();}
        else if(ledArray.split('#').length-1==10){curMicro.mBot.driveForwards();}
        else if(ledArray.split('#').length-1==15){curMicro.mBot.turnLeft();}
        else if(ledArray.split('#').length-1==20){curMicro.mBot.turnRight();}
        else if(ledArray.split('#').length-1==25){curMicro.mBot.zombie();}
    }
    
}

class input {
    static compassHeading(){
        return curMicro.mBot.rotation;
    }
}


function getSignalStrength(m1,m2){
    //should change to logorithmic
    //function so 30cm = -30, 200cm ~ -60 300cm = -90
    let dist = Phaser.Math.Distance.BetweenPoints(m1,m2)//distance function,
    
    return -dist+Phaser.Math.Between(-5,5);
}

class radio {

    static receivedPacket(property){
        return property;
    }

    static setGroup(groupNum){
        curMicro.group = groupNum;
    }
    
    static onReceivedNumber(func) {
        //only need to write this func once.
        if(curMicro.onReceivedNumber== undefined){
            curMicro.onReceivedNumber = async () => {
                if(curMicro.isProcessingLast){return;}
                curMicro.isProcessingLast=true;
                await func();
                curMicro.isProcessingLast=false;
            }
        }
    }
    
    static onReceivedString(func) {
        if(curMicro.onReceivedString== undefined){
            curMicro.onReceivedString = async () => {
                if(curMicro.isProcessingLast){return;}
                curMicro.isProcessingLast=true;
                await func();
                curMicro.isProcessingLast=false;
            }
        }
    }
    
    static onReceivedValue(func) {
        if(curMicro.onReceivedValue== undefined){
            curMicro.onReceivedValue = async () => {
                if(curMicro.isProcessingLast){return;}
                curMicro.isProcessingLast=true;
                await func();
                curMicro.isProcessingLast=false;
            }
        }
    }
    
    static setFrequencyBand(freqBandNum){
        this.freqBandNum = freqBandNum;
    }
    
    static sendNumber(num){
        let originalMicro = curMicro;
        let originalPacket = RadioPacketProperty;
        microbits.forEach(microbit => {
            //don't send to self
            if(microbit==curMicro){return;}
            curMicro = microbit;
            //add delay with callback
            RadioPacketProperty = new RadioPacketPropertyHolder(
                num, 
                getSignalStrength(originalMicro, curMicro),
                game.getTime(),//curTime
                originalMicro.serialNumber);
            //microbit.curPacket = packet;
            curMicro.onReceivedNumber(num);
            //needs testing to see if originalMicro gets changed
            curMicro = originalMicro;
            RadioPacketProperty = originalPacket;
        });
    }
    
    static sendString(str){
        let originalMicro = curMicro;
        let originalPacket = RadioPacketProperty;
        microbits.forEach(microbit => {
            //don't send to self
            if(microbit==curMicro){return;}
            //add delay with callback
            RadioPacketProperty = new RadioPacketPropertyHolder(
                value, 
                getSignalStrength(curMicro, microbit),
                game.getTime(),//curTime
                curMicro.serialNumber);
            //microbit.curPacket = packet;
            microbit.onReceivedString(str);
            //needs testing to see if originalMicro gets changed
            curMicro = originalMicro;
            RadioPacketProperty = originalPacket;
        });
    }
    
    static sendValue(name, value){
        let originalMicro = curMicro;
        let originalPacket = RadioPacketProperty;
        microbits.forEach(microbit => {
            //don't send to self
            if(microbit==curMicro){return;}
            //add delay with callback
            RadioPacketProperty = new RadioPacketPropertyHolder(
                value, 
                getSignalStrength(curMicro, microbit),
                game.getTime(),//curTime
                curMicro.serialNumber);
            //microbit.curPacket = packet;
            microbit.onReceivedValue(name, value);
            //needs testing to see if originalMicro gets changed
            curMicro = originalMicro;
            RadioPacketProperty = originalPacket;
        });
    }

    static setTransmitPower(num){

    }
}

class control{
    static deviceSerialNumber(){
        return curMicro.serialNumber;
    }
}
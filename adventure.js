let myText = "";
class AdventureScene extends Phaser.Scene {

    init(data) {
        this.inventory = data.inventory || [];
    }

    constructor(key, name) {
        super(key);
        this.name = name;
    }
    //let myText = "";
    create() {
        this.transitionDuration = 1000;

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;

        this.cameras.main.setBackgroundColor('#444');
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);

        this.add.rectangle(this.w * 0.75, 0, this.w * 0.25, this.h).setOrigin(0, 0).setFillStyle(0);
        myText = this.add.text(this.w * 0.75 + this.s, this.s)
            .setText(this.name)
            .setStyle({ fontSize: `${3 * this.s}px` })
            .setWordWrapWidth(this.w * 0.25 - 2 * this.s);
        
        this.messageBox = this.add.text(this.w * 0.75 + this.s, this.h * 0.33)
            .setStyle({ fontSize: `${2 * this.s}px`, color: '#eea' })
            .setWordWrapWidth(this.w * 0.25 - 2 * this.s);

        this.inventoryBanner = this.add.text(this.w * 0.75 + this.s, this.h * 0.66)
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setText("Inventory")
            .setAlpha(0);

        this.inventoryTexts = [];
        this.updateInventory();

        this.add.text(this.w-3*this.s, this.h-3*this.s, "📺")
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('Fullscreen?'))
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });

        this.onEnter();

    }

    showMessage(message) {
        this.messageBox.setText(message);
        this.tweens.add({
            targets: this.messageBox,
            alpha: { from: 1, to: 0 },
            easing: 'Quintic.in',
            duration: 4 * this.transitionDuration
        });
    }

    updateInventory() {
        if (this.inventory.length > 0) {
            this.tweens.add({
                targets: this.inventoryBanner,
                alpha: 1,
                duration: this.transitionDuration
            });
        } else {
            this.tweens.add({
                targets: this.inventoryBanner,
                alpha: 0,
                duration: this.transitionDuration
            });
        }
        if (this.inventoryTexts) {
            this.inventoryTexts.forEach((t) => t.destroy());
        }
        this.inventoryTexts = [];
        let h = this.h * 0.66 + 3 * this.s;
        this.inventory.forEach((e, i) => {
            let text = this.add.text(this.w * 0.75 + 2 * this.s, h, e)
                .setStyle({ fontSize: `${1.5 * this.s}px` })
                .setWordWrapWidth(this.w * 0.75 + 4 * this.s);
            h += text.height + this.s;
            this.inventoryTexts.push(text);
        });
    }

    hasItem(item) {
        return this.inventory.includes(item);
    }

    gainItem(item) {
        console.log("gaining item");
        if (this.inventory.includes(item)) {
            console.warn('gaining item already held:', item);
            return;
        }
        this.inventory.push(item);
        this.updateInventory();
        for (let text of this.inventoryTexts) {
            if (text.text == item) {
                this.tweens.add({
                    targets: text,
                    x: { from: text.x - 20, to: text.x },
                    alpha: { from: 0, to: 1 },
                    ease: 'Cubic.out',
                    duration: this.transitionDuration
                });
            }
        }
    }

    makeDropZone(sprite){
        sprite.setInteractive({
            dropZone: true,
        });
    }


    setupObject(circ, Circ, name, message){
        let me = this;
        map1.set(name, 0);
        circ.setInteractive();
        circ.setAlpha(.000001);
        console.log(circ);
        circ.on('pointerdown', () =>{
            this.showMessage(message);
            if (map1.get(name) == 0){
                map1.set(name, 1);
                foundMap.set(name, 1);
                letNumFound1++;
                console.log(letNumFound1);
            }
            //console.log("found object");
            this.tweens.add({
                targets: Circ,
                alpha: 0,
                duration: 3000,
            });
            this.tweens.add({
                targets: circ,
                alpha: .40,
                duration: 1000,
            })
        });
    }
    setupObject2(circ, Circ, name, message){
        let me = this;
        map1.set(name, 0);
        circ.setInteractive();
        circ.setAlpha(.000001);
        console.log(circ);
        circ.on('pointerdown', () =>{
            this.showMessage(message);
            if (map1.get(name) == 0){
                map1.set(name, 1);
                foundMap.set(name, 1);
                letNumFound2++;
                console.log(letNumFound2);
            }
            //console.log("found object");
            this.tweens.add({
                targets: Circ,
                alpha: 0,
                duration: 3000,
            });
            this.tweens.add({
                targets: circ,
                alpha: .40,
                duration: 1000,
            })
        });
    }
    setupObject3(circ, Circ, name, message){
        let me = this;
        map1.set(name, 0);
        circ.setInteractive();
        circ.setAlpha(.000001);
        console.log(circ);
        circ.on('pointerdown', () =>{
            this.showMessage(message);
            if (map1.get(name) == 0){
                map1.set(name, 1);
                foundMap.set(name, 1);
                letNumFound3++;
                console.log(letNumFound3);
            }
            //console.log("found object");
            this.tweens.add({
                targets: Circ,
                alpha: 0,
                duration: 3000,
            });
            this.tweens.add({
                targets: circ,
                alpha: .40,
                duration: 1000,
            })
        });
    }
    loseItem(item) {
        if (!this.inventory.includes(item)) {
            console.warn('losing item not held:', item);
            return;
        }
        for (let text of this.inventoryTexts) {
            if (text.text == item) {
                this.tweens.add({
                    targets: text,
                    x: { from: text.x, to: text.x + 20 },
                    alpha: { from: 1, to: 0 },
                    ease: 'Cubic.in',
                    duration: this.transitionDuration
                });
            }
        }
        this.time.delayedCall(500, () => {
            this.inventory = this.inventory.filter((e) => e != item);
            this.updateInventory();
        });
    }

    

    make_draggable(head){
        head.setInteractive({
            draggable:true,
            useHandCursor: true,
        });
        head.on('drag', (pointer, dragX, dragY) => {
            head.x = dragX;
            head.y = dragY;
        });
    }

    enlarge_on_mouse(b1){
        let me = this;
        b1.on('pointerover', () => {
            me.add.tween({
                targets: b1,
                duration: 70,
                scale: .28,
            });
            this.showMessage("Click to enter!")
        });
        b1.on('pointerout', () => {
            me.add.tween({
                targets: b1,
                duration: 70,
                scale: .25,
            });
        });
    }

    gotoScene(key) {
        this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
        this.time.delayedCall(this.transitionDuration, () => {
            this.scene.start(key, { inventory: this.inventory });
        });
    }

    onEnter() {
        console.warn('This AdventureScene did not implement onEnter():', this.constructor.name);
    }
}
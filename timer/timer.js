class Timer {

    constructor(durationInput, startBtn, pauseBtn, callbacks) {
        this.durationInput = durationInput;
        this.startBtn = startBtn;
        this.pauseBtn = pauseBtn;

        this.startBtn.addEventListener('click', this.start);
        this.pauseBtn.addEventListener('click', this.pause);

        this.durationInput.addEventListener('change', this.durationChange);

        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

    }

    start = () => {
        this.timeRemaining = parseInt(this.durationInput.value);
        this.tick();
        this.id = setInterval(this.tick, 50);
        if (this.onStart) this.onStart(this.timeRemaining);
    }
    pause = () => {
        clearInterval(this.id);
    }

    durationChange = () => {
        this.timeRemaining = this.durationInput.value
        console.log('Duration changed!');
    }
    tick = () => {
        this.timeRemaining = this.timeRemaining - 0.05;
        if (this.timeRemaining < 0) {
            this.pause();
            if (this.onComplete) this.onComplete();
        } else {
            this.durationInput.value = this.timeRemaining.toFixed(2);
            if (this.onTick) this.onTick(this.timeRemaining);
        }
    }
}
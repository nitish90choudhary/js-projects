const durationInput = document.querySelector('#duration');
const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const circle = document.querySelector('circle');
const perimeter = 2 * Math.PI * circle.getAttribute('r');
circle.setAttribute('stroke-dasharray', perimeter);

let currentOffset = 0;
let duration=0;
const timer = new Timer(durationInput, startBtn, pauseBtn, {
    onStart(totalDuration) {
        duration=totalDuration;
        console.log('Timer started!');
    },
    onTick(remaining) {
        currentOffset = ((remaining/duration)*perimeter)-perimeter;
        circle.setAttribute('stroke-dashoffset', currentOffset);
       

    },
    onComplete() {
        currentOffset=0;
        circle.setAttribute('stroke-dashoffset', 0);
        console.log('Timer completed!');
    }
});
class UI {
    constructor() {
        this.totalDistance = document.getElementById('total-distance');
        this.generation = document.getElementById('generation');
        this.status = document.getElementById('status');
    }

    displayTotalDistance(distance) {
        this.totalDistance.innerText = distance.toFixed(2);
    }

    displayGeneration(generation) {
        this.generation.innerText = generation;
    }

    displayStatus(running) {
        if (running) {
            this.status.innerText = 'Running';
            this.status.className = 'green';
        } else {
            this.status.innerText = 'Not running';
            this.status.className = 'red';
        }
    }
}

export default UI;
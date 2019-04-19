class UI {
    constructor(document) {
        this.totalDistance = document.getElementById('total-distance');
        this.generation = document.getElementById('generation');
        this.status = document.getElementById('status');
    }

    displayTotalDistance(distance) {
        if (typeof distance !== 'number') {
            throw 'Distance must be a number';
        }

        this.totalDistance.innerText = distance.toFixed(2).toString();
    }

    displayGeneration(generation) {
        if (typeof generation !== 'number') {
            throw 'Generation must be a number'
        }

        this.generation.innerText = generation.toString();
    }

    displayStatus(running) {
        if (typeof running !== 'boolean') {
            throw 'Running must be a boolean';
        }

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
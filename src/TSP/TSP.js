class TSP {
    constructor(tour, tempTour, ui, canvas) {
        this.tour = tour;
        this.tempTour = tempTour;
        this.running = false;
        this.ui = ui;
        this.canvas = canvas;
    }

    setupTour(vertices) {
        this.tour.vertices = [...vertices];
        this.tour.updateTourProperties();
        this.canvas.drawTour(this.tour.vertices, this.tour.edges);
        this.ui.displayTotalDistance(this.tour.totalDistance);
        this.ui.displayGeneration(0);
        this.tempTour.resetTour();
    }

    runSimulation() {
        if (!this.running) {
            this.running = true;
            this.twoOpt();
        }
    }

    stopSimulation() {
        this.running = false;
    }

    twoOptSwap(i, k) {
        // take route[0] to route[i - 1] and add them in order to new_route
        for (let a = 0; a < i; a++) {
            this.tempTour.vertices[a] = this.tour.vertices[a];
        }

        // take route[i] to route[k] and add them in reverse order to new_route
        let dec = 0;
        for (let a = i; a <= k; a++) {
            this.tempTour.vertices[a] = this.tour.vertices[k - dec];
            dec++;
        }

        // take route[k+1] to end and add them in order to new_route
        for (let a = k + 1; a < this.tour.vertices.length; a++) {
            this.tempTour.vertices[a] = this.tour.vertices[a];
        }

        this.tempTour.updateTourProperties();
    }

    async twoOpt() {
        let improved = true;
        let generation = 0;
        this.ui.displayGeneration(generation);
        this.ui.displayStatus(true);
        const n = this.tour.vertices.length;

        while (improved && this.running) {
            improved = false;
            generation++;
            for (let i = 1; i < n - 1; i++) {
                if (!this.running) break;
                for (let k = i + 1; k < n; k++) {
                    if (!this.running) break;
                    this.twoOptSwap(i, k);
                    this.ui.displayGeneration(generation)

                    if (this.tempTour.totalDistance < this.tour.totalDistance) {
                        improved = true;
                        this.tour.vertices = [...this.tempTour.vertices];
                        this.tour.updateTourProperties();
                        this.ui.displayTotalDistance(this.tour.totalDistance);
                        await this.canvas.drawTour(this.tour.vertices, this.tour.edges);
                    }
                }
            }
        }
        this.ui.displayStatus(false);
        this.running = false;
    }
}

export default TSP;
import TSP from './TSP';

let tsp;

class MockTour {
    constructor() {
        this.vertices = [];
        this.tourUpdated = false;
        this.totalDistance;
        this.tourReset = false;
    }
    updateTourProperties() {
        this.tourUpdated = true;
    }
    resetTour() {
        this.tourReset = true;
    }
}

class MockUI {
    constructor() {
        this.displayStatusCalled = false;
        this.displayTotalDistanceCalled = false;
        this.displayGenerationCalled = false;
    }
    displayStatus() {
        this.displayStatusCalled = true;
    }
    displayTotalDistance() {
        this.displayTotalDistanceCalled = true;
    }
    displayGeneration() {
        this.displayGenerationCalled = true;
    }
}

class MockCanvas {
    constructor() {
        this.drawTourCalled = false;
    }

    drawTour() {
        this.drawTourCalled = true;
    }
}

describe("Test setupTour", () => {
    beforeEach(() => {
        tsp = new TSP(new MockTour(), new MockTour(), new MockUI(), new MockCanvas());
    });

    it("Should set up the tour according to vertices given and execute tour's updateTourProperties", () => {
        tsp.setupTour([1, 2, 3, 4, 5]);
        expect(tsp.tour.vertices).toEqual([1, 2, 3, 4, 5]);
        expect(tsp.tour.tourUpdated).toEqual(true);
    });

    it("Should call the tempTour's resetTour", () => {
        expect(tsp.tempTour.tourReset).toBe(false);
        tsp.setupTour([1, 2, 3, 4, 5]);
        expect(tsp.tempTour.tourReset).toBe(true);
    })
})

describe("Test runSimulation", () => {
    it("Should set running to true and run twoOpt", () => {
        tsp.twoOptExecuted = false;
        tsp.twoOpt = () => { tsp.twoOptExecuted = true }
        tsp.runSimulation();

        expect(tsp.running).toBe(true);
        expect(tsp.twoOptExecuted).toBe(true);
    });
});

describe("Test stopSimulation", () => {
    it("Should set running to false", () => {
        tsp.running = true;
        tsp.stopSimulation();
        expect(tsp.running).toBe(false);
    });
});

describe("Test twoOptSwap", () => {
    it("Should swap elements correctly: i = 3, k = 6 and output is set in tempTour. Then execute updateTourProperties in tempTour.", () => {
        const input = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A'];
        const output = ['A', 'B', 'C', 'G', 'F', 'E', 'D', 'H', 'A'];
        tsp.tour.vertices = input;
        tsp.tempTour.updateExecuted = false;
        tsp.twoOptSwap(3, 6);
        expect(tsp.tempTour.vertices).toEqual(output);
        expect(tsp.tempTour.tourUpdated).toBe(true);

        // check to see if original tour is still the same
        expect(tsp.tour.vertices).toEqual(input);
    })
})

describe("Test twoOpt", () => {
    beforeEach(() => {
        tsp = new TSP(new MockTour(), new MockTour(), new MockUI(), new MockCanvas());
        tsp.setupTour([{ x: 77, y: 12 }, { x: 20, y: 20 }, { x: 50, y: 40 }, { x: 25, y: 10 }, { x: 30, y: 11 }]);
        tsp.running = true;
    });

    it("Should call twoOptSwap to swap points", () => {
        tsp.twoOptSwapCalled = false;
        tsp.twoOptSwap = (i, j) => { tsp.twoOptSwapCalled = true }
        tsp.twoOpt();
        expect(tsp.twoOptSwapCalled).toBe(true);
    });

    it("Should call its UI displayStatus", () => {
        tsp.twoOpt();
        expect(tsp.ui.displayStatusCalled).toBe(true);
    });

    it("Should call its UI displayTotalDistance", () => {
        let tourDistance = 0;
        tsp.twoOptSwap = (i, j) => { tsp.tour.totalDistance = tourDistance++; tsp.tempTour.totalDistance = 5 }
        tsp.twoOpt();
        expect(tsp.ui.displayTotalDistanceCalled).toBe(true);
    });

    it("Should call its UI displayGeneration", () => {
        tsp.twoOpt();
        expect(tsp.ui.displayGenerationCalled).toBe(true);
    });
});
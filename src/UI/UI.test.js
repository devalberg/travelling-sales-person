import UI from './UI';

describe("Test Status update", () => {
    let ui;
    beforeEach(() => {
        document.body.innerHTML = `<div id="status"> Not running </div>`
        ui = new UI(document);
    });

    it('Should throw an error', () => {
        expect(() => ui.displayStatus(123)).toThrow();
        expect(() => ui.displayStatus('true')).toThrow();
    });

    it('Should update the status to "Running" and class of "green"', () => {
        ui.displayStatus(true);
        const status = document.getElementById('status');
        const text = status.innerText;
        const className = status.className;
        expect(text).toBe('Running');
        expect(className).toBe('green');
    });

    it('Should update the status to "Not running" and class of "red"', () => {
        ui.displayStatus(true);
        ui.displayStatus(false);
        const status = document.getElementById('status');
        const text = status.innerText;
        const className = status.className;
        expect(text).toBe('Not running');
        expect(className).toBe('red');
    });
});

describe('Test Total Distance Update', () => {
    let ui;
    beforeEach(() => {
        document.body.innerHTML = '<div id="total-distance"> 0.00 </div>';
        ui = new UI(document);
    });

    it('Should throw an error', () => {
        expect(() => ui.displayTotalDistance('1000')).toThrow();
        expect(() => ui.displayTotalDistance(true)).toThrow();
    });

    it('Should update Total Distance to 1000.00', () => {
        ui.displayTotalDistance(1000);
        const totalDistanceElement = document.getElementById('total-distance');
        const text = totalDistanceElement.innerText;
        expect(text).toBe('1000.00');
    });

    it('Should update give total distance 2 decimals only', () => {
        ui.displayTotalDistance(1.245667776);
        const totalDistanceElement = document.getElementById('total-distance');
        const text = totalDistanceElement.innerText;
        expect(text).toBe('1.25');
    });

})

describe("Test Generation Update", () => {
    let ui;
    beforeEach(() => {
        document.body.innerHTML = '<div id="generation"> 0 </div>';
        ui = new UI(document);
    });

    it('Should throw an error', () => {
        expect(() => ui.displayGeneration('abc')).toThrow();
        expect(() => ui.displayGeneration(true)).toThrow();
    })

    it('Should update generation to 500', () => {
        ui.displayGeneration(500);
        const text = document.getElementById('generation').innerText;
        expect(text).toBe('500');
    })

})
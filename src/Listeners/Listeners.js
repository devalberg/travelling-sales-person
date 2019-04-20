import Utilities from '../Utilities/Utilities';

const initializeFirstTour = (tsp) => {
    const randomPoints = Utilities.generateRandomVertexArray(Utilities.generateRandomVertex, 20, 800, 800);
    tsp.setupTour(randomPoints);
}

const startStopSimulationListener = (tsp) => {
    document.getElementById('start-simulation').addEventListener('click', (e) => tsp.runSimulation());
    document.getElementById('stop-simulation').addEventListener('click', (e) => tsp.stopSimulation());
}


const generateNewProblemListener = (tsp) => {
    document.getElementById('random-problem-form').addEventListener('submit', (e) => {
        e.preventDefault();
        tsp.stopSimulation();
        const points = document.getElementById('vertices').value;
        const randomPoints = Utilities.generateRandomVertexArray(Utilities.generateRandomVertex, points, 800, 800);
        tsp.setupTour(randomPoints);
    });
}

const fileUploadSubmitListener = (tsp) => {
    const fileLoader = document.getElementById('user-file');
    fileUploadListener(fileLoader);
    document.getElementById('upload-problem').addEventListener('submit', async (e) => {
        e.preventDefault();
        if (fileLoader.files.length > 0) {
            let vertices = await Utilities.readFile(fileLoader.files[0]);
            tsp.setupTour(vertices);
        }
    });
}

const fileUploadListener = (fileLoader) => {
    const label = document.getElementById('user-file-label');
    fileLoader.addEventListener('change', (e) => {
        if (fileLoader.files.length > 0) {
            label.innerHTML = e.target.value.split('\\').pop();
        } else {
            label.innerHTML = '<i class="fas fa-upload"></i> Upload .tsv File';
        }
    })
}

const setDelayListener = (canvas) => {
    document.getElementById('set-delay-form').addEventListener('submit', e => {
        e.preventDefault();
        const delay = document.getElementById('delay').value;
        canvas.setDelay(Number(delay));
    });
}

export default {
    initializeFirstTour,
    startStopSimulationListener,
    generateNewProblemListener,
    fileUploadSubmitListener,
    setDelayListener
}
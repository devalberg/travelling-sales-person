import TSP from './TSP/TSP';
import Canvas from './Canvas/Canvas';
import UI from './UI/UI';
import Tour from './Tour/Tour'
import Listeners from './Listeners/Listeners';

window.addEventListener('load', function () {
    const tour = new Tour();
    const tempTour = new Tour();
    const canvas = new Canvas(window.document);
    const ui = new UI(window.document);
    const tsp = new TSP(tour, tempTour, ui, canvas);


    Listeners.initializeFirstTour(tsp);
    Listeners.startStopSimulationListener(tsp);
    Listeners.generateNewProblemListener(tsp);
    Listeners.fileUploadSubmitListener(tsp);
    Listeners.setDelayListener(canvas);
});

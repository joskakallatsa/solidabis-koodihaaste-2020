"use strict";

import { continuousRideAlgorithm } from './algorithms/ContinuousRideAlgorithm.js';
import { shortestPathAlgorithm } from './algorithms/ShortestPathAlgorithm.js';

let algorithms = {};
algorithms.continuousRideAlgorithm = continuousRideAlgorithm;
algorithms.shortestPathAlgorithm = shortestPathAlgorithm;

window.algorithms = algorithms;

export default {};
This repository is my participation for Solidabis Coding Challenge of April 2020: https://koodihaaste.solidabis.com


DEMO:
https://joska.fi/koodihaaste


ABOUT:
Shortest path is calculated by mimicing Dijkstra's algorithm (https://upload.wikimedia.org/wikipedia/commons/2/23/Dijkstras_progress_animation.gif). Since we only know the "weight" value between nodes / bus stops, we need to loop all possible routes where busses are operating until we reach the destination node and can be sure there are not any other path with less "cost" leading to it.

After the shortest path has been found, there can be multiple bus lines operating between two bus stops. The passenger doesn't want unnecessary bus changes, so this is when second algorithm kicks in by solving the most continuous ride to the destination bus stop.

USER INTERFACE is all about UX. It shows relevant information about the bus route answering following questions:
- What is the shortest path to destination?
- What bus lines should I take? Which way are those busses going?
- When do I have to change bus if needed? How long until the next change?

Bus stops are groupped and hidden by default if there is no need to change bus on a single bus stop. Finally, last stops calculates total time of the bus route.


TECHNOLOGIES:
Simple HTML, SASS and JavaScript + jQuery for DOM manipulation. Few algorithm tests with JEST.


RUNNING BUILD:
- Build CSS: npm run sass:build
- Only algorithms use some ES6, build JS: npm run js:build
- Open web/index.html
- Run tests for "Continuous path" -algorithm: npm test
- Node: 11.12.0
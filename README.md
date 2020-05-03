
This repository is my participation for Solidabis coding challenge 2020.

TECHNOLOGIES:
- Simple HTML, SASS and JavaScript + jQuery for DOM manipulation.

RUNNING BUILD:
- Build CSS: npm run sass:build
- Only algorithms use some ES6, build JS: npm run js:build
- Open web/index.html
- Run tests for "Continuous path" -algorithm: npm test

DEMO:
- https://joska.fi/koodihaaste

ABOUT:
Shortest path is calculated by mimicing Dijkstra's algorithm. Since we only know the "weight" value between nodes, we need to loop all possible routes where busses are operating until we reach destination node and can be sure there are not any other path with less "cost" leading to it. After the shortest path has been found, there can also be multiple bus lines operating between same two bus stops. The passenger doesn't want unnecessary bus changes, so there's a second algorithm solving the most continuous ride to destination.

User interface is designed to be clear and stylish, displaying relevant information for user:
- What is the final destination of your bus?
- Unimportant bus stops are hidden by default
- ...but you can easilly see them if you want to
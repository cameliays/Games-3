var irysius = irysius || {};

irysius.utility = {
    // courtesy of http://indiegamr.com/generate-repeatable-random-numbers-in-js/
    Random: function (seed) {
        var _seed = seed;
        if (!_seed) _seed = Math.random();
        var self = this;

        return {
            next: function (min, max) {
                min = min || 0;
                max = max || 1;

                // Magic formula
                _seed = (_seed * 9301 + 49297) % 233280;
                var rnd = _seed / 233280;

                return min + rnd * (max - min);
            },
            nextColor: function () {
                var letters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
                var color = '#';
                var counter = 0;
                while (counter < 6) {
                    var idx = Math.round(self.next(0, 15));
                    color += letters[idx];
                    counter++;
                }
                return color;
            }
        }
    },
    grid: {
        generateBoolGrid: function (width, height) {
            var table = [];
            var row = [];
            var i = 0;
            for (; i < width; ++i) {
                row.push(false);
            }
            for (i = 0; i < height; ++i) {
                table.push(row.slice(0));
            }
            return table;
        },
        printBoolGrid: function (table) {
            var height = table.length;
            var width = table[0].length;
            var x = 0, y = 0;
            for (; y < height; ++y) {
                var row = '';
                for (x = 0; x < width; ++x) {
                    if (table[y][x]) row += '1 ';
                    else row += '0 ';
                }
                console.log(row);
            }
        },
        _adjacencyGlyphs: {
            U: 'v ', D: '^ ', L: '> ', R: '< ', X: 'X ',
            UD: '| ', UL: '1 ', UR: 'L ', DL: '7 ', DR: 'F ', LR: '- ',
            UDL: '2 ', UDR: '3 ', ULR: '4 ', DLR: 'T ',
            UDLR: '+ '
        },
        printAdjacencyGrid: function (table) {
            var self = irysius.utility.grid;
            var height = table.length;
            var width = table[0].length;
            var x = 0, y = 0;

            for (; y < height; ++y) {
                var row = '';
                for (x = 0; x < width; ++x) {
                    var label = table[y][x].label;
                    if (label == '') row += '0 ';
                    else row += self._adjacencyGlyphs[label];
                }
                console.log(row);
            }
        },
        setGridBorder: function (table) {
            var height = table.length;
            var width = table[0].length;
            var i = 0;
            for (; i < height; ++i) {
                table[i][0] = true;
                table[i][width - 1] = true;
            }
            for (i = 0; i < width; ++i) {
                table[0][i] = true;
                table[height - 1][i] = true;
            }
        },
        AdjacencyData: function (data) {
            var _up = false, _down = false, _left = false, _right = false;
            if (data.indexOf('U') != -1) _up = true;
            if (data.indexOf('D') != -1) _down = true;
            if (data.indexOf('L') != -1) _left = true;
            if (data.indexOf('R') != -1) _right = true;
            return {
                up: _up,
                down: _down,
                left: _left,
                right: _right,
                label: data
            }
        },
        mapAdjacency: function (table) {
            var self = irysius.utility.grid;
            var height = table.length;
            var width = table[0].length;
            var map = self.generateBoolGrid(width, height);
            var x = 0, y = 0, a = 0;
            for (; y < height; ++y) {
                for (x = 0; x < width; ++x) {
                    var label = '';
                    if (table[y][x]) {
                        var adjacent = self._getAdjacent(x, y, width, height);
                        for (a = 0; a < adjacent.length; ++a) {
                            if (table[adjacent[a].y][adjacent[a].x]) {
                                label += adjacent[a].type;
                            }
                        }
                        if (label == '') label = 'X';
                    }
                    map[y][x] = new self.AdjacencyData(label);
                }
            }
            return map;
        },
        _getAdjacent: function (x, y, width, height) {
            var points = [];
            if (y - 1 >= 0) points.push({ x: x, y: y - 1, type: 'U' });
            if (y + 1 < height) points.push({ x: x, y: y + 1, type: 'D' });
            if (x - 1 >= 0) points.push({ x: x - 1, y: y, type: 'L' });
            if (x + 1 < width) points.push({ x: x + 1, y: y, type: 'R' });

            return points;
        }
    }
}
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
    }
}
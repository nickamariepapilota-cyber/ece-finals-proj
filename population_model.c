#include <math.h>
#include <emscripten/emscripten.h>

EMSCRIPTEN_KEEPALIVE
int project_population(int initial_pop, int forest_percent, int threat_percent) {
    double forest_cover = forest_percent / 100.0;
    double threat_rate = threat_percent / 100.0;
    double carrying_capacity = forest_percent * 15.0;
    double pop = (double)initial_pop;

    for (int year = 1; year <= 10; ++year) {
        double growth_rate = (forest_cover * 0.18) - (threat_rate * 0.22);
        pop = pop + pop * growth_rate * (1.0 - (pop / carrying_capacity));
        if (pop < 0.0) {
            pop = 0.0;
        }
    }

    return (int)llround(pop);
}


#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <emscripten.h>

#define MAX_NAME_LEN 64
#define MAX_SCI_LEN 48
#define MAX_STATUS_LEN 32
#define SIMULATION_YEARS 10

typedef struct {
    char name[MAX_NAME_LEN];
    char scientific_name[MAX_SCI_LEN];
    char status[MAX_STATUS_LEN];
    int initial_population;
} Species;

// SPECIES DATABASE

static const Species species_list[] = {
    {"Visayan Hornbill", "Penelopides panini", "ENDANGERED", 400},
    {"Visayan Spotted Deer", "Rusa alfredi", "ENDANGERED", 700},
    {"Visayan Warty Pig", "Sus cebifrons", "CRITICALLY ENDANGERED", 200},
    {"Dulungan (Rufous-headed Hornbill)", "Rhabdotorrhinus waldeni", "CRITICALLY ENDANGERED", 150},
    {"Negros Bleeding-heart Dove", "Gallicolumba keayi", "CRITICALLY ENDANGERED", 250},
    {"Panay Monitor Lizard (Mabitang)", "Varanus mabitang", "ENDANGERED", 300},
    {"Philippine Tarsier", "Carlito syrichta", "NEAR THREATENED", 1000}
};

#define SPECIES_COUNT (sizeof(species_list) / sizeof(species_list[0]))

// INPUT VALIDATION

int clamp_int(int value, int min_val, int max_val) {
    if (value < min_val) {
        return min_val;
    }

    if (value > max_val) {
        return max_val;
    }

    return value;
}

// GET NUMBER OF SPECIES

EMSCRIPTEN_KEEPALIVE
int get_species_count(void) {
    return (int)SPECIES_COUNT;
}

// GET INITIAL POPULATION

EMSCRIPTEN_KEEPALIVE
int get_initial_population(int species_index) {

    if (species_index < 0 || species_index >= SPECIES_COUNT) {
        return -1;
    }

    return species_list[species_index].initial_population;
}

// GET PROJECTED POPULATION FOR A SPECIFIC YEAR

EMSCRIPTEN_KEEPALIVE
double get_population_at_year(
    int species_index,
    int forest_percent,
    int threat_percent,
    int year
) {

    // Validate species selection

    if (species_index < 0 || species_index >= SPECIES_COUNT) {
        return -1.0;
    }

    // Validate input values

    forest_percent = clamp_int(forest_percent, 10, 100);
    threat_percent = clamp_int(threat_percent, 0, 80);
    year = clamp_int(year, 0, SIMULATION_YEARS);

    // Initialize simulation variables

    double forest_cover = forest_percent / 100.0;
    double threat_rate = threat_percent / 100.0;

    double carrying_capacity = forest_percent * 15.0;

    double pop = (double)
        species_list[species_index].initial_population;

    // Calculate population growth rate

    double growth_rate =
        (forest_cover * 0.18) -
        (threat_rate * 0.22);

    // Population simulation

    for (int current_year = 1;
         current_year <= year;
         ++current_year) {

        pop = pop + pop * growth_rate *
            (1.0 - (pop / carrying_capacity));

        if (pop < 0.0) {
            pop = 0.0;
        }
    }

    return pop;
}

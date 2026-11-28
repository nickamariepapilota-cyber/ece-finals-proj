#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

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

int clamp_int(int value, int min_val, int max_val) {
    if (value < min_val) {
        return min_val;
    }
    if (value > max_val) {
        return max_val;
    }
    return value;
}

void run_simulation(const Species *sp, int forest_percent, int threat_percent) {
    double forest_cover = forest_percent / 100.0;
    double threat_rate = threat_percent / 100.0;
    double carrying_capacity = forest_percent * 15.0;
    double pop = (double)sp->initial_population;

    printf("\n======================================================\n");
    printf("Species: %s (%s)\n", sp->name, sp->scientific_name);
    printf("Status : %s\n", sp->status);
    printf("Forest : %d%% | Threat: %d%%\n", forest_percent, threat_percent);
    printf("======================================================\n");
    printf("%-8s %-18s\n", "Year", "Projected Pop.");
    printf("------------------------------------------------------\n");
    printf("%-8d %-18d\n", 0, sp->initial_population);

    for (int year = 1; year <= SIMULATION_YEARS; ++year) {
        double growth_rate = (forest_cover * 0.18) - (threat_rate * 0.22);
        pop = pop + pop * growth_rate * (1.0 - (pop / carrying_capacity));
        if (pop < 0.0) {
            pop = 0.0;
        }
        int rounded_pop = (int)llround(pop);
        printf("%-8d %-18d\n", year, rounded_pop);
    }

    int final_pop = (int)llround(pop);
    printf("------------------------------------------------------\n");

    if (final_pop == 0) {
        printf("Verdict: Local extinction risk. Immediate habitat protection required.\n");
    } else if (final_pop < sp->initial_population) {
        printf("Verdict: Population declining. Threat pressure outweighs forest recovery.\n");
    } else {
        printf("Verdict: Positive recovery! Healthy canopy supports population growth.\n");
    }
}

int main(void) {
    Species species_list[] = {
        {"Visayan Hornbill", "Penelopides panini", "ENDANGERED", 400},
        {"Visayan Spotted Deer", "Rusa alfredi", "ENDANGERED", 700},
        {"Visayan Warty Pig", "Sus cebifrons", "CRITICALLY ENDANGERED", 200},
        {"Dulungan (Rufous-headed Hornbill)", "Rhabdotorrhinus waldeni", "CRITICALLY ENDANGERED", 150},
        {"Negros Bleeding-heart Dove", "Gallicolumba keayi", "CRITICALLY ENDANGERED", 250},
        {"Panay Monitor Lizard (Mabitang)", "Varanus mabitang", "ENDANGERED", 300},
        {"Philippine Tarsier", "Carlito syrichta", "NEAR THREATENED", 1000}
    };

    int species_count = (int)(sizeof(species_list) / sizeof(species_list[0]));
    int choice = 1;
    int forest_percent = 65;
    int threat_percent = 30;

    printf("=== WildVisayas C Population Simulator ===\n\n");
    for (int i = 0; i < species_count; ++i) {
        printf("%d. %s [%s] (Est. %d)\n",
               i + 1,
               species_list[i].name,
               species_list[i].status,
               species_list[i].initial_population);
    }

    printf("\nSelect a species (1-%d): ", species_count);
    if (scanf("%d", &choice) != 1) {
        printf("Invalid input. Exiting.\n");
        return 1;
    }

    if (choice < 1 || choice > species_count) {
        printf("Invalid choice. Defaulting to Visayan Hornbill.\n");
        choice = 1;
    }

    printf("Enter protected forest cover (10-100%%): ");
    if (scanf("%d", &forest_percent) != 1) {
        printf("Invalid input. Exiting.\n");
        return 1;
    }
    forest_percent = clamp_int(forest_percent, 10, 100);

    printf("Enter poaching & habitat threat level (0-80%%): ");
    if (scanf("%d", &threat_percent) != 1) {
        printf("Invalid input. Exiting.\n");
        return 1;
    }
    threat_percent = clamp_int(threat_percent, 0, 80);

    run_simulation(&species_list[choice - 1], forest_percent, threat_percent);

    return 0;
}

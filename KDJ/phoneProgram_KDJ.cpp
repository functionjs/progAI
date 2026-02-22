#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter number of phones: ";
    cin >> n;
    
    if (n < 2) {
        cout << "No" << endl;
        return 0;
    }
    
    // Variables only - no data structures
    int firstWeight = 0;
    int secondWeight = 0;
    int firstCount = 0;
    int secondCount = 0;
    bool foundSecond = false;
    
    // Read all weights
    for (int i = 0; i < n; i++) {
        int weight;
        cin >> weight;
        
        if (i == 0) {
            // First phone sets the reference
            firstWeight = weight;
            firstCount = 1;
        } else {
            if (weight == firstWeight) {
                firstCount++;
            } else {
                if (!foundSecond) {
                    // Found a different weight
                    secondWeight = weight;
                    foundSecond = true;
                    secondCount = 1;
                } else {
                    if (weight == secondWeight) {
                        secondCount++;
                    } else {
                        // Found a third different weight - impossible to have exactly 1 artifact
                        cout << "No" << endl;
                        return 0;
                    }
                }
            }
        }
    }    
    // Check if exactly one phone is different
    if (!foundSecond) {
        // All phones have the same weight
        cout << "No" << endl;
    } else if (firstCount == 1 || secondCount == 1) {
        // Exactly one phone is different
        cout << "Yes" << endl;
    } else {
        // Multiple phones of each weight
        cout << "No" << endl;
    }
    
    return 0;
}

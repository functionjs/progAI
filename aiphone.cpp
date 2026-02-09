#include <iostream>

using namespace std;

int main() {
    int n;
     cin >> n;

    int base, diff = 0;
    int same = 0, diffCount = 0;

     cin >> base;

      for (int i = 1; i < n; i++) {
           cout << "\n i="<<i; // debug line
           int x;
            cin >> x;
             cout << " x="<<x; // debug line
             if(x == base) {
                same++;
             }
             else {
                   if(diffCount == 0) {
                      diff = x;
                      diffCount = 1;
                   }
                   else if(x == diff) {
                           diffCount++;
                        }
                        else {
                              cout << "No";
                               return 0;
                             }
                  }
      }

       if (diffCount == 1)
           cout << "Yes";
       else
           cout << "No";

        return 0;
}

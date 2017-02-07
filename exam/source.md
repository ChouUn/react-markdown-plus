## Code Inline

### Default

`Hello world!`

### AsciiMath

`@2=(((3-x)xx2)/(3-x))@`

### TeX

`$S_n = \sum\limits_{i=1}^n A_i$`  

## Code Block

### Tex

``` tex
\frac{\partial u}{\partial t}
= h^2 \left(
    \frac{\partial^2 u}{\partial x^2} + 
    \frac{\partial^2 u}{\partial y^2} +
    \frac{\partial^2 u}{\partial z^2}
\right)  

a, b (0 \leq a, b \leq 10)
```

### Default

``` 
#include <cstdio>

int main() {
  int a = 1 + 2;
  printf("%d\n", a);
  return 0;
}
```

### Prism with no language
``` none plugins=line-numbers
#include <cstdio>

int main() {
  int a = 1 + 2;
  printf("%d\n", a);
  return 0;
}
```

### Prism
``` cpp
#include <cstdio>

int main() {
  int a = 1 + 2;
  printf("%d\n", a);
  return 0;
}
```

### Prism with theme
``` cpp theme=twilight
#include <cstdio>

int main() {
  int a = 1 + 2;
  printf("%d\n", a);
  return 0;
}
```

### Prism with plugin
``` cpp plugins=line-highlight line=1,4-5
#include <cstdio>

int main() {
  int a = 1 + 2;
  printf("%d\n", a);
  return 0;
}
```

### Prism with remote file
``` cpp src=https://raw.githubusercontent.com/ChouUn/CodeWorld/master/History/hdu/hdu4165.cpp
```

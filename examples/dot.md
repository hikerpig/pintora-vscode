
```pintora
dotDiagram
  @param layoutDirection LR

  %% pintora style comment
  %% here we declare a directed graph
  digraph G {
    // specify graph attributes
    bgcolor="white"

    // specify common node attributes
    node [color="#111",bgcolor=orange]

    edge [color="#000"]

    subgraph S1 {
      // subgraph will inherit parent attributes
      label="Sub";
      a1 [fontcolor="purple",margint=10];
    }

    /* usually we put edges at the last */
    a1 -> b1;
    n1 -> end [color="blue"];
    a2 -> end;

    short["node shorthand"];

    "quoted/1" -> "quoted/2" -> end;
  }
```

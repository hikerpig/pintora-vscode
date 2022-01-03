# Show pintora diagram in markdown preview

Simply add a `pintora` codeblock.

```pintora
erDiagram
  CUSTOMER ||--o{ ORDER : places
  ORDER ||--|{ LINE-ITEM : contains
  CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
  ORDER {
    int orderNumber PK
    string deliveryAddress
  }
```
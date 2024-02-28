```pintora
sequenceDiagram
  autonumber
  User->>+Pintora: render this
  activate Pintora
  loop Check input
    Pintora-->>Pintora: Has input changed?
  end
  Pintora-->>User: your figure here
  deactivate Pintora
  @note over User,Pintora: note over
  @note right of User: note aside actor
  @start_note right of User
  multiline note
  is possible
  @end_note
  note over User,Pintora: note over
  == Divider ==
```

```pintora
sequenceDiagram
  box #e7f2ff "英语角"
  participant A
  participant [<actor> User]
  endbox
```

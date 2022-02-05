```pintora
componentDiagram
  @param labelBackground #fefefe
  package "Some Group" {
    [First Component]
    HTTP -- [First Component]
    [Another Component]
  }

  node "Other Groups" {
    [Second Component]
    FTP -- [Second Component]
    [First Component] --> FTP
  }

  cloud "Cloud" {
    [Example 1]
  }

  database "MySql" {
    folder "This is my folder" {
      [Folder 3]
    }
    frame "Foo" {
      [Frame 4]
    }
  }

  [Another Component] --> [Example 1]
  [Example 1] --> [Folder 3]
  [Folder 3] --> [Frame 4]
```

## Other Contents
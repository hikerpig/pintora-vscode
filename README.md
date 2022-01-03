# pintora-vscode

VSCode extention for [pintora](https://github.com/hikerpig/pintora) project. Providing syntax highlight and preview support for `.pintora` file and markdown code fence.

A humble helper for managing your diagrams as text.

## Syntax highlight

- [x] sequenceDiagram
- [x] erDiagram
- [ ] activityDiagram
- [x] componentDiagram

## Commands

### Preview Pintora Diagram

When editing a `.pintora` file, you can call `pintora:Preview Pintora Diagram` through command palette to open a preview panel for current file.


![preview command](https://i.imgur.com/BmbbfwJ.png)

## Enhance the builtin markdown preview

You can see pintora diagram in markdown preview by annotating `pintora` for the code fence.

    ```pintora
    ...write some pintora dsl
    ```

![markdown preview](https://i.imgur.com/kyQEexU.png)

## Credits

Inspired by:
- [vscode-mermaid-syntax-highlight](https://github.com/bpruitt-goddard/vscode-mermaid-syntax-highlight) for the syntax highlight.
- [vstirbu/vscode-mermaid-preview](https://github.com/vstirbu/vscode-mermaid-preview) for preview command and configurations.
- [vscode-markdown-mermaid](https://github.com/mjbvz/vscode-markdown-mermaid) for the markdown preview enhancing.
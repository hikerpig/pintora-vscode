# pintora-vscode

VSCode extention for [pintora](https://github.com/hikerpig/pintora) project. Providing syntax highlight and preview support for `.pintora` file and markdown code fence.

A humble helper for managing your diagrams as text.

## Syntax highlight

- [x] sequenceDiagram
- [x] erDiagram
- [x] activityDiagram
- [x] componentDiagram
- [x] mindmap
- [x] gantt
- [x] dotDiagram

## Commands

### Preview Pintora Diagram

When editing a `.pintora` file, you can call `pintora:Preview Pintora Diagram` through command palette to open a preview panel for current file.


![preview command](https://i.imgur.com/BmbbfwJ.png)

### Export Current Diagram

You can use this command to export for current `.pintora` file.

Currently `svg/png/jpg` output format is supported.

It calls the `@pintora/cli` script under the hood, which requires node.js environment and the [`pintora.pintoraExecutable`](#pintora-executable) being correctly configured.

### Generate Preview Url

You can genearte preview url for current diagram, this url can be used as img's `src` attribute or in Markdown image.


## Enhance the builtin markdown preview

You can see pintora diagram in markdown preview by annotating `pintora` for the code fence.

~~~markdown
```pintora
...write some pintora dsl
```
~~~

![markdown preview](https://i.imgur.com/kyQEexU.png)

## Configuaration

### Theme

Based on the theme used in Visual Studio Code, the default themes are *default* for light and *dark* for dark. These values can be changed by setting `pintora.vscode.*` config.

Or you can overricde automatic theme detection by setting `pintora.theme`.

```json
{
  "pintora.vscode.light": "one of pintora's builtin default",
  "pintora.vscode.dark": "one of pintora's builtin default",

  // override automatic theme detection
  "pintora.theme": "one of pintora's builtin default"
}
```

### Renderer

You can specify default renderer in the preview panel for pintora.

```json
{
  "pintora.renderer": "Default renderer of pintora, 'svg' or 'canvas'"
}
```

### Pintora Executable

The path to `pintora` executable.

```json
{
  "pintora.pintoraExecutable": "path/to/@pintora/cli, default is 'pintora'"
}
```

It's recommended to install `@pintora/cli` globally.

### Preview Url

This can be used to specify preview site url of pintora preview page, default value is `https://pintorajs.vercel.app/demo/preview/`.

```json
{
  "pintora.previewUrl": "Url of pintora preview page, can be used to generate preview url"
}
```

```sh
npm i -g @pintora/cli
which pintora

# my output is /var/folders/6x/xxdpt31d011_36lc7jfl49bc0000gp/T/fnm_multishells/33847_1642398161921/bin/pintora
# copy your output and paste to the config
```

## Credits

Inspired by:
- [vscode-mermaid-syntax-highlight](https://github.com/bpruitt-goddard/vscode-mermaid-syntax-highlight) for the syntax highlight.
- [vstirbu/vscode-mermaid-preview](https://github.com/vstirbu/vscode-mermaid-preview) for preview command and configurations.
- [vscode-markdown-mermaid](https://github.com/mjbvz/vscode-markdown-mermaid) for the markdown preview enhancing.

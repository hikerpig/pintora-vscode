We should be able to add syntax highlight to pintora codeblock.

```pintora
mindmap
* Root
** Second
```

Without messing the html syntax highlight inside codeblock.

```html
<pre class="pintora" data-renderer="canvas">
mindmap
* Root
** Second
</pre>

<script type="module">
  import pintora from 'https://cdn.skypack.dev/@pintora/standalone'
  document.querySelectorAll('.pintora').forEach((codeElement) => {
    pintora.renderContentOf(codeElement)
  })
</script>
```


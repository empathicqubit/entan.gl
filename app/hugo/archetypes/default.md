---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
post-guide: |
    Useful shortcodes:

    {{< gcs_figure 
        class="alignright"
        width="000"
        src="path relative to static bucket root"
        caption="a witty caption in markdown"
    >}}

    {{< gcs_img src="path relative to static bucket root" >}}

    <a href="{{<gcs src="path relative to static bucket root" >}}">Test GCS link</a>

    {{< cbm >}} Commodore logo bc why not?

    date -uIs gives date in ISO UTC

    Include a mermaid diagram:
    ```mermaid
    ```
---

The summary.

<!--more-->

Stuff after the summary.

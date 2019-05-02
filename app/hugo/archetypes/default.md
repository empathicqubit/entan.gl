---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
post-guide: |
    Useful shortcodes:

    {{< gcs_img src="path relative to static bucket root" >}}

    <a href="{{<gcs src="path relative to static bucket root" >}}">Test GCS link</a>
---

The summary.

<!--more-->

Stuff after the summary.

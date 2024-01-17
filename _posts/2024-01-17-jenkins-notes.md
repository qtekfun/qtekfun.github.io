---
layout: post
title:  "Jenkins notes"
categories: DevOps
---
As part of my DevOps work, maintain Jenkins infra and Jenkins itself healthy is one of my responsabilities. In this
post I want to write down some of the things I do from time to time and I always forgot on how to do them.

## Prevent Jenkins from execute new builds

This is one of the main task to do before update whatever. The best for that is to enable "Quiet Down" mode. For
that you can do it via URLs:

```
/quietDown
/cancelQuietDown
```

or from CLI:

``` bash
[cancel-]quiet-down
```

Source: [StackOverflow](https://stackoverflow.com/questions/8472589/preventing-jenkins-from-executing-new-builds-in-a-defined-time-frame-e-g-6-7am)
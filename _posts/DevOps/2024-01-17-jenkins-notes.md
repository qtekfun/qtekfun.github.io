---
layout: post
title:  "Jenkins notes"
categories: DevOps
---
As part of my DevOps work, maintain Jenkins infra and Jenkins itself healthy is one of my responsabilities. In this
post I want to write down some of the things I do from time to time and I always forgot on how to do them.

![Jira Oops!](/assets/DevOps/jira_oops.png)

## Prevent Jenkins from execute new builds

This is one of the main task to do before update whatever. The best for that is to enable "Quiet Down" mode. For
that you can do it via URLs:

>/quietDown

>/cancelQuietDown

or from CLI:

``` bash
[cancel-]quiet-down
```

Source:
[StackOverflow](https://stackoverflow.com/questions/8472589/preventing-jenkins-from-executing-new-builds-in-a-defined-time-frame-e-g-6-7am)

## Reboot Jenkins

To reboot Jenkins, the easiest way is to use `/safeRestart`

## Search for Jenkins errors

Each time you receive a "Oops!" screen you have a Logging ID. That ID is also in the logs. The fastest way to get
there is through the UI under the path:

> Manage Jenkins > System Log > All Jenkins Logs

And there you will have something like:

``` bash
Jan. 18, 2022 19:50:11 WARNING hudson.init.impl.InstallUncaughtExceptionHandler handleException
Caught unhandled exception with ID xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

And there you have the info.

## List the existing Plugins

This is an easy task:

1. Open the Jenkins Script Console under `Manage Jenkins > Script Console`

1. Run the following commnad:

  ``` groovy
  Jenkins.instance.pluginManager.plugins.each {
      println("${it.getShortName()}: ${it.getVersion()}")
  }
  ```

## Delete the `jenkins.pid`

Sometimes the Jenkins process is starting and stoping directly and when you check the logs you see something like:

```bash
2019-05-27 12:19:32,691 INFO  - Started process 4084
2019-05-27 12:19:32,691 DEBUG - Forwarding logs of the process System.Diagnostics.Process (javaw) to winsw.SizeBasedRollingLogAppender
2019-05-27 12:19:32,691 INFO  - Recording PID of the started process:4084. PID file destination is C:\Jenkins\jenkins_agent.pid
2019-05-27 12:23:56,529 INFO  - Stopping jenkinsslave-C__Jenkins
2019-05-27 12:23:56,529 DEBUG - ProcessKill 4084
2019-05-27 12:23:56,561 INFO  - Stopping process 4084
2019-05-27 12:23:56,561 INFO  - Send SIGINT 4084
2019-05-27 12:23:56,561 WARN  - SIGINT to 4084 failed - Killing as fallback
```

To avoid this issue you must delete the file `$JENKINS_HOME/jenkins.pid` and restart the service.

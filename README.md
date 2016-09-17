[![Build Status](https://travis-ci.org/sonos-alerts/alerts-api.svg?branch=master)](https://travis-ci.org/sonos-alerts/alerts-api)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1b09cff1b095a190f222)

# alerts-api

Works in conjunction with [node-sonos-http-api](https://github.com/sonos-alerts/node-sonos-http-api) to send alert messages across sonos. 

###### Iteration 1. - 

+ To play "website down" on sonos
+ Using ngrok you can also apply to monitoring agents such as Datadog making a set up webhook trigger the sound on sonos. This is single use and needs work to remove the ngrok element.

#######Instructions:

+ Plug pi into monitor, ifconfog to find out IP address

+ **To modify which speaker to alert on:**

1. [command] ssh pi@ipaddress
2. [command] sudo nano /etc/rc.local
3. [instruction] change to relevant sonos speaker
4. [keypress] ctrl+x
5. [keypress] y
6. [keypress] enter
7. [command] sudo reboot

+ **To make alerts happen manually with curl:**

1. [command] ssh pi@ipaddress
2. [command] curl http://localhost:3000/alert

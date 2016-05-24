[![Build Status](https://travis-ci.org/sonos-alerts/alerts-api.svg?branch=master)](https://travis-ci.org/sonos-alerts/alerts-api)
# alerts-api

Works in conjunction with [node-sonos-http-api](https://github.com/sonos-alerts/node-sonos-http-api) to send alert messages across sonos. 

###### Iteration 1. - 

Plug pi into monitor, ifconfog to find out IP address

**To modify which speaker to alert on:**

1. [command] ssh pi@ipaddress
2. [command] sudo nano /etc/rc.local
3. [instruction] change to relevant sonos speaker
4  [keypress] ctrl+x
5. [keypress] y
6. [keypress] enter
7. [command] sudo reboot

**To make alerts happen manually with curl:**

1. [command] ssh pi@ipaddress
2. [command] curl http://localhost:3000/alert

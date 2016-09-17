[![Build Status](https://travis-ci.org/sonos-alerts/alerts-api.svg?branch=master)](https://travis-ci.org/sonos-alerts/alerts-api)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1b09cff1b095a190f222)

# Alerts API

Works in conjunction with [<img src="http://i66.tinypic.com/16jiq8o.png">](https://github.com/sonos-alerts/node-sonos-http-api) [node-sonos-http-api](https://github.com/sonos-alerts/node-sonos-http-api) to send alert messages across sonos. 

## Purpose of the alerts-api 

+ To play "website down" on sonos
+ Using ngrok you can also apply to monitoring agents such as Datadog making a set up webhook trigger the sound on sonos. This is single use and needs work to remove the ngrok element.

## Instructions:

+ Plug pi into monitor, ifconfog to find out IP address

#### To modify which speaker to alert on:

1. [command] ssh pi@ipaddress
2. [command] sudo nano /etc/rc.local
3. [instruction] change to relevant sonos speaker
4. [keypress] ctrl+x
5. [keypress] y
6. [keypress] enter
7. [command] sudo reboot

#### To make alerts happen manually with curl:

1. [command] ssh pi@ipaddress
2. [command] curl http://localhost:3000/alert


#### Integrating with DataDog [<img src="http://i68.tinypic.com/20jfyty.png">](https://www.datadoghq.com/)

1. [command] ssh pi@ipaddress
2. [command] ngrok http -subdomain=<subdomainName> 080
3. [instruction] copy http forwarding url i.e. http://<subdomainName>.ngrok.io
4. [instruction] go to datadog integrations, configure webhooks, replace existing url with new one (remember to make sure /alert is still on the end), save new configuration
5. [instruction] go to datadog events, post a status update of "@webhook-<nameOfWebhook> <message>" 

See [ngrok instructions for setting up custom and ngrok subdomains](https://ngrok.com/docs#subdomain)
## livepeer_api-vue-example

mit diesem example wird die livepeer.com api in einer vue anwendung umgesetzt.

#### technik
   - VUE, 
   - GraphQL, 
   - Apollo, 
   - AXIOS

#### API
  - livepeer API - https://livepeer.com/docs

#### cloudservice: 
 
  - Datenbank - hasura.io, 
  - Autentifizierung - auth0.com 
   - Speicher - heroku.com, 


![overview](https://user-images.githubusercontent.com/1324583/94922603-d04bf880-04ba-11eb-9580-249e5dae63ae.png)

### aufgabe
Im Netzwerk soll es zukünftig eine Möglichkeit geben für User Live zu streamen.  
 
### problem
Serverkosten für Livestreams sind enorm hoch für z.B. Startups und Serviceanbieter in diesem Bereich. Livepeer.org / livepeer.com bietet eine lösung für dieses Problem. 
>   WHITEPAPER von livepeer : https://github.com/livepeer/wiki/blob/master/WHITEPAPER.md


## Start
	$ git clone https://github.com/Human-Connection-Community/livepeer-demo.git
	$ cd livepeer-demo
	
	


1. Ändere die **.env.local** in **.env** um

folgende Variablen musst du anpassen.

	VUE_APP_HASURA_APP_V1_GRAPHQL = https://xxxxxxxxxxx.hasura.app/v1/graphql	 
	VUE_APP_LIVEPEER_API_KEY = SECRET
	VUE_APP_LIVEPEER_USERID= SECRET
	VUE_APP_AUTH0_DOMAIN=xxxxx.us.auth0.com
	VUE_APP_AUTH0_CLIENTID=SECRET
	

## Clouds
  
#### hasura
Hasura bietet eine Cloudbasierte GraphQL Datenbank. Richte dir einen free Account (1 GB) ein und passe die **.env** an. 

	VUE_APP_HASURA_APP_V1_GRAPHQL = https://xxxxxxxxxxx.hasura.app/v1/graphql 
	
lege eine Tabelle **streams** an mit folgenden Spalten. 
  

	id           - uuid, primary key, unique, default: gen_random_uuid()
	streamid     - uuid
	name         - text
	kind         - text
	streamuserid - uuid 



##### auth0 
auth0 bietet für Testzwecke ein begrenzten free account. Richte dir bitte da  ein Konto ein und passe die **.env** datei an.
        
	VUE_APP_AUTH0_DOMAIN=xxxxx.us.auth0.com
	VUE_APP_AUTH0_CLIENTID=SECRET
	
	
##### livepeer
Ziel des Livepeer-Projekts ist die Bereitstellung eines Netzwerkprotokolls für Live-Video-Streaming, das vollständig dezentralisiert und hoch skalierbar ist, Krypto-Token als Anreiz bietet und zu einer Lösung führt, die als Live-Medienschicht im dezentralisierten Entwicklungsstapel (web3) dienen kann. Darüber hinaus soll Livepeer eine wirtschaftlich effiziente Alternative zu zentralisierten Broadcast-Lösungen für jeden bestehenden Broadcaster darstellen. In diesem Dokument beschreiben wir das Livepeer-Protokoll - ein auf einem delegierten Einsatz basierendes Protokoll, um Teilnehmer in einem Live-Video-Übertragungsnetzwerk auf eine spieltheoretisch sichere Weise zu motivieren. Wir stellen Lösungen für die skalierbare Verifikation von dezentralisierter Arbeit vor, sowie die Verhinderung von nutzloser Arbeit in dem Versuch, die Spielmarkenzuweisungen in einem inflationären System zu spielen.

>  Als Dienstleistungsgeber richtet man sich ein Account bei Livepeer.com an. Legen Sie einen API-Key an und tragen sie diesen in der der **.env** datei ein. 

	VUE_APP_LIVEPEER_API_KEY = SECRET
	VUE_APP_LIVEPEER_USERID= SECRET 


2. die Anwendung sollte jetzt laufen 

Führe ein install aus. 

	$ npm i

### NPM Scripts

	$ npm run serve
	$ npm run build
	$ npm run lint --fix
	
	
für alle die bis hier her gekommen sind 


#### heroku 
Heroku bietet den Speicherplatz. Richte dir einen free account bei heroku ein. 

>Deploying with Git
>https://devcenter.heroku.com/articles/git
 

 

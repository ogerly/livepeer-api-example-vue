## livepeer_api-vue-example

Mit diesem Beispiel wird die livepeer.com API in einer VUE Anwendung umgesetzt und das Livestreamings für angemeldete User angeboten.
GraphQL Datenbank über Hasura Cloud. 
Userregistrierung und Verwaltung über auth0.com 
Zuletzt schieben wir das alles auf einen kostenlosen Account von Heroku.com

#### technik
   - VUE, 
   - GraphQL, 
   - Apollo, 
   - axios

#### API
  - livepeer API - https://livepeer.com/docs

#### cloudservice: 
 
  - Datenbank - hasura.io, 
  - Autentifizierung - auth0.com 
  - Speicher - heroku.com, 


![overview](https://user-images.githubusercontent.com/1324583/94922603-d04bf880-04ba-11eb-9580-249e5dae63ae.png)


### problem
Serverkosten für Livestreams sind enorm hoch für z.B. Start-ups und Serviceanbieter in diesem Bereich. Livepeer.org / livepeer.com bietet eine Lösung für dieses Problem.
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
Hasura bietet eine Cloudbasierte GraphQL Datenbank. Richte dir einen kostenlosen Account (1 GB) ein und passe die **.env** an.

	VUE_APP_HASURA_APP_V1_GRAPHQL = https://xxxxxxxxxxx.hasura.app/v1/graphql 
	
Lege eine Tabelle **streams** an mit folgenden Spalten.
  

	id           - uuid, primary key, unique, default: gen_random_uuid()
	streamid     - uuid
	name         - text
	kind         - text
	streamuserid - uuid 



##### auth0 
auth0 bietet für Testzwecke ein begrenzten kostenlosen Account. Richte dir bitte da ein Konto ein und passe die **.env** Datei an.
        
	VUE_APP_AUTH0_DOMAIN=xxxxx.us.auth0.com
	VUE_APP_AUTH0_CLIENTID=SECRET
	
	
##### livepeer
Ziel des Livepeer-Projekts ist die Bereitstellung eines Netzwerkprotokolls für Live-Video-Streaming, das vollständig dezentralisiert und hoch skalierbar ist, Krypto-Token als Anreiz bietet und zu einer Lösung führt, die als Live-Medienschicht im dezentralisierten Entwicklungsstapel (web3) dienen kann. Darüber hinaus soll Livepeer eine wirtschaftlich effiziente Alternative zu zentralisierten Broadcast-Lösungen für jeden bestehenden Broadcaster darstellen. 

>  Als Dienstleistungsgeber richtet man sich ein Account bei Livepeer.com an. Legen Sie einen API-Key an und tragen sie diesen in der **.env** Datei ein.

	VUE_APP_LIVEPEER_API_KEY = SECRET
	VUE_APP_LIVEPEER_USERID= SECRET 


2. Die Anwendung sollte jetzt laufen

Führe ein install aus. 

	$ npm i

### NPM Scripts

	$ npm run serve
	$ npm run build
	$ npm run lint --fix
	
	
Für alle die bis hier hergekommen sind


#### heroku 
Heroku bietet den Speicherplatz. Richte dir einen kostenlosen Account bei heroku.com ein.

>Deploying with Git
>https://devcenter.heroku.com/articles/git
 

 

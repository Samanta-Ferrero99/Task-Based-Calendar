# Deployment Runbook

This document details instructions for creating  the deployment server from scratch, as well as instructions for updating an existing deployment.

## Contents

- [Initial Deployment](#initial-deployment)
	- [Create a new droplet](#create-a-new-droplet)
	- [Set up a basic firewall](#set-up-a-basic-firewall)
	- [Set up domain](#set-up-domain)
	- [Install Nginx on server](#install-nginx-on-server)
	- [Create SSL Certificate with Certbot](#create-ssl-certificate-with-certbot)
	- [Install Node.js](#install-node.js)
	- [Deploy React Frontend](#deploy-react-frontend)
	- [Deploy Backend](#deploy-backend)
- [Update Deployment](#update-deployment)
	- [Update Frontend Deployment](#update-frontend-deployment)
	- [Update Backend/API Deployment](#update-backend/api-deployment)
- [Stop Server](#stop-server)

# Prerequisites

Prior to creating a new deployment, code should be functioning properly and passing all acceptance tests, pushed to the main branch of the repository.

A DigitalOcean account with a positive account credit balance is required. Set up an SSH key for your local machine and add it to DigitalOcean before proceeding.

# Initial Deployment

Instructions for creating a new deployment from scratch.

## Create a new droplet

Inside of the DigitalOcean cloud dashboard, create a new droplet with the following settings:

- Ubuntu 20.04 LTS x64
- Basic Shared CPU - Regular Intel with SSD $5/month
- New York datacenter region (1 or 3)
- Select previously added SSH key 
- Choose a suitable hostname (like "chronicle-server")

## Set up a basic firewall

1. SSH into the server using the command `ssh root@<your-server's-ipv4-address>`
- You may see a warning about host authenticity, if so say "yes" or follow the prompts.
2. `sudo ufw app list`
- Output should look something like: 
	```
	Available applications:
		OpenSSH
	```
3. `sudo ufw allow OpenSSH`
4. `sudo ufw enable`
5. `sudo ufw status`
- Output should look something like
	```
		Status: active
		To                         Action      From
		--                         ------      ----
		OpenSSH                    ALLOW       		Anywhere
		OpenSSH (v6)               ALLOW       Anywhere (v6)
	```

## Set up domain

Optional Step - if you have a domain purchased for the application. Our deployment uses www.chronicle.quest.

This is already completed for this project, but if we were to start from scratch the instructions are as follows:

1. Log onto your domain name provider's website. We used namecheap.com for this project, so these instructions will be based on that.
2. Open the **Manage Domain** page for your domain.
3. Under the **Nameservers** heading, select **Custom DNS** and add the following entries: 
- ns1.digitalocean.com
- ns2.digitalocean.com
- ns3.digitalocean.com
4. Open up and log into **DigitalOcean** cloud dashboard. Navigate to the **Create** menu and select **Domains/DNS**.
5. Enter your domain into the **Enter Domain** field and then click **Add Domain**.
6. Click the added domain's name to view and modify its DNS records.
7. Create a new **A record**, and enter `@	` in the **Hostname** field, and enter the **ipv4** address of your deployment server into the **Will direct to** field. Leave the **TTL** as the default value `3600`. Click **Create Record**.
8. Create a new **A record**, and enter `www.<your-domain-here>` in the **Hostname** field, and enter the **ipv4** address of your deployment server into the **Will direct to** field. Leave the **TTL** as the default value `3600`. Click **Create Record**.
9. Create a new **CNAME Record**, and enter `api` in the **Hostname** field, and enter `@` into the **Is an alias of** field. Leave the **TTL** as the default value `43200`. Click **Create Record**.
10. Log onto the **Google Cloud Console** and under **APIs & Services** select **Domain Verification** and follow the instructions given to verify ownership for your domain.
11. Select **Credentials** and add your domain under **Authorized JavaScript origins** and **Authorized redirect URIs**. You may need to add all variations of it (eg. add both https://chronicle.quest and https://www.chronicle.quest) for it to work for Google user authentication.
12. Save changes in **Google Cloud Console**

## Install Nginx on Server

### Prerequisites

Above steps, as well as SSH into the server using the command `ssh root@<your-server's-ipv4-address>` if you have not already.

1. `sudo apt-get update`
2. `sudo apt-get install nginx`
3. `sudo ufw app list`
- Output should look something like: 
	```
	Available applications: 
		Nginx Full 
		Nginx HTTP 
		Nginx HTTPS 
		OpenSSH
	```
4. `sudo ufw allow 'Nginx HTTP'`
5. `sudo ufw status`
- Output should look something like
	```
	Status: active 
	To                         Action      From 
	--                         ------      ---- 
	OpenSSH                    ALLOW       Anywhere 
	Nginx HTTP                 ALLOW       Anywhere 
	OpenSSH (v6)               ALLOW       Anywhere (v6) 
	Nginx HTTP (v6)            ALLOW       Anywhere (v6)
	```
6. Check web server's status with `systemctl status nginx`
- Output should look something like
	```
	nginx.service - A high performance web server and a reverse proxy server
	     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset:>
	     Active: active (running) since Mon 2021-11-29 14:33:10 UTC; 45min ago
	       Docs: man:nginx(8)
	    Process: 9283 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_proce>
	    Process: 9294 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (c>
	   Main PID: 9295 (nginx)
	      Tasks: 2 (limit: 1136)
	     Memory: 3.2M
	     CGroup: /system.slice/nginx.service
	             ├─9295 nginx: master process /usr/sbin/nginx -g daemon on; master_>
	             └─9296 nginx: worker process

	Nov 29 14:33:10 chronicle systemd[1]: Starting A high performance web server an>
	Nov 29 14:33:10 chronicle systemd[1]: Started A high performance web server and>
	lines 1-15/15 (END)
	```
	If server is running properly, **Active** will be set to "active (running). 
	- You can test this further by accessing the **ipv4** address of the server in your browser or by accessing your previously set up domain name in your browser.
	- This should open the default Nginx landing page

## Create SSL Certificate with Certbot

This step documents how to secure your application using Let's Encrypt to create an SSL certificate so that your site will appear as **Secure** and use HTTPS.

### Prerequisites

Above steps, as well as SSH into the server using the command `ssh root@<your-server's-ipv4-address>` if you have not already.

### Install Dependencies

1. `sudo add-apt-repository ppa:certbot/certbot`
2. Press **Enter** to accept
3. `sudo apt-get update`	
4. `sudo apt-get install python-certbot-nginx`

### Set up Nginx Configuration

1. `sudo nano /etc/nginx/sites-available/default`
2. Add the following to the file:
	```
		server {
			listen 80 default_server;
			listen [::]:80 default_server;
			root /var/www/<your-domain-here>/html;
			index index.html index.htm index.nginx-debian.html;
			server_name <your-domain-here> www.<your-domain-here>;
			location / {
				try_files $uri $uri/ /index.html =404;
			}
		}

		server {
			server_name api.<your-domain-here>;
			location / {
				proxy_pass http://localhost:5000;
				proxy_http_version 1.1;
				proxy_set_header Upgrade $http_upgrade;
				proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
            }
		}
	```
3.  Verify configuration `sudo nginx -t`
- If you get any errors, reopen the file and check for typos or syntax issues.
4. Reload Nginx to load the configuration `sudo systemctl reload nginx`

### Update Firewall to allow HTTPS

1. `sudo ufw status`
- Output should look something like
	```
	Status: active 
	To                         Action      From 
	--                         ------      ---- 
	OpenSSH                    ALLOW       Anywhere 
	Nginx HTTP                 ALLOW       Anywhere 
	OpenSSH (v6)               ALLOW       Anywhere (v6) 
	Nginx HTTP (v6)            ALLOW       Anywhere (v6)
	```
2. `sudo ufw allow 'Nginx Full'`
3. `sudo ufw delete allow 'Nginx HTTP'`
4. `sudo ufw status`
- Output should look something like
	```
	Status: active 
	To                         Action      From 
	--                         ------      ---- 
	OpenSSH                    ALLOW       Anywhere 
	Nginx Full                 ALLOW       Anywhere 
	OpenSSH (v6)               ALLOW       Anywhere (v6) 
	Nginx Full (v6)            ALLOW       Anywhere (v6)
	```

### Create SSL Certificate

1. `sudo --certbot --nginx -d <your-domain-here> -d www.<your-domain-here> -d api.<your-domain-here>`
- Certbot will prompt you to choose your HTTPS settings:
	- Select **2** 
	- Hit **Enter**
	- Certbot will output a success message.
2. Test that renewal works properly `sudo certbot renew --dry-run`
	- If you have no errors, everything is probably working properly.
3. You can optionally with https://www.ssllabs.com/ssltest/.


## Install Node.js

### Prerequisites

Above steps, as well as SSH into the server using the command `ssh root@<your-server's-ipv4-address>` if you have not already.

1. `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`
2. `export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"`
3. `[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"`
4. `nvm install node`
5. Check that installation was successful -
- `node -v`
	- Should output `v17.1.0` or other 17.X.x version 
- `npm -v`
	- Should output `8.1.2` or other 8.X.x version 
6. `sudo apt-get install build-essential`

## Deploy React Frontend

### Prerequisites

Above steps, as well as SSH into the server using the command `ssh root@<your-server's-ipv4-address>` if you have not already.

Ensure that `/frontend/services/httpService.js` has set `axios.defaults.baseURL` to your API URL - eg. `axios.defaults.baseURL  =  'https://api.chronicle.quest/api';`

### Serve static client files

1. `sudo mkdir -p /var/www/<your-domain-here>/html`
2. `cd /var/www/<your-domain-here>/html`
3. `cat > index.html`
4. `nano index.html`
	- Add placeholder contents such as these: 
	```
	<html>
	  <head>
	    <title>Hello World!!!</title>
	  </head>
	  <body>
	    <h1>Success! The example.com server block is working!</h1>
	  </body>
	</html>
	```
	- Save and close the file.
5. `sudo nginx -t`
	- If there is an errror, check `/etc/nginx/sites-available/default` for syntax issues.
6. `sudo systemctl restart nginx`
7. Enter your domain name into your browser and ensure that the placeholder contents you added to index.html are displayed in the browser.

### Create build bundle

1. Back in your local development environment, run `npm run frontend-install`
2. Inside the root `package.json`, modify the **deploy** script to be `"cd frontend && npm run build && scp -r ./build/* root@<your-server-ipv4-here>:/var/www/<your-domain-here>/html"`
3. `npm run deploy`
	- This runs the build script to bundle your application into a static SPA package, in a folder called `/build`
	- This script also transfers the bundle to your server's filespace so that it can be served.
4. Inside of the server (ssh back in if you lost connection), run `sudo systemctl restart nginx`
5. Open your domain name or ipv4 address in the browser; the frontend/client of the application should now be served instead of the placeholder.

## Deploy Backend

### Prerequisites

Above steps, as well as SSH into the server using the command `ssh root@<your-server's-ipv4-address>` if you have not already.

Ensure that `/backend/init/cors.js` contains your domain name inside of the **origin** array for CORS.

### Clone and Configure Project

1. Inside SSH to your server, clone the project's git repository (main branch).
2. `cd WEBAPPS-10`
3. `npm install`
4. `npm run backend-install`
5. Create a .env file in the project's root `touch .env` and open it to edit `nano .env`.
- Add the following to the `.env` file
	```
	MONGODB_CONNECTION_STRING=<db-connection-string-here>

	PORT=5000

	CLIENT=http://chronicle.quest
	```
	Adding in the database connection string (secret).
6. Test that you are able to run the backend server `npm run start`
	- If the backend server does not connect properly, check that you have properly updated URLs to the domain throughout the project.
7. `CTRL+C` To stop the backend server.
8. Install PM2 `sudo npm i pm2 -g`
9. Start the backend server with pm2 `pm2 start ./backend/server.js`
10. Check that **server** was started and has status **online**: `pm2 list`  
11. Make sure app will start on reboot `pm2 startup ubuntu`
	- Can test this with `reboot` and then log into the server (SSH) again and `pm2 list` to check that **server** is running. 
12. Check Nginx syntax `sudo nginx -t`
13. Restart server `sudo service nginx restart`
14. Test that the server is running and accessible by using a tool like **Postman** or **CURL** to test a request to `https://api.chronicle.quest/api/auth/test` and ensure the response is `HELLO`.

> The application should now be properly deployed. Test that client requests to the API work properly and that there is no **Not Secure** warning or anything of the sort.

# Update Deployment

The frontend and backend are updated separately due to how the frontend is bundled.

## Update Frontend Deployment

1. In your local development environment, pull any changes and run `npm run frontend-install`
2. `npm run deploy`
	- This runs the build script to bundle your application into a static SPA package, in a folder called `/build`
	- This script also transfers the bundle to your server's filespace so that it can be served.
4. Inside of the server (`ssh root@<your-server's-ipv4-address>`), run `sudo systemctl restart nginx`

> Frontend deployment should now be updated

## Update Backend/API Deployment

1. SSH into your server `ssh root@<your-server's-ipv4-address>`
2. `pm2 stop server`
3. `cd WEBAPPS-10`
4. `git pull`
	- Enter your credentials if prompted
5. `npm run backend-install` if dependencies have changed
6. `pm2 start ./backend/server.js`
7. Check that server is running: `pm2 list`
8. Restart Nginx `sudo service nginx restart`

> Backend/API deployment should now be updated

# Stop Server

If you wish to take down the deployment, follow these steps

1. `ssh root@<your-server's-ipv4-address>`
2. `pm2 stop server`
3. `sudo service nginx stop`

> Deployment should now be offline.

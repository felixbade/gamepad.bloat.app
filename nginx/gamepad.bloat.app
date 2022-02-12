server {
	server_name gamepad.bloat.app;
	charset utf-8;
	root /var/www/gamepad.bloat.app/static;
	index index.html;

	location /ws/ {
		proxy_set_header HOST $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
		proxy_pass_request_headers on;
		proxy_pass http://127.0.0.1:8000;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "Upgrade";
	}

	location / {
		try_files $uri $uri/ =404;
	}
	
	listen 80;
}

# Nginx Configuration for Dashboard SPA Routing

The dashboard is a Single Page Application (SPA) that uses client-side routing. When users navigate to `/dashboard/sales-pipeline`, `/dashboard/lead-quality`, etc., nginx needs to know to serve the main `/dashboard/index.html` file so the JavaScript app can handle the routing.

## Required Nginx Configuration

Add this to your nginx configuration for the `salesconnect.com.au` server block:

```nginx
location /dashboard/ {
    # Serve static files and folders directly if they exist
    try_files $uri $uri/ /dashboard/index.html;
}
```

## Location in nginx.conf

This should be added in the `server { }` block for `salesconnect.com.au`, typically in:
- `/etc/nginx/nginx.conf`
- `/etc/nginx/sites-available/salesconnect.com.au`
- `/etc/nginx/conf.d/salesconnect.com.au.conf`

Example placement:

```nginx
server {
    listen 80;
    server_name salesconnect.com.au www.salesconnect.com.au;

    root /path/to/your/website;

    # ... other configuration ...

    # SPA Routing for Dashboard
    location /dashboard/ {
        try_files $uri $uri/ /dashboard/index.html;
    }

    # ... other location blocks ...
}
```

## How It Works

1. When a request comes to `/dashboard/sales-pipeline`
2. Nginx checks if that file exists (`$uri`)
3. If not, it checks if it's a directory (`$uri/`)
4. If neither exist, it serves `/dashboard/index.html`
5. The Next.js app running in the browser receives the HTML and determines what to display based on the URL

## After Applying Configuration

1. Save the nginx configuration file
2. Test the configuration: `sudo nginx -t`
3. Reload nginx: `sudo systemctl reload nginx` or `sudo service nginx reload`

The dashboard should then be fully functional with all navigation working properly!

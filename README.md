# Ultimaker3-Web-Dashboard
<<<<<<< HEAD

This is a simple web dashboard to view the webcam on the Ultimaker 3.  You can see a working example at http://ultimaker.hackrva.org

I'm using apache mod\_proxy as a reverse proxy. You will need to enable mod_proxy with:

    sudo a2enmod proxy
    sudo a2enmod proxy_http


Update /etc/apache2/sites-enabled/000-default.conf to reflect the below information.



    <VirtualHost *:80>

    ProxyPreserveHost On

    ProxyPass /stream http://<ip of your printer>:8080
    ProxyPass /api <ip of your printer>
    ProxyPassReverse /stream <ip of your printer>:8080
    ProxyPassReverse /api <ip of your printer>

    </VirtualHost>

*Be sure to update the information in javascripts/config.js to reflect your url*
=======
Be sure to change "<your printer's api>" and "<Your printer's api camera stream>" to match your printer.

To make this externally accessible you will need to set up a reverse proxy.  
>>>>>>> 34d86b50d80967bd0f82b91c65e1fb4c654b0912

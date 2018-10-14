function localtunnel {
  lt -s YOUR_SUBDOMAIN --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done


# this was originally in my package.json
#"webhook": "lt -p 5000 -s atsouhsaoussou"

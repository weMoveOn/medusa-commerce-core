curl -X POST '{backend_url}/admin/collections' \
-H 'x-medusa-access-token: {api_token}' \
-H 'Content-Type: application/json' \
--data-raw '{
    "title": "New Collection"
}'

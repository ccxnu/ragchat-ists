#!/bin/bash

# Ir al directorio del script
cd "$(dirname "$0")"
echo 'Inicio'

# Variables
NAME_CONTAINER="api-ragchat"
NAME_IMAGE="api-ragchat"
PORT_EXPOSE=8048
ENV_FILE="/CONFIG/VARIABLES_ENTORNO/ragchat-ists/.env"
NETWORK="ists"

docker build --target production -t "$NAME_IMAGE" -f Dockerfile .

echo 'Compilado correctamente'

docker rm -f "$NAME_CONTAINER"

docker run -d \
  --restart=always \
  --name "$NAME_CONTAINER" \
  --env-file "$ENV_FILE" \
  --network "$NETWORK" \
  -p "$PORT_EXPOSE":3000 \
  "$NAME_IMAGE"

echo 'Successfull service'

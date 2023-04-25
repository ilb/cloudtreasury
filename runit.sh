docker run \
  -it \
  --rm \
  --env-file .env \
  -p 3000:3000 \
  --add-host=host.docker.internal:host-gateway \
  cloudtreasury $*


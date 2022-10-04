# Venom CLI - WEB UI APPLICATION FOR SHOW HTTP REQUESTS

## Tech Stack

**Server:** Venom CLI <= 1.0.1, Docker, Docker Compose, Node js

## Creation Dump

To create api result dum run following command

```bash
venom run tests/api/api.yml -vv --output-dir ./result
```

## Docker-compose use config

```yml
version: "3.9"

services:

  test-ui:
#    build:
#      context: ..
#      dockerfile: server/Dockerfile
    image: igor368/venom-cli-requests-ui:v0.0.2
    environment:
      - REACT_APP_PROJECT_NAME="TEST APP111"
      - REACT_APP_PROJECT_DESCRIPTION="It's test text only"
    volumes:
      - ../public/results:/code/results # Link test result directory for parse them
    ports:
      - "8087:3002"
```

## Related

[Venom repository](https://github.com/ovh/venom)



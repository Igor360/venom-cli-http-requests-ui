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
    image: igor368/venom-cli-requests-ui:v0.0.5
    environment:
      - REACT_APP_PROJECT_NAME="TEST APP111"
      - REACT_APP_PROJECT_DESCRIPTION="It's test text only"
    volumes:
      - - ../public/result/:/usr/src/app/explorer-server/public/result # Link test result directory for parse them
    ports:
      - "8087:3002"
```

## Venom http config sample

```yaml

name: "Private routes tests"
vars:
  URL: "http://127.0.0.1"
  API_VER: "v1"

testcases:
  - name: "GLOBALTAGFORSTEPS - Registration"
    tag: "Auth"
    steps:
      - type: http
        tag: "SPECIFICTAGFORSTEP"
        url: "{{.URL}}/api/{{.API_VER}}/registration"
        headers:
          Content-Type: "application/json"
        info: request is {{.result.request.method}} {{.result.request.url}} {{.result.request.body}}
        method: POST
        bodyFile: "./http/register.json"
        assertions:
          - result.statuscode ShouldEqual 201
      - type: http
        tag: "Auth"
        url: "{{.URL}}/api/{{.API_VER}}/registration"
        headers:
          Content-Type: "application/json"
        method: POST
        body: "{}"
        assertions:
          - result.statuscode ShouldEqual 400

  - name: "Login"
    steps:
      - type: http
        url: "{{.URL}}/api/{{.API_VER}}/login"
        method: POST
        headers:
          Content-Type: "application/json"
        info: request is {{.result.request.method}} {{.result.request.url}} {{.result.request.body}}
        bodyFile: "./http/login.json"
        assertions:
          - result.statuscode ShouldEqual 200
      - type: http
        url: "{{.URL}}/api/{{.API_VER}}/login"
        method: POST
        headers:
          Content-Type: "application/json"
        body: "{}"
        info: request is {{.result.request.method}} {{.result.request.url}} {{.result.request.body}}
        assertions:
          - result.statuscode ShouldEqual 400
  - name: "Profile info"
    steps:
      - type: http
        url: "{{.URL}}/api/{{.API_VER}}/profile"
        method: GET
        headers:
          Content-Type: "application/json"
          Authentication: "Bearer "
        body: "{}"
        info: Get user details
        assertions:
          - result.statuscode ShouldEqual 401


```

## Related

[Venom repository](https://github.com/ovh/venom)



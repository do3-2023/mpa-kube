# Push teh docker image to ghcr

## login to ghcr

```bash
docker login ghcr.io -u USERNAME
```

## build image

```bash
cd web
docker build -t ghcr.io/do3-2023/mpa-kube/web:v0.1 .
```

## test image

```bash
docker run -itp 8080:8080 ghcr.io/do3-2023/mpa-kube/web:v0.1
```

## Push on repo github

```bash
docker push ghcr.io/do3-2023/mpa-kube/web:v0.1
```



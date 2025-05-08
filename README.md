# User Manager Application

Prueba técnica ITGlobers

![Descripción del gif](/imgs/git-video.gif)

![alt text](/imgs/image-02.png)

Este proyecto fue construido con las siguientes tecnologías

- **Backend:** NodeJS con Arquitectura Hexagonal
- **Frontend:** React
- **BD:** MongoDB
- **Framework CSS:** TailwindCSS

## Prerequisites

Para ejecutar este proyecto tenga instalado:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Ejecutar el aplicativo con Docker Compose

1.  **Clona el repositorio:**

```bash
git clone https://github.com/luig2-prog/usersITGlobers.git
cd usersITGlobers
```

1.  **Inicia los servicios:**

Windows: 
```bash
docker-compose up --build -d
```

Linux:
```bash
sudo docker compose up --build -d
```

1.  **Accede al aplicativo:**

Cuando los contenedores estén corriendo puede dirigirse a: [http://localhost:3000](http://localhost:3000)

## Parar el aplicativo

Para y elimina los contenedores, redes y volúmenes creados por `docker-compose up`:

Windows:
```bash
docker-compose down
docker volume rm usersitglobers_auth_data
```

Linux:
```bash
sudo docker compose down
sudo docker volume rm usersitglobers_auth_data
```

![alt text](/imgs/image-01.png)

![alt text](/imgs/image-02.png)

![alt text](/imgs/image-03.png)


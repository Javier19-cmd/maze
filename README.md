
# Maze Game

Maze Game es un juego de laberinto donde los jugadores pueden seleccionar la dificultad y navegar a través del laberinto para encontrar el final.

## Características

- Selección de dificultad (Fácil, Medio, Difícil)
- Generación aleatoria de laberintos
- Puntuación basada en la dificultad
- Interfaz gráfica elegante y moderna
- Diseño responsivo

## Requisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)
- Vercel CLI para desplegar el servidor

## Instalación

### Clonar el repositorio

```bash
git clone https://github.com/Javier19-cmd/maze.git
cd maze
```

### Configuración del servidor

1. Navega al directorio del servidor:

```bash
cd server
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en el directorio `server` con el siguiente contenido:

```env
PORT=5000
```

4. Inicia el servidor:

```bash
npm start
```

El servidor estará corriendo en `http://localhost:5000`.

### Configuración del cliente

1. Navega al directorio del cliente:

```bash
cd client
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en el directorio `client` con el siguiente contenido:

```env
REACT_APP_SERVER=http://localhost:5000
```

4. Inicia el cliente:

```bash
npm start
```

El cliente estará corriendo en `http://localhost:3000`.

## Despliegue

### Despliegue del servidor en Vercel

1. Instala Vercel CLI si no lo tienes:

```bash
npm install -g vercel
```

2. Despliega el servidor:

```bash
cd server
vercel
```

Sigue las instrucciones de Vercel para completar el despliegue. Obtendrás una URL donde tu servidor estará disponible.

### Despliegue del cliente

1. Actualiza el archivo `.env` del cliente para apuntar a la URL del servidor desplegado en Vercel. Por ejemplo:

```env
REACT_APP_SERVER=https://maze-ruddy-two.vercel.app/
```

2. Construye el cliente:

```bash
npm run build
```

3. Despliega el cliente en el servicio de tu elección (por ejemplo, Vercel, Netlify, GitHub Pages, etc.)

## Uso

1. Accede a la aplicación en tu navegador web. (Link: https://maze-sage.vercel.app/)
2. Selecciona la dificultad del laberinto.
3. Navega a través del laberinto usando las teclas de flecha.
4. Encuentra la meta para ganar y ver tu puntuación.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue los pasos a continuación para contribuir:

1. Haz un fork del proyecto.
2. Crea una rama para tu nueva funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios.
4. Haz commit de tus cambios (`git commit -m 'Añadir nueva funcionalidad'`).
5. Sube tus cambios a tu fork (`git push origin feature/nueva-funcionalidad`).
6. Abre un Pull Request.
# BLR Hotels - Tipti Challenge

**Tecnologías solicitadas** - HTML, CSS, JS | 
**Fecha de entrega** - 28/07/2024 | 
**Refactor (post challenge)** - 02/08/2024

## Análisis del problema

BLR es una cadena de hoteles que opera en Miami (EEUU). BLR desea crear un sitio web donde sea posible realizar reservas de habitaciones, y cuenta con tres hoteles con distintos rangos de precio. 

La premisa del desafío consiste en desarrollar un programa que permita al usuario **conocer la opción más asequible según sus necesidades de hospedaje**, la oferta disponible, y su estatus de afiliado (o no) al programa de recompensas de la cadena hotelera.

En este caso en particular, no se precisa que el usuario escoja el hotel donde se hospedará, ya que se busca sugerirle de antemano qué opción es la que debería considerar (y elegir) sobre las demás.

## Diseño de la solución

Para las fases de ideación, diseño y prototipado, me basé en los principios esenciales de la metodología Design Thinking:

### 👥 **Empatizar**

Si estoy planificando mis vacaciones tan anheladas después de un semestre ajetreado, **¿me resultaría agradable o tedioso tener muchas opciones para escoger?** Si tengo mucha información que evaluar para decidir, posiblemente me será difícil mantener la secuencia lógica de mi búsqueda en el sitio web, y me sentiría frustrada al respecto.

### 📍**Definir**

Ya que una de las frustraciones más grandes de los usuarios es el exceso de opciones e información, me propuse abordar ese problema en este proyecto: Según la **Ley de Hick** (para UX/UI Design), “cuantas más opciones tiene un usuario, más tiempo tarda en decidir y responder”.

Al investigar un poco y comparar diferentes tipos de interfaces, encontré que la página de inicio de AirBnb cuenta con una herramienta de búsqueda bastante sencilla —pese a lo específico y variado de sus opciones secundarias. 

Gracias a ese pequeño descubrimiento, decidí inspirarme en AirBnb para diseñar una experiencia de usuario que busca optimizar el tiempo del usuario y, a su vez, ser amena y estéticamente agradable —expresando de cierta forma la experiencia de hospedaje que BLR ofrece en sus hoteles.

### 💡**Idear**

Pensé adecuado diseñar una herramienta de *pre check-in* sencilla y concreta, y dividir en dos partes (o pasos) el sitio web:

- **Herramienta de pre check-in:** Solo requiere de tres datos para entrar en acción: fecha de llegada, fecha de salida, y estatus de afiliación al programa de recompensas de BLR
- **Secciones, sitio web:** Al llegar al sitio web, solo se visualiza el *pre check-in* como el todo de la página. Al hacer click en el botón `Consultar`, se descubre una nueva sección con los *resultados* de la solicitud del cliente.

### 💻 **Prototipado y Desarrollo**

En esta fase, plasmé en maquetas mis ideas sobre cómo debería ser la UI del sitio web. 🐥 Puedes ver la maqueta definitiva aquí: https://github.com/nsandoya/blr_hotels_tipti_challenge/blob/main/src/assets/prototipe/blr_hotels_challenge.pdf

Después de escoger los diseños definitivos, desarrollé el sitio web usando HTML, CSS y JavaScript. 

🍃 Las funciones están pensadas para ser distribuidas en varios files, siguiendo un patrón inspirado en un framework frontend: componentes, servicios, db, tools:

####App: main.js
- `fetchHotelsData` importa el servicio `getHotels` para obtener los datos de los hoteles 
####Services
- `getHotels` realiza una solicitud asíncrona a GitHub para obtener los datos de los hoteles, alojados allí en un archivo .json
####Components
- `seeCheaperHotelBtn` : Ejecuta internamente varios tools (enlistados abajo) cuando el cliente realiza una consulta sobre su reserva.
- `hotelCards` : El hotel más asequible se muestra en pantalla gracias a la función `setFinalResults`. Por otra parte, el detalle de precios de cada hotel se muestra posteriormente, bajo la main card, gracias a la función `setPriceDetails` .
- `hotelCardDetails` contiene las funciones `setDates` y `calculateStars`, encargadas de mostrar (con estrellas) el ranking de los hoteles y las fechas de check-in y check-out del cliente.
####Tools
- `calculatePrices` : En la función `calculatePrinces` convergen otras 'piezas' más pequeñas que generan el rango de días y los precios de los hoteles. Como segundo paso, la función toma esa info y ordena los hoteles en una lista. Además, `calculateMinPrice` calcula el precio mínimo entre todos los hoteles.
- `clientDetails`: La función `isAfiliate` incluye un event listener que verifica si el cliente está afiliado o no al programa de recompensas de BLR.
- `hotelPrices`: La función `hotelPrices` realiza un calculo puntual de todos los precios de los hoteles 
- `scanDayByDay`: La función `scanDayByDay` verifica que los inputs tipo date del sitio web contengan fechas válidas y, a partir de ellas, evalúa qué fechas son parte del fin de semana o son weekdays.

### 🔎 **Evaluación**

A lo largo del proceso de desarrollo, se realizaron varias pruebas técnicas y de usabilidad con el fin de evaluar el funcionamiento del sitio web, tanto a nivel funcional como de experiencia de usuario.

## Instrucciones: Cómo ejecutar la aplicación
🤖 **Despliegue**
- El sitio web de BLR ha sido desplegado en `GitHub Pages`: https://nsandoya.github.io/blr_hotels_tipti_challenge/

- Además del sitio online, es posible descargar el fichero y probarlo localmente, usando `Live Server` u otros servicios similares. Para descargar el fichero en tu PC, puedes descargarlo en formato `.zip` dirigiéndote al botón `Code → Download ZIP`, en la página principal del repositorio del proyecto.

👩🏻‍💻 **Cómo funciona**
Al entrar al sitio web, solo serán necesarios dos pasos:
1. Ingresar las fechas de check-in y check-out, y definir el status de afiliación.
2. Dar click en el botón `Consultar`. 
Si los campos están completos, se descubrirá una nueva sección donde se podrán visualizar los resultados de la consulta 🙂 —es posible repetir esta operación las veces que sea necesario.

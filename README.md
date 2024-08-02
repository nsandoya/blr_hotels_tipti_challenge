# BLR Hotels - Tipti Challenge

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

En esta fase, plasmé en maquetas mis ideas sobre cómo debería ser la UI del sitio web.

🐥 Puedes ver la maqueta definitiva aquí: https://github.com/nsandoya/blr_hotels_tipti_challenge/blob/main/src/assets/prototipe/blr_hotels_challenge.pdf

Después de escoger los diseños definitivos, desarrollé el sitio web usando HTML, CSS y JavaScript. En esta ocasión, usé un enfoque **funcional**: muchas piezas (funciones) van componiendo procesos cada vez más grandes para cumplir el objetivo: sugerir al usuario cuál es la opción más asequible según sus necesidades, ayudándolo así a planificar su viaje.

`🍃 PD: Originalmente, las funciones estaban pensadas para ser distribuidas en varios files, siguiendo un patrón inspirado en un framework frontend: componentes, servicios, db, tools... Sin embargo, un problema con el import-export por módulos en JavaScript requirió un cambio rápido al enfoque que está actualmente vigente .`

### 🔎 **Evaluación**

A lo largo del proceso de desarrollo, se realizaron varias pruebas técnicas y de usabilidad con el fin de evaluar el funcionamiento del sitio web, tanto a nivel funcional como de experiencia de usuario.

## Instrucciones: Cómo ejecutar la aplicación
🤖 **Despliegue**
- El sitio web de BLR cuenta con procesos internos que no requieren conectarse a una DDBB en la nube ni inicializar un servidor —el website ha sido desplegado en `GitHub Pages`: https://nsandoya.github.io/blr_hotels_tipti_challenge/

- Además del sitio online, es posible descargar el fichero y probarlo localmente, usando `Live Server` u otros servicios similares. Para descargar el fichero en tu PC, puedes descargarlo en formato `.zip` dirigiéndote al botón `Code → Download ZIP`, en la página principal del repositorio del proyecto.

👩🏻‍💻 **Cómo funciona**
Al entrar al sitio web, solo serán necesarios dos pasos:
1. Ingresar las fechas de check-in y check-out, y definir el status de afiliación.
2. Dar click en el botón `Consultar`. 
Si los campos están completos, se descubrirá una nueva sección donde se podrán visualizar los resultados de la consulta 🙂 —es posible repetir esta operación las veces que sea necesario.
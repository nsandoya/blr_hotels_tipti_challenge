# BLR Hotels - Tipti Challenge

Adjuntar un README con una explicación del diseño de la solución, suposiciones del
problema e instrucciones detalladas de cómo ejecutar la aplicación.

## Suposiciones del problema

BLR es una cadena de hoteles que opera en Miami (EEUU). BLR desea crear un sitio web donde sea posible realizar reservas de habitaciones, y cuenta con tres hoteles con distintos rangos de precio. 

La premisa del desafío consiste en desarrollar un programa que permita al usuario conocer la opción más asequible según sus necesidades de hospedaje, la oferta disponible, y su estatus de afiliado (o no) al programa de recompensas de la cadena hotelera.

En este caso en particular, no parece necesario que el usuario escoja el hotel donde se hospedará, ya que se busca sugerirle de antemano qué opción es la que debería considerar (y elegir) sobre las demás.

## Diseño de la solución

Para las fases de ideación, diseño y prototipado, me basé en los principios esenciales de la metodología Design Thinking:

### 👥 Empatizar

Si estoy planificando mis vacaciones tan anheladas después de un semestre ajetreado, **¿me resultaría agradable o tedioso tener muchas opciones para escoger?** Posiblemente me será difícil mantener la secuencia lógica de mi búsqueda en el sitio web, y me sentiría frustrada al respecto.

### 📍**Definir**

Ya que una de las frustraciones más grandes de los usuarios es el exceso de opciones e información, me propuse abordar ese problema en este proyecto: Según la Ley de Hick (para UX/UI Design), “cuantas más opciones tiene un usuario, más tiempo tarda en decidir y responder”.

Al investigar un poco y comparar diferentes tipos de interfaces, encontré que la página de inicio de AirBnb cuenta con una herramienta de búsqueda bastante sencilla —pese a lo específico y variado de sus opciones secundarias. 

Gracias a ese pequeño descubrimiento, decidí inspirarme en AirBnb para diseñar una experiencia de usuario que busca optimizar el tiempo del usuario y, a su vez, ser amena y estéticamente agradable —expresando de cierta forma la experiencia de hospedaje que BLR ofrece en sus hoteles.

### 💡**Idear**

Pensé adecuado diseñar una herramienta de *pre check-in* sencilla y concreta, y dividir en dos partes (o pasos) el sitio web:

- **Herramienta de pre check-in:** Solo requiere de tres datos para entrar en acción: fecha de llegada, fecha de salida, y estatus de afiliación al programa de recompensas de BLR
- **Secciones, sitio web:** Al llegar al sitio web, solo se visualiza el *pre check-in* como el todo de la página. Al hacer click en el botón *Consultar*, se descubre una nueva sección con los *resultados* de la solicitud del cliente.

### 💻 **Prototipado y Desarrollo**

En esta fase, plasmé en maquetas mis ideas sobre cómo debería ser la UI del sitio web.

![blr_hotels_challenge (v2).png](https://prod-files-secure.s3.us-west-2.amazonaws.com/eb38796e-134d-41de-9c24-4cfec9cc2d83/c4608e8b-e681-4e28-a584-f2edcab2e962/blr_hotels_challenge_(v2).png)

![blr_hotels_challenge(2).png](https://prod-files-secure.s3.us-west-2.amazonaws.com/eb38796e-134d-41de-9c24-4cfec9cc2d83/117674f6-6546-4e33-be7c-4ddd62e152db/blr_hotels_challenge(2).png)

![blr_hotels_challenge(1).png](https://prod-files-secure.s3.us-west-2.amazonaws.com/eb38796e-134d-41de-9c24-4cfec9cc2d83/4e7e434c-66d3-48dc-af11-e2152c211992/blr_hotels_challenge(1).png)

![blr_hotels_challenge (v2)(1).png](https://prod-files-secure.s3.us-west-2.amazonaws.com/eb38796e-134d-41de-9c24-4cfec9cc2d83/08044dd7-ba23-41b9-8453-d57ef824c50e/blr_hotels_challenge_(v2)(1).png)

Después de escoger los diseños definitivos, desarrollé el sitio web usando HTML, CSS y JavaScript. Usé un enfoque funcional: muchas piezas (funciones) van componiendo procesos cada vez más grandes para cumplir el objetivo: sugerir al usuario cuál es la opción más asequible según sus necesidades, ayudándolo así a planificar su viaje

### 🔎 **Evaluación**

A lo largo del proceso de desarrollo, se realizaron varias pruebas técnicas y de usabilidad con el fin de evaluar el funcionamiento del sitio web, tanto a nivel funcional como de experiencia de usuario.

## Instrucciones: Cómo ejecutar la aplicación

El sitio web de BLR cuenta con procesos internos que no requieren conectarse a una DDBB en la nube ni inicializar un servidor —el website ha sido desplegado en GitHub Pages: https://nsandoya.github.io/blr_hotels_tipti_challenge/

Además del sitio online, es posible descargar el fichero y probarlo localmente, usando Live Server u otros servicios similares. Para descargar el fichero en tu pc, puedes descargarlo en formato .zip dirigiéndote al botón Code → Download ZIP, en la página principal del repositorio del proyecto.

Al entrar al sitio web, solo será necesario ingresar las fechas de check-in y check-out, definir el status de afiliación, y dar click en Consultar. Si los campos están completos, se descubrirá una nueva sección donde se podrán visualizar los resultados de la consulta 🙂 —es posible repetir esta operación las veces que sea necesario.
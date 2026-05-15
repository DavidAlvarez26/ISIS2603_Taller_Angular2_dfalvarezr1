# Respuestas conceptuales - Taller Angular

## 1. Observables y asincronia

**a.** Las peticiones HTTP en Angular devuelven un Observable porque la respuesta no llega inmediatamente. El servidor puede demorarse, fallar o responder despues, entonces Angular entrega un flujo al que uno se suscribe cuando quiere recibir el resultado. Frente a una Promise, el Observable es mas flexible: puede cancelarse, puede transformarse con operadores de RxJS y puede representar flujos de varios valores, aunque en HTTP normalmente solo llegue una respuesta.

**b.** Si un componente llama a un servicio HTTP pero nunca hace .subscribe(), la peticion no se ejecuta. Los Observable de HttpClient son perezosos, es decir, se activan cuando alguien se suscribe.

## 2. Inyeccion de dependencias

**c.** providedIn: 'root' permite que Angular cree y administre una sola instancia del servicio para toda la aplicacion. Eso es mejor que hacer new CityService() porque el componente no queda encargado de construir dependencias ni de conocer todos los parametros internos del servicio.

**d.** La inyeccion de dependencias facilita las pruebas porque se puede reemplazar un servicio real por un mock o un stub. Por ejemplo, en una prueba del componente se puede entregar un CityService falso que retorne ciudades de prueba sin conectarse al backend.

## 3. Interceptores

**e.** Es mejor centralizar los errores en un HttpInterceptor porque evita repetir el mismo manejo de errores en cada componente. Asi todos los errores HTTP pasan por un mismo punto y los componentes quedan mas simples.

**f.** Dos usos adicionales de un interceptor son agregar tokens de autenticacion a las peticiones y registrar tiempos o logs de las llamadas HTTP. Tambien podria servir para modificar headers comunes.

## 4. Patron maestro-detalle

**g.** Se usa @Input() para pasar la ciudad al CityDetailComponent porque la ciudad ya fue cargada en la lista. Volver a consultar /api/cities/{id} seria repetir una llamada que no aporta mucho en este caso.

**h.** Que country venga como objeto anidado ayuda al frontend porque ya puede mostrar el nombre del pais directamente. Si solo viniera countryId, tocaria hacer otra peticion o cruzar datos manualmente para mostrar la tabla.

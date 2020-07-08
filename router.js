class Router {
  constructor(routes) {
    // Guardamos el array de rutas:
    this.routes = routes;

    // Inicializamos las rutas:
    this._loadInitialRoute();
  };

  // Debido que es un método de inicialización de la clase, debe ser privado _:
  // Función que se encarga de encontra la ruta inicial y definir los segmentos de la ruta ("", "contact", "aboutme").
  _loadInitialRoute() {
    // Guardamos en pathNameSplit un array separado por /.
    const pathNameSplit = window.location.pathname.split('/');
    // Guardamos en pathSegs el 2do elemento del array (el segmento que queremos "" o contact o aboutme) en caso de que el array contenga más de 1 elemento, en caso de no ser así, se guarda un string vacío '':
    const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : '';

    // Corremos loadRoute con la destructuración de pathSegs:
    this.loadRoute(...pathSegs);
  };

  // Comparamos si la URL que se está buscando (urlSegs que está hard codeado al darle click a un elemento del menú) está en nuestras routes:
  _matchUrlToRoute(urlSegs) {
    // Guardamos en matchedRoute el elemento del array que cumpla con la condición indicada:
    const matchedRoute = this.routes.find(route => {
      // Guardamos en routePathSegs lo que está despues del / o sea el path:
      const routePathSegs = route.path.split('/').slice(1);

      // Validamos que tengan el mismo tamaño:
      if (routePathSegs.length !== urlSegs.length) {
        return false;
      };

      // Retornamos a routePathSegs con una condición generado por el método .every() , esto lo que hace es verficar con una condición cada elemento de un array y en caso de que todos lo cumpla, nos retorna un booleano del tipo true, en caso de que alguno no lo cumpla, nos retorna un booleano del tipo false:
      return routePathSegs
        // Condición si alguno es igual...
        .every((routePathSeg, i) => routePathSeg === urlSegs[i]);
    });

    // Por último, se retorna a matchedRoute:
    return matchedRoute;
  };

  // DATO: Cuando agarramos un parámetro de un array de la siguiente forma: ...urlSegs estamos creando una copia del array que pasamos como parámetro.
  // loadRoute() se encargará de cambiar la URL por la que el usuario desea y cambiar el contenido en caso de que la URL que el usuario desea y nuestras routes tengan coincidencia:
  loadRoute(...urlSegs) {
    // Guardamos la URL que coincidió con alguna de nuestras rutas.
    const matchedRoute = this._matchUrlToRoute(urlSegs);
    // Guardamos la url que quiere acceder el usuario completa:
    const url = `/${urlSegs.join('/')}`;
    // Seleccionamos el elemento al que se le va hacer el cambio de contenido:
    const routerOutElm = document.querySelectorAll('[data-router]')[0];

    // Cambiamos la URL por la que desea el usuario:
    history.pushState({}, 'this works', url);
    // Cambiamos el contenido de la página por el que desea el usuario, siempre y cuando la ruta coincida:
    routerOutElm.innerHTML = matchedRoute.template;
  }
};
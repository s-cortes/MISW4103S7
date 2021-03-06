# CypressTest


## Estructura de Archivos

```
π¦cypress
 β£---π downloads
 β£---π fixtures
 β   β£---π negative
 β   β   β£---π articles.json
 β   β   β£---π members.json
 β   β   β---π tags.json
 β   β£---π positive
 β   β   β£---π articles.json
 β   β   β£---π members.json
 β   β   β---π tags.json
 β   β£---π urls.js
 β   β---π user.json
 β£---π integration
 β   β£---π escenarios
 β   β   β£---π aleatorio
 β   β   β   β£---π escenarios_f001.spec.js
 β   β   β   β£---π escenarios_f002.spec.js
 β   β   β   β£---π escenarios_f003.spec.js
 β   β   β   β£---π escenarios_f004.spec.js
 β   β   β   β---π escenarios_f005.spec.js
 β   β   β£---π pool-apriori
 β   β   β   β£---π escenarios_f001.spec.js
 β   β   β   β£---π escenarios_f002.spec.js
 β   β   β   β£---π escenarios_f003.spec.js
 β   β   β   β£---π escenarios_f004.spec.js
 β   β   β   β---π escenarios_f005.spec.js
 β   β   β---π pool-dinamico
 β   β   β   β£---π escenarios_f001.spec.js
 β   β   β   β£---π escenarios_f002.spec.js
 β   β   β   β£---π escenarios_f003.spec.js
 β   β   β   β£---π escenarios_f004.spec.js
 β   β   β   β---π escenarios_f005.spec.js
 β   β£---π generator
 β   β   β   β---π mockaroo_manager.js
 β   β---π pages
 β   β   β£---π admin
 β   β   β   β£---π dashboard.js
 β   β   β   β£---π editor.js
 β   β   β   β£---π login.js
 β   β   β   β£---π settings.js
 β   β   β   β---π tag.js
 β   β   β---π user
 β   β   β   β£---π article.js
 β   β   β   β---π home.js
 β£---π plugins
 β   β---π index.js
 β---π support
 β   β£---π commands.js
 β   β---π index.js

```

## Dependecias y Versionamiento

A continuaciΓ³n, se presentan las dependencias principales para la ejecuciΓ³n de las pruebas Cypress.

| Dependencia | VersiΓ³n  |
| ----------- | -------- |
| NodeJs      | ^14.19.1 |
| Npm         | ^6.14.16 |
| Ghost CLI   | 1.19.3   |
| Ghost (App) | 4.47.0   |

## InstalaciΓ³n y Configuraciones

`Importante!` Todos los comandos que se muestran a continuaciΓ³n deben ser ejecutados utilizando la carpeta `CypressTest` como la raΓ­z (root) del proyecto.

Para poder hacer uso de los escenarios de prueba establecidos, es necesario ejecutar los siguientes comandos en la terminal (en caso de utilizar Windos SO, se recomienda hacer uso de powershell)

```shell
npm install
```

Este proyecto hace uso, principalmente, de 2 dependencias: `cypress`, `@faker-js/faker`, y `mockaroo` (generaciΓ³n de datos para pruebas). Los siguientes comandos muestran cΓ³mo hacer la instalaciΓ³n de estas dependencias

```shell
npm install cypress --save-dev
npm install @faker-js/faker --save-dev
npm install mockaroo
```

### Credenciales Ghost Admin
Adicionalmente a la instalaciΓ³n de dependencias, los scripts de pruebas requieren de las credenciales del usuario administrador de Ghost para poder ser ejecutadas. Para ello, se tiene el archivo `user.json` en donde se debe colocar tanto el correo como la contraseΓ±a del administrador.

~~~
    Aviso: Dado que se necesitan las credenciales del administrador, se espera
    que la aplicaciΓ³n Ghost cuente con un usuario admin creado previamente. En
    caso de no tener dicho usuario, dirigirse a la pΓ‘gina de setup para la
    creaciΓ³n del usuario
    
    Setup: http://<url>:<port>/ghost/#/setup
~~~


## Despliegue

### Despliegue AplicaciΓ³n Ghost

Antes de poder ejecutar las pruebas de Cypress, es necesario el despliegue de la aplicaciΓ³n Ghost que se desea probar. para ello, se debe ejecutar el siguiente comando dentro de la carpeta raΓ­z de la aplicaciΓ³n Ghost

```shell
ghost start
```

### EjecuciΓ³n de Pruebas Cypress
Para desplegar el proyecto, se debe ejecutar algunode los siguientes comandos

```shell
# Utilizando el comando definido en pagake.json
npm run cypress:open

# Directamente desde node_modules
./node_modules/.bin/cypress open
```

Una vez la aplicaciΓ³n de Cypress haya sido desplegada, es posible ejecutar las pruebas al seleccionar alguno de los archivos de la carpeta π  `escenarios`.

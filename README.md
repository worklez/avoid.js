avoid.js
========

Tiny C/JavaScript wrapper around [libavoid](https://github.com/mjwybrow/adaptagrams/tree/master/cola/libavoid).

Example
=======
First, include the libs.
```html
<!-- emscripten-compiled libavoid with a C wrapper -->
<script type="text/javascript" src="avoid.bin.js"></script>
<!-- JavaScript interface to use avoid.bin.js painlessly -->
<script type="text/javascript" src="avoid.js"></script>
```

Then, add some javascript.
```javascript
var router = new Avoid.Router();
var shape = new Avoid.Shape(router, 20, 35, 40, 12);
var connection = Avoid.Connection.connectPoints(router, 1.2, 0.5, 3, 4);

var route;

router.processTransaction();
route = connection.displayRoute();
document.write(JSON.stringify(route) + "<br/>"); // [[1.2,0.5],[3,4]]

router.moveShapeRect(shape, 1, 0.5, 3, 4);

router.processTransaction();
route = connection.displayRoute();
document.write(JSON.stringify(route) + "<br/>"); // [[1.2,0.5],[3,0.5],[3,4]]
```

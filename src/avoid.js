

(function (global) {

	function Avoid() { }

	Avoid.C = {
		// void *createRouter()
		createRouter: Module.cwrap('createRouter', 'number'),

		// void *createShape(void* router, double x1, double y1, double x2, double y2)
		createShape: Module.cwrap('createShape', 'number', ['number', 'number', 'number', 'number', 'number']),

		// void moveShape(void *router, void* shapeRef, double x, double y)
		moveShape: Module.cwrap('moveShape', 'number', ['number', 'number', 'number', 'number']),

		// void moveShapeRect(void *router, void* shapeRef, double x1, double y1, double x2, double y2)
		moveShapeRect: Module.cwrap('moveShapeRect', 'number', ['number', 'number', 'number', 'number', 'number', 'number']),

		// void processTransaction(void *router)
		processTransaction: Module.cwrap('processTransaction', 'number', ['number']),

		// void *connect(void* router, double x1, double y1, double x2, double y2)
		connectLine: Module.cwrap('connectLine', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number']),

		// void *connectShapes(void* router, void* shapeRef1, void* shapeRef2, int classId1, int classId2)
		connectShapes: Module.cwrap('connectShapes', 'number', ['number', 'number', 'number', 'number', 'number']),

		// void disconnect(void *router, void* connRef)
		disconnect: Module.cwrap('disconnect', 'number', ['number', 'number']),


		// size_t displayRoute(void *connRef, void* array, size_t maxpoints)
		displayRoute: Module.cwrap('displayRoute', 'number', ['number', 'number', 'number']),

		// void *createShapeConnectionPin(void* shapeRef, int classId, double xOffset, double yOffset)
		createShapeConnectionPin: Module.cwrap('createShapeConnectionPin', 'number', ['number', 'number', 'number', 'number']),

		//void setShapeBuffer(void *router, double value)
		setShapeBuffer: Module.cwrap('setShapeBuffer', 'number', ['number', 'number'])
	};

	Avoid.Router = function () {
		this._handle = Avoid.C.createRouter();
	};

	Avoid.ConnDir = {
		UP: 1,
		DOWN: 2,
		LEFT: 4,
		RIGHT: 8,
		ALL: 15
	};

	Avoid.Router.prototype = {
		moveShape: function (shape, xDiff, yDiff) {
			Avoid.C.moveShape(this._handle, shape._handle, xDiff, yDiff);
		},

		moveShapeRect: function (shape, x1, y1, x2, y2) {
			Avoid.C.moveShapeRect(this._handle, shape._handle, x1, y1, x2, y2);
		},

		processTransaction: function () {
			Avoid.C.processTransaction(this._handle);
		},

		deleteConnection: function (connection) {
			Avoid.C.disconnect(this._handle, connection._handle);
		},

		setShapeBuffer: function (value) {
			Avoid.C.setShapeBuffer(this._handle, value);
		}
	};

	Avoid.Shape = function (router, x1, y1, x2, y2) {
		this._handle = Avoid.C.createShape(router._handle, x1, y1, x2, y2);
	};

	Avoid.Shape.prototype = {
	};

	Avoid.Connection = function () { };
	Avoid.Connection.connectPoints = function (router, x1, y1, x2, y2, startDir, endDir) {
		startDir = startDir || Avoid.ConnDir.ALL;
		endDir = endDir || Avoid.ConnDir.ALL;


		var connection = new Avoid.Connection();
		connection._handle = Avoid.C.connectLine(router._handle, x1, y1, x2, y2, startDir, endDir);
		return connection;
	};

	Avoid.Connection.connectShapes = function (router, shapeFrom, shapeTo, classIdFrom, classIdTo) {
		var connection = new Avoid.Connection();
		connection._handle = Avoid.C.connectShapes(router._handle, shapeFrom._handle, shapeTo._handle, classIdFrom, classIdTo);
		return connection;
	};

	const BUFFER_SIZE = 8 * 2 * 1000;

	Avoid.Connection.prototype = {
		displayRoute: function () {


			if (!Avoid.Connection._routesBuffer) {
				// Buffer for connection points retrieval. Lets pretend that 1000 of double (x, y)
				// pairs is enough.
				Avoid.Connection._routesBuffer = _malloc(BUFFER_SIZE);
			}



			var elems = Avoid.C.displayRoute(this._handle, Avoid.Connection._routesBuffer, BUFFER_SIZE);
			var segments = [];
			for (var i = 0; i < elems; i += 2) {
				var x = getValue(Avoid.Connection._routesBuffer + i * 8, 'double');
				var y = getValue(Avoid.Connection._routesBuffer + (i + 1) * 8, 'double');
				segments.push([x, y]);
			}
			return segments;
		},
	};

	Avoid.ShapeConnectionPin = function (shape, classId, xOffset, yOffset) {
		this._handle = Avoid.C.createShapeConnectionPin(shape._handle, classId, xOffset, yOffset);
	};

	global.Avoid = Avoid;

}(this));

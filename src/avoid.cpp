#include "libavoid/libavoid.h"

extern "C" {

using namespace Avoid;

void *createRouter()
{
	Router *router = new Router(OrthogonalRouting);
	return static_cast<void *>(router);
}

void setShapeBuffer(void *router, double value)
{
	static_cast<Router *>(router)->setRoutingParameter(RoutingParameter::shapeBufferDistance, value);
}

void *createShape(void *router, double x1, double y1, double x2, double y2)
{
	Rectangle rectangle(Point(x1, y1), Point(x2, y2));
	ShapeRef *shapeRef = new ShapeRef(static_cast<Router *>(router), rectangle);
	return static_cast<void *>(shapeRef);
}

void moveShape(void *router, void *shapeRef, double x, double y)
{
	static_cast<Router *>(router)->moveShape(static_cast<ShapeRef *>(shapeRef), x, y);
}

void moveShapeRect(void *router, void *shapeRef, double x1, double y1, double x2, double y2)
{
	Rectangle rectangle(Point(x1, y1), Point(x2, y2));
	static_cast<Router *>(router)->moveShape(static_cast<ShapeRef *>(shapeRef), rectangle);
}

void processTransaction(void *router)
{
	static_cast<Router *>(router)->processTransaction();
}

void *connectLine(void *router, double x1, double y1, double x2, double y2, int startDir = ConnDirFlag::ConnDirAll, int endDir = ConnDirFlag::ConnDirAll)
{
	ConnEnd srcPt(Point(x1, y1), startDir);
	ConnEnd dstPt(Point(x2, y2), endDir);
	ConnRef *connRef = new ConnRef(static_cast<Router *>(router), srcPt, dstPt);
	return static_cast<void *>(connRef);
}

void *connectShapes(void *router, void *shapeRef1, void *shapeRef2, int classId1, int classId2)
{
	ConnEnd srcPt(static_cast<ShapeRef *>(shapeRef1), classId1);
	ConnEnd dstPt(static_cast<ShapeRef *>(shapeRef2), classId2);
	ConnRef *connRef = new ConnRef(static_cast<Router *>(router), srcPt, dstPt);
	return static_cast<void *>(connRef);
}

void disconnect(void *router, void *connRef)
{
	static_cast<Router *>(router)->deleteConnector(static_cast<ConnRef *>(connRef));
}

size_t displayRoute(void *connRef, void *array, size_t maxpoints)
{

	const PolyLine route = static_cast<ConnRef *>(connRef)->displayRoute();

	double *points = static_cast<double *>(array);
	size_t size = route.size() * 2;

	for (size_t i = 0; i < maxpoints && i < size; i += 2)
	{
		Point point = route.at(i / 2);
		points[i] = point.x;
		points[i + 1] = point.y;
	}

	return maxpoints < size ? maxpoints : size;
}

void *createShapeConnectionPin(void *shapeRef, int classId, double xOffset, double yOffset, bool propotional = 1, double insideOffset = 0, ConnDirFlags visDirs = ConnDirAll)
{
	ShapeConnectionPin *pin = new ShapeConnectionPin(static_cast<ShapeRef *>(shapeRef), classId, xOffset, yOffset, propotional, insideOffset, visDirs);
	return static_cast<void *>(pin);
}
}

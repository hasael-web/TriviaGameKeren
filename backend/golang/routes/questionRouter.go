package routes

import (
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"github.com/labstack/echo/v4"
)

func QuestionRoute(c echo.Context, gatewayServer *runtime.ServeMux) error {
	gatewayServer.ServeHTTP(c.Response(), c.Request())
	return nil
}

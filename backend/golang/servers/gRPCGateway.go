package servers

import (
	"context"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	questionPbGateway "github.com/hasael-web/trivia-game.git/pb/gateway/questionpbgateway"
	"google.golang.org/grpc"
)

func GrpcGatewayServer(conn *grpc.ClientConn, gwmux *runtime.ServeMux) (*runtime.ServeMux, error) {

	registerServiceHandler(conn, gwmux)
	return gwmux, nil
}

func registerServiceHandler(conn *grpc.ClientConn, gwmux *runtime.ServeMux) {
	// questions
	questionPbGateway.RegisterQuestionsGatewayHandler(context.Background(), gwmux, conn)
}

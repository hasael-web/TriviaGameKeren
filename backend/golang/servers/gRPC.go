package servers

import (
	questionPbGrpc "github.com/hasael-web/trivia-game.git/pb/gprc/questionPbgrpc"
	"google.golang.org/grpc"
)

type server struct {
	questionPbGrpc.UnimplementedQuestionGrpcServer
}

func GrpcServers(grpcServer *grpc.Server) {
	questionPbGrpc.RegisterQuestionGrpcServer(grpcServer, &server{})
}

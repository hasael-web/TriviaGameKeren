package server

import (
	"context"
	"log"
	"net"
	"net/http"

	pb "grpc-and-gateway/pb"

	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func Server() {
	lis, err := net.Listen("tcp", ":50052")
	if err != nil {
		log.Fatal(err)
	}

	s := grpc.NewServer()

	questionServer := &QuestionServer{}
	usersServer := &UsersServer{}
	avatarServer := &AvatarServer{}

	pb.RegisterQuestionsGrpcServer(s, questionServer)
	pb.RegisterUsersServiceServer(s, usersServer)
	pb.RegisterAvatarServiceServer(s, avatarServer)
	log.Printf("server listening at %v", lis.Addr())

	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to server: %v", err.Error())
	}

}

type ServerRunGateway struct {
	pb.UnimplementedQuestionsGrpcServer
}

func GatewayServer() {
	endpoint := "localhost:50052"
	mux := runtime.NewServeMux()
	opts := []grpc.DialOption{grpc.WithTransportCredentials(insecure.NewCredentials())}
	ctx := context.Background()
	err := pb.RegisterQuestionsGrpcHandlerFromEndpoint(ctx, mux, endpoint, opts)
	if err != nil {
		// Handle error
		panic(err)
	}

	if err = pb.RegisterUsersServiceHandlerFromEndpoint(ctx, mux, endpoint, opts); err != nil {
		panic(err)
	}

	if err = pb.RegisterAvatarServiceHandlerFromEndpoint(ctx, mux, endpoint, opts); err != nil {
		panic(err)
	}

	// Mulai server HTTP/gRPC gateway
	err = http.ListenAndServe(":50051", mux)
	if err != nil {
		// Handle error
		panic(err)
	}
}

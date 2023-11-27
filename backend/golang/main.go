package main

import (
	"context"
	"log"
	"net"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"github.com/hasael-web/trivia-game.git/servers"
	"github.com/labstack/echo/v4"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

const (
	port = ":50051"
)

func main() {

	// grpc listen
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalln("Failed to listen:", err)
	}

	// Create a gRPC server object
	s := grpc.NewServer()
	servers.GrpcServers(s)

	// Server gRPC
	log.Println("Serving gRPC on 0.0.0.0" + port)
	go func() {
		log.Fatalln(s.Serve(lis))
	}()

	// server gRPC-gateway

	conn, err := grpc.DialContext(
		context.Background(),
		"0.0.0.0:8080",
		grpc.WithBlock(),
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	)

	if err != nil {
		log.Fatalln("Failed to dial server:", err)
	}
	gwmux := runtime.NewServeMux()

	gatewayServer, err := servers.GrpcGatewayServer(conn, gwmux)
	if err != nil {
		log.Fatalln("Failed to register gateway:", err)
	}

	// Inisialisasi server Echo
	e := echo.New()

	// Tambahkan middleware dan handler untuk Echo
	e.Any("/v1/*", func(c echo.Context) error {
		gatewayServer.ServeHTTP(c.Response(), c.Request())
		return nil
	})

	// Mulai server Echo
	e.Start(":8081")

}

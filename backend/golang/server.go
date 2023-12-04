package main

import (
	"fmt"
	servcer "grpc-and-gateway/cmd/server"
)

func main() {
	go servcer.GatewayServer()
	servcer.Server()
	fmt.Println("test golang")
}

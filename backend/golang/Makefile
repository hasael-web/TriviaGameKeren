# generate questions: 
# 	protoc --proto_path=proto --go_out=. --go-grpc_out=. --grpc-gateway_out=pb/questiongrpc proto/*.proto 

# generate users:
# 	protoc --proto_path=proto --go_out=. --go-grpc_out=. --grpc-gateway_out=pb/usersgrpc proto/*.proto 

generate:
	protoc -I ./proto \
    --go_out ./pb/ --go_opt paths=source_relative \
    --go-grpc_out ./pb/ --go-grpc_opt paths=source_relative \
    --grpc-gateway_out ./pb/ --grpc-gateway_opt paths=source_relative \
    proto/*.proto


server:
	go run server.go

clean: 
	rm -r pb/*



# pasming
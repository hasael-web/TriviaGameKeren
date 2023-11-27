# hello: callback hello-2
# 	echo "Hello, saya adalah perintah"

# hello-2:
# 	echo "Hello, saya adalah perintah kedua"
# 	echo "Command kedua"

# callback:
# 	echo "kamu memanggil callback"


protos :
	rm -rf pb/ 
	protoc --proto_path=proto --go_out=. \
	--go-grpc_out=. \
	--grpc-gateway_out=. \
	proto/*.proto
// Code generated by protoc-gen-grpc-gateway. DO NOT EDIT.
// source: avatargrpc.proto

/*
Package protogrpc is a reverse proxy.

It translates gRPC into RESTful JSON APIs.
*/
package protogrpc

import (
	"io"
	"net/http"

	"github.com/golang/protobuf/proto"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"github.com/grpc-ecosystem/grpc-gateway/utilities"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/grpclog"
	"google.golang.org/grpc/status"
)

var _ codes.Code
var _ io.Reader
var _ status.Status
var _ = runtime.String
var _ = utilities.NewDoubleArray

func request_AvatarService_GetAvatars_0(ctx context.Context, marshaler runtime.Marshaler, client AvatarServiceClient, req *http.Request, pathParams map[string]string) (proto.Message, runtime.ServerMetadata, error) {
	var protoReq EmptyAvatar
	var metadata runtime.ServerMetadata

	msg, err := client.GetAvatars(ctx, &protoReq, grpc.Header(&metadata.HeaderMD), grpc.Trailer(&metadata.TrailerMD))
	return msg, metadata, err

}

func request_AvatarService_GetOneAvatar_0(ctx context.Context, marshaler runtime.Marshaler, client AvatarServiceClient, req *http.Request, pathParams map[string]string) (proto.Message, runtime.ServerMetadata, error) {
	var protoReq AvatarId
	var metadata runtime.ServerMetadata

	var (
		val string
		ok  bool
		err error
		_   = err
	)

	val, ok = pathParams["id"]
	if !ok {
		return nil, metadata, status.Errorf(codes.InvalidArgument, "missing parameter %s", "id")
	}

	protoReq.Id, err = runtime.Int32(val)

	if err != nil {
		return nil, metadata, status.Errorf(codes.InvalidArgument, "type mismatch, parameter: %s, error: %v", "id", err)
	}

	msg, err := client.GetOneAvatar(ctx, &protoReq, grpc.Header(&metadata.HeaderMD), grpc.Trailer(&metadata.TrailerMD))
	return msg, metadata, err

}

// RegisterAvatarServiceHandlerFromEndpoint is same as RegisterAvatarServiceHandler but
// automatically dials to "endpoint" and closes the connection when "ctx" gets done.
func RegisterAvatarServiceHandlerFromEndpoint(ctx context.Context, mux *runtime.ServeMux, endpoint string, opts []grpc.DialOption) (err error) {
	conn, err := grpc.Dial(endpoint, opts...)
	if err != nil {
		return err
	}
	defer func() {
		if err != nil {
			if cerr := conn.Close(); cerr != nil {
				grpclog.Infof("Failed to close conn to %s: %v", endpoint, cerr)
			}
			return
		}
		go func() {
			<-ctx.Done()
			if cerr := conn.Close(); cerr != nil {
				grpclog.Infof("Failed to close conn to %s: %v", endpoint, cerr)
			}
		}()
	}()

	return RegisterAvatarServiceHandler(ctx, mux, conn)
}

// RegisterAvatarServiceHandler registers the http handlers for service AvatarService to "mux".
// The handlers forward requests to the grpc endpoint over "conn".
func RegisterAvatarServiceHandler(ctx context.Context, mux *runtime.ServeMux, conn *grpc.ClientConn) error {
	return RegisterAvatarServiceHandlerClient(ctx, mux, NewAvatarServiceClient(conn))
}

// RegisterAvatarServiceHandlerClient registers the http handlers for service AvatarService
// to "mux". The handlers forward requests to the grpc endpoint over the given implementation of "AvatarServiceClient".
// Note: the gRPC framework executes interceptors within the gRPC handler. If the passed in "AvatarServiceClient"
// doesn't go through the normal gRPC flow (creating a gRPC client etc.) then it will be up to the passed in
// "AvatarServiceClient" to call the correct interceptors.
func RegisterAvatarServiceHandlerClient(ctx context.Context, mux *runtime.ServeMux, client AvatarServiceClient) error {

	mux.Handle("GET", pattern_AvatarService_GetAvatars_0, func(w http.ResponseWriter, req *http.Request, pathParams map[string]string) {
		ctx, cancel := context.WithCancel(req.Context())
		defer cancel()
		inboundMarshaler, outboundMarshaler := runtime.MarshalerForRequest(mux, req)
		rctx, err := runtime.AnnotateContext(ctx, mux, req)
		if err != nil {
			runtime.HTTPError(ctx, mux, outboundMarshaler, w, req, err)
			return
		}
		resp, md, err := request_AvatarService_GetAvatars_0(rctx, inboundMarshaler, client, req, pathParams)
		ctx = runtime.NewServerMetadataContext(ctx, md)
		if err != nil {
			runtime.HTTPError(ctx, mux, outboundMarshaler, w, req, err)
			return
		}

		forward_AvatarService_GetAvatars_0(ctx, mux, outboundMarshaler, w, req, resp, mux.GetForwardResponseOptions()...)

	})

	mux.Handle("GET", pattern_AvatarService_GetOneAvatar_0, func(w http.ResponseWriter, req *http.Request, pathParams map[string]string) {
		ctx, cancel := context.WithCancel(req.Context())
		defer cancel()
		inboundMarshaler, outboundMarshaler := runtime.MarshalerForRequest(mux, req)
		rctx, err := runtime.AnnotateContext(ctx, mux, req)
		if err != nil {
			runtime.HTTPError(ctx, mux, outboundMarshaler, w, req, err)
			return
		}
		resp, md, err := request_AvatarService_GetOneAvatar_0(rctx, inboundMarshaler, client, req, pathParams)
		ctx = runtime.NewServerMetadataContext(ctx, md)
		if err != nil {
			runtime.HTTPError(ctx, mux, outboundMarshaler, w, req, err)
			return
		}

		forward_AvatarService_GetOneAvatar_0(ctx, mux, outboundMarshaler, w, req, resp, mux.GetForwardResponseOptions()...)

	})

	return nil
}

var (
	pattern_AvatarService_GetAvatars_0 = runtime.MustPattern(runtime.NewPattern(1, []int{2, 0, 2, 1}, []string{"api", "avatars"}, ""))

	pattern_AvatarService_GetOneAvatar_0 = runtime.MustPattern(runtime.NewPattern(1, []int{2, 0, 2, 1, 1, 0, 4, 1, 5, 2}, []string{"api", "avatar", "id"}, ""))
)

var (
	forward_AvatarService_GetAvatars_0 = runtime.ForwardResponseMessage

	forward_AvatarService_GetOneAvatar_0 = runtime.ForwardResponseMessage
)
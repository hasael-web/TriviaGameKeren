package server

import (
	"context"
	"encoding/json"
	"fmt"
	avatarPb "grpc-and-gateway/pb"
	"grpc-and-gateway/utils"

	typeAvatar "grpc-and-gateway/utils/type"

	"io/ioutil"
	"log"
	"net/http"
)

type AvatarServer struct {
	avatarPb.UnimplementedAvatarServiceServer
}

func (as *AvatarServer) GetAvatars(ctx context.Context, in *avatarPb.EmptyAvatar) (*avatarPb.AvatarsResponse, error) {

	url := utils.UrlApiValue("API_URL", "/avatar")

	res, err := http.Get(url)

	if err != nil {
		log.Fatalf("cannot get api, Error: %v", err)
	}

	resBody, err := ioutil.ReadAll(res.Body)

	if err != nil {
		log.Fatalf("cannot read body, Error: %v", err)
	}
	var responseUnmarshal typeAvatar.AvatarsResponseT

	if err := json.Unmarshal(resBody, &responseUnmarshal); err != nil {
		log.Fatalf("cannot read body, Error: %v", err)
	}

	var avatarsResponse []*avatarPb.AvatarRequest

	for _, a := range responseUnmarshal.Data {
		avatarsResponse = append(avatarsResponse, &avatarPb.AvatarRequest{
			Id:        a.Id,
			ImageSrc:  a.ImageSrc,
			Price:     a.Price,
			CreatedAt: a.CreatedAt,
			UpdatedAt: a.UpdatedAt,
		})
	}

	result := &avatarPb.AvatarsResponse{
		Code: responseUnmarshal.Code,
		Data: avatarsResponse,
	}

	return result, nil

}

func (as *AvatarServer) GetOneAvatar(ctx context.Context, in *avatarPb.AvatarId) (*avatarPb.AvatarResponseOne, error) {
	avatarId := in.Id
	avatarEndpoint := fmt.Sprintf("/avatar/%d", avatarId)

	url := utils.UrlApiValue("API_URL", avatarEndpoint)

	res, err := http.Get(url)

	if err != nil {
		log.Fatalf("cannot get api, Error: %v", err)
	}

	resBody, err := ioutil.ReadAll(res.Body)

	if err != nil {
		log.Fatalf("cannot get api, Error: %v", err)
	}

	var resUnmarshal typeAvatar.OneAvatarResponse

	if err := json.Unmarshal(resBody, &resUnmarshal); err != nil {
		log.Fatalf("cannot get api, Error: %v", err)

	}

	result := &avatarPb.AvatarResponseOne{
		Code: resUnmarshal.Code,
		Data: &avatarPb.AvatarRequest{
			Id:        resUnmarshal.Data.Id,
			ImageSrc:  resUnmarshal.Data.ImageSrc,
			Price:     resUnmarshal.Data.Price,
			CreatedAt: resUnmarshal.Data.CreatedAt,
			UpdatedAt: resUnmarshal.Data.UpdatedAt,
		},
	}
	return result, nil
}

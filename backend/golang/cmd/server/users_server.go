package server

import (
	"context"
	"encoding/json"
	"fmt"
	usersPb "grpc-and-gateway/pb"
	"grpc-and-gateway/utils"
	usertype "grpc-and-gateway/utils/type"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

type UsersServer struct {
	usersPb.UnimplementedUsersServiceServer
}

func (us *UsersServer) GetUsers(ctx context.Context, in *usersPb.EmptyRequest) (*usersPb.ResponseUsers, error) {

	userApi := utils.UrlApiValue("API_URL", "/user")

	res, err := http.Get(userApi)
	if err != nil {
		log.Fatalf("cannot get api %v", err.Error())
		os.Exit(1)
	}
	resBody, err := ioutil.ReadAll(res.Body)
	if err != nil {
		log.Fatalf("Error : %v", err.Error())
		os.Exit(1)
	}

	// fmt.Println(string(resBody))

	var data usertype.UsersResponseT

	if err := json.Unmarshal(resBody, &data); err != nil {
		log.Fatalf("cannot unmarshal data%v", err.Error())
	}

	// fmt.Println(data)

	var usersResponse []*usersPb.RequestUser

	for _, u := range data.Data {
		usersResponse = append(usersResponse, &usersPb.RequestUser{
			Id:            int32(u.Id),
			Name:          u.Name,
			Email:         u.Email,
			Username:      u.Username,
			Password:      u.Password,
			Diamonds:      u.Diamonds,
			TotalPoints:   u.TotalPoints,
			CurrentAvatar: u.CurrentAvatar,
			RememberToken: u.RememeberToken,
			EmailVerifiedAt: u.EmailVerifiedAt,
			CreatedAt:     u.CreatedAt,
			UpdatedAt:     u.UpdatedAt,
		})
	}

	result := &usersPb.ResponseUsers{
		Code: data.Code,
		Data: usersResponse,
	}

	return result, nil
}

func (us *UsersServer) GetOneUsers(ctx context.Context, in *usersPb.IdUsers) (*usersPb.ResponseOneUser, error) {
	userId := in.Id

	userEndpoint := fmt.Sprintf("/user/%d", userId)
	url := utils.UrlApiValue("API_URL", userEndpoint)
	res, err := http.Get(url)

	if err != nil {
		log.Fatalf("api error : %v", err.Error())
	}

	resBody, err := ioutil.ReadAll(res.Body)

	if err != nil {
		log.Fatalf("error res.body :%v", err.Error())
	}

	var data usertype.UserResponseT

	if err := json.Unmarshal(resBody, &data); err != nil {
		log.Printf("error Unmarshal data : %v", err.Error())
	}

	result := &usersPb.ResponseOneUser{
		Code: data.Code,
		Data: &usersPb.RequestUser{
			Id:            int32(data.Data.Id),
			Name:          data.Data.Name,
			Email:         data.Data.Email,
			Username:      data.Data.Username,
			Password:      data.Data.Password,
			Diamonds:      data.Data.Diamonds,
			TotalPoints:   data.Data.TotalPoints,
			CurrentAvatar: data.Data.CurrentAvatar,
			RememberToken: data.Data.RememeberToken,
			EmailVerifiedAt: data.Data.EmailVerifiedAt,
			CreatedAt:     data.Data.CreatedAt,
			UpdatedAt:     data.Data.UpdatedAt,
		},
	}
	return result, nil
}

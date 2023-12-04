package utils

type AvatarsResponseT struct {
	Code int32           `json:"code"`
	Data []AvatarRequest `json:"data"`
}

type AvatarRequest struct {
	Id        int32  `json:"id"`
	ImageSrc  string `json:"image_src"`
	Price     int64  `json:"price"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

type OneAvatarResponse struct {
	Code int32         `json:"code"`
	Data AvatarRequest `json:"data"`
}

// "id": 1,
// "image_src":
// "https://res.cloudinary.com/dxirtmo5t/image/upload/v1700031126/Trivia/Avatar/2023-11-15_065204_tampandanberani.jpg",
// "price": 50,
// "created_at": "2023-11-14T08:21:54.000000Z",
// "updated_at": "2023-11-21T08:24:15.000000Z"

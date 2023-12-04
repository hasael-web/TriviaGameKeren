package utils

type UsersResponseT struct {
	Code int32  `json:"code"`
	Data []User `json:"data"`
}

type UserResponseT struct {
	Code int32 `json:"code"`
	Data User  `json:"data"`
}

type User struct {
	Id              int32  `json:"id"`
	Name            string `json:"name"`
	Email           string `json:"email"`
	Username        string `json:"username"`
	Password        string `json:"password"`
	Diamonds        int64  `json:"diamonds"`
	TotalPoints     int64  `json:"total_points"`
	EmailVerifiedAt string `json:"email_verified_at"`
	RememeberToken  string `json:"remember_token"`
	CreatedAt       string `json:"created_at"`
	UpdatedAt       string `json:"updated_at"`
	CurrentAvatar   int32  `json:"current_avatar"`
}

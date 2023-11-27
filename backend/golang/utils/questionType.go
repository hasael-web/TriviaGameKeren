package utils

type QuestionsResponseT struct {
	Code int32 `json:"code"`
	Data []struct {
		Id             int32  `json:"id"`
		Question       string `json:"question"`
		Answer         string `json:"answer"`
		Wrong_answer_1 string `json:"wrong_answer_1"`
		Wrong_answer_2 string `json:"wrong_answer_2"`
		Wrong_answer_3 string `json:"wrong_answer_3"`
		Created_at     string `json:"created_at"`
		Updated_at     string `json:"updated_at"`
	} `json:"data"`
}

// int32 id = 1;
// string question = 2;
// string answer = 3;
// string wrong_answer_1 =4;
// string wrong_answer_2 =5;
// string wrong_answer_3 =6;
// string created_at =7;
// string updated_at =8;

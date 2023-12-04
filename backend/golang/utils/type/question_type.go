package utils

type QuestionType struct {
	Code int32             `json:"code"`
	Data []QuestionRequest `json:"data"`
}

type QuestionRequest struct {
	Id           int32  `json:"id"`
	Question     string `json:"question"`
	Answer       string `json:"answer"`
	WrongAnswer1 string `json:"wrong_answer_1"`
	WrongAnswer2 string `json:"wrong_answer_2"`
	WrongAnswer3 string `json:"wrong_answer_3"`
	CreatedAt    string `json:"created_at"`
	UpdatedAt    string `json:"updated_at"`
}

type GetOneQuestionT struct {
	Code int32           `json:"code"`
	Data QuestionRequest `json:"data"`
}

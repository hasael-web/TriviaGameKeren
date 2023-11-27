package services

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/hasael-web/trivia-game.git/utils"

	questionPbGrpc "github.com/hasael-web/trivia-game.git/pb/gprc/questionPbgrpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type QuestionService struct {
	questionPbGrpc.UnimplementedQuestionGrpcServer
}

func (pb *QuestionService) GetQuestions(ctx context.Context, req *questionPbGrpc.Empty) (*questionPbGrpc.QuestionResponse, error) {
	questionsApi := "http://127.0.0.1:8000/api/questions"
	resp, err := http.Get(questionsApi)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, status.Error(codes.Internal, "Failed to fetch data from API question")
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	var response *utils.QuestionsResponseT

	if err := json.Unmarshal(body, &response); err != nil {
		return nil, status.Error(codes.Internal, "failed to unmarshal code")
	}

	grpcResponse := &questionPbGrpc.QuestionResponse{}

	for _, q := range response.Data {
		grpcQuestion := &questionPbGrpc.QuestionRequest{
			Id:            q.Id,
			Question:      q.Question,
			Answer:        q.Answer,
			WrongAnswer_1: q.Wrong_answer_1,
			WrongAnswer_2: q.Wrong_answer_2,
			WrongAnswer_3: q.Wrong_answer_3,
			CreatedAt:     q.Created_at,
			UpdatedAt:     q.Updated_at,
		}

		grpcResponse.Data = append(grpcResponse.Data, grpcQuestion)
	}

	result := &questionPbGrpc.QuestionResponse{
		Code: response.Code,
		Data: grpcResponse.Data,
	}

	return result, nil
}

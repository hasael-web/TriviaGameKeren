package utils

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

func GoGetEnv(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal(err)
	}

	return os.Getenv(key)
}

func UrlApiValue(key string, valueApi string) string {
	urlValue := GoGetEnv(key)

	resultUrl := urlValue + valueApi

	fmt.Println(resultUrl)

	return resultUrl
}

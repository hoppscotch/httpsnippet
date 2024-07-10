package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "http://mockbin.com/har?foo[bar]=baz,zap&fiz=buz&key=value"

	req, _ := http.NewRequest("GET", url, nil)

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
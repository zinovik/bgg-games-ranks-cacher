package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"os/exec"
)

const (
	BGGGamesRanksURL  = "https://bgg-games-ranks.vercel.app/api/get-games?amount=2000"
	BGGGamesRanksFile = "./bgg-games-ranks.json"
)

func request(url string) (map[string]interface{}, error) {
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var result map[string]interface{}
	if err := json.Unmarshal(body, &result); err != nil {
		return nil, err
	}

	return result, nil
}

func main() {
	bggGamesRanks, err := request(BGGGamesRanksURL)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("Writing file...")
	bggGamesRanksJSON, err := json.MarshalIndent(bggGamesRanks, "", "  ")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	if err := ioutil.WriteFile(BGGGamesRanksFile, bggGamesRanksJSON, 0644); err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("Formatting file...")
	cmd := exec.Command("npx", "prettier", BGGGamesRanksFile, "--write")
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	if err := cmd.Run(); err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("Done!")
}

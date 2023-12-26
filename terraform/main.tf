provider "google" {
    project = "zinovik-project"
    region  = "us-central1"
}

resource "google_service_account" "github-actions" {
    account_id = "github-actions"
}

resource "google_storage_bucket" "static" {
    name          = "boardgamegeek"
    location      = "us-central1"

    cors {
        origin          = ["https://zinovik.github.io", "http://localhost:3000"]
        method          = ["GET"]
        response_header = ["Content-Type"]
        max_age_seconds = 3600
    }

    versioning {
        enabled = true
    }
}

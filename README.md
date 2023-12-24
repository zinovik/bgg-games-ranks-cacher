# bgg-games-ranks-cacher

bucket setup:

```bash
gcloud storage buckets create gs://boardgamegeek --location=us-central1
gcloud storage buckets update gs://boardgamegeek --cors-file=cors_file.json
gcloud storage buckets describe gs://boardgamegeek --format="default(cors_config)"
gcloud scheduler jobs create http bgg-games-ranks-cacher --location=us-central1 --schedule="0 4 * * *" --uri=https://us-central1-zinovik-project.cloudfunctions.net/bgg-games-ranks-cacher --oidc-service-account-email=zinovik-project@appspot.gserviceaccount.com
```

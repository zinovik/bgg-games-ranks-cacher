# bgg-games-ranks-cacher

## google cloud setup

### create bucket, setup cors, check the bucket's cors:

```bash
gcloud storage buckets create gs://boardgamegeek --location=europe-central2
gcloud storage buckets update gs://boardgamegeek --cors-file=cors_file.json
gcloud storage buckets describe gs://boardgamegeek --format="default(cors_config)"
gcloud storage buckets update gs://boardgamegeek --versioning
```

### create scheduler

```bash
gcloud scheduler jobs create http bgg-games-ranks-cacher --location=europe-central2 --schedule="0 0 1 * *" --uri="https://europe-central2-zinovik-project.cloudfunctions.net/bgg-games-ranks-cacher" --oidc-service-account-email=bgg-games-ranks-cacher@zinovik-project.iam.gserviceaccount.com --http-method=get
```

### create service account

```bash
gcloud iam service-accounts create github-actions
gcloud iam service-accounts create bgg-games-ranks-cacher
```

### add roles (`Service Account User` and `Cloud Functions Admin`) to the service account you want to use to deploy the function

```
gcloud projects add-iam-policy-binding zinovik-project --member="serviceAccount:github-actions@zinovik-project.iam.gserviceaccount.com" --role="roles/cloudfunctions.admin"

gcloud projects add-iam-policy-binding zinovik-project --member="serviceAccount:github-actions@zinovik-project.iam.gserviceaccount.com" --role="roles/iam.serviceAccountUser"
```

### creating keys for service account for github-actions `GOOGLE_CLOUD_SERVICE_ACCOUNT_KEY_FILE`

```bash
gcloud iam service-accounts keys create key-file.json --iam-account=github-actions@appspot.gserviceaccount.com
cat key-file.json | base64
```

### add access to secrets and buckets

```bash
gcloud storage buckets add-iam-policy-binding gs://boardgamegeek --member="serviceAccount:bgg-games-ranks-cacher@zinovik-project.iam.gserviceaccount.com" --role="roles/storage.admin"

gcloud projects add-iam-policy-binding zinovik-project --member="serviceAccount:bgg-games-ranks-cacher@zinovik-project.iam.gserviceaccount.com" --role="roles/run.invoker"

gcloud projects add-iam-policy-binding zinovik-project --member="serviceAccount:bgg-games-ranks-cacher@zinovik-project.iam.gserviceaccount.com" --role="roles/cloudfunctions.invoker"
```

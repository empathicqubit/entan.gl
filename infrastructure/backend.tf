terraform {
  backend "gcs" {
    bucket = "allons-y-alonzo"
    prefix = "allons-me"
  }
}

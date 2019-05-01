terraform {
  backend "gcs" {
    bucket = "heisenberg-is-an-unknown-quantity"
    prefix = "entan-gl"
  }
}

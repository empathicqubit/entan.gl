provider "google" {
  region = var.region
}

data "google_organization" "self" {
  domain = var.dns_name
}

data "google_billing_account" "self" {
  display_name = var.dns_name
  open = true
}

resource "random_id" "project_id" {
  byte_length = 4
  prefix = "${var.project_name}-"

  keepers = {
    region = var.region
    project_name = var.project_name
  }
}

resource "google_project" "project" {
  name = var.project_name
  project_id = random_id.project_id.hex
  org_id = data.google_organization.self.org_id
  billing_account = data.google_billing_account.self.id
}

resource "google_project_service" "firebase" {
  project = google_project.project.id
  service = "firebase.googleapis.com"
}

resource "google_project_service" "dns" {
  project = google_project.project.id
  service = "dns.googleapis.com"
}

resource "google_dns_managed_zone" "entan" {
  project = google_project.project.id
  name = var.project_name
  dns_name = "${var.dns_name}."

  depends_on = [google_project_service.dns]
}

resource "google_dns_record_set" "a" {
  project = google_project.project.id
  name = google_dns_managed_zone.entan.dns_name
  managed_zone = google_dns_managed_zone.entan.id
  type = "A"
  ttl = 3600
  rrdatas = [
    "151.101.1.195",
    "151.101.65.195",
  ]

  depends_on = [google_project_service.dns]
}

resource "google_dns_record_set" "www_a" {
  project = google_project.project.id
  name = "www.${google_dns_managed_zone.entan.dns_name}"
  managed_zone = google_dns_managed_zone.entan.id
  type = "A"
  ttl = 3600
  rrdatas = [
    "151.101.1.195",
    "151.101.65.195",
  ]

  depends_on = [google_project_service.dns]
}

resource "google_dns_record_set" "txt" {
  project = google_project.project.id
  name = google_dns_managed_zone.entan.dns_name
  managed_zone = google_dns_managed_zone.entan.id
  type = "TXT"
  ttl = 3600
  rrdatas = [
    "\"protonmail-verification=49f0d657d599dce9175c77f6803c67b9faf2e5f6\"",
    "\"v=spf1 include:_spf.protonmail.ch mx ~all\"",
    "\"google-site-verification=uFJqOMJi0QRi6kYJ_P3CJ6NiwhA_vXYfrVgHuOmyzjk\"",
  ]

  depends_on = [google_project_service.dns]
}

resource "google_dns_record_set" "txt_acme" {
  project = google_project.project.id
  name = "_acme-challenge.${google_dns_managed_zone.entan.dns_name}"
  managed_zone = google_dns_managed_zone.entan.id
  type = "TXT"
  ttl = 3600
  rrdatas = [
    "\"3LffUPXXwdsEARLt2l9fwZyqHgGJ5N7EXPiaZJpuvQQ\""
  ]

  depends_on = [google_project_service.dns]
}

resource "google_dns_record_set" "www_txt_acme" {
  project = google_project.project.id
  name = "_acme-challenge.www.${google_dns_managed_zone.entan.dns_name}"
  managed_zone = google_dns_managed_zone.entan.id
  type = "TXT"
  ttl = 3600
  rrdatas = [
    "\"sy0wZQ9y89wxf3v1Fxs5aprOzQ33xTF5UcJnGtuyy6I\""
  ]

  depends_on = [google_project_service.dns]
}

resource "google_dns_record_set" "protonmail_domainkey1" {
  project = google_project.project.id
  name = "protonmail._domainkey.${google_dns_managed_zone.entan.dns_name}"
  managed_zone = google_dns_managed_zone.entan.id
  type = "CNAME"
  ttl = 3600
  rrdatas = ["protonmail.domainkey.dao2ss6o57vvef6sdgmtww2uwym4wub3nndbqpqmasevtvbjix3aa.domains.proton.ch."]

  depends_on = [google_project_service.dns]
}

resource "google_dns_record_set" "protonmail_domainkey2" {
  project = google_project.project.id
  name = "protonmail._domainkey2.${google_dns_managed_zone.entan.dns_name}"
  managed_zone = google_dns_managed_zone.entan.id
  type = "CNAME"
  ttl = 3600
  rrdatas = ["protonmail2.domainkey.dao2ss6o57vvef6sdgmtww2uwym4wub3nndbqpqmasevtvbjix3aa.domains.proton.ch."]

  depends_on = [google_project_service.dns]
}

resource "google_dns_record_set" "protonmail_domainkey3" {
  project = google_project.project.id
  name = "protonmail._domainkey3.${google_dns_managed_zone.entan.dns_name}"
  managed_zone = google_dns_managed_zone.entan.id
  type = "CNAME"
  ttl = 3600
  rrdatas = ["protonmail3.domainkey.dao2ss6o57vvef6sdgmtww2uwym4wub3nndbqpqmasevtvbjix3aa.domains.proton.ch."]

  depends_on = [google_project_service.dns]
}

resource "google_dns_record_set" "protonmail_mx" {
  project = google_project.project.id
  name = google_dns_managed_zone.entan.dns_name
  managed_zone = google_dns_managed_zone.entan.id
  type = "MX"
  ttl = 3600
  rrdatas = [
    "10 mail.protonmail.ch.",
  ]

  depends_on = [google_project_service.dns]
}

resource "google_storage_bucket" "static" {
  project = google_project.project.id
  name = "${random_id.project_id.hex}-static"
  force_destroy = true

  cors {
    origin = ["https://www.${var.dns_name}", "https://${var.dns_name}" ]
    method = ["GET", "HEAD", "OPTIONS"]
  }

  location = var.region
  storage_class = "REGIONAL"

  website {
    main_page_suffix = "index.html"
    not_found_page = "index.html"
  }
}

resource "google_storage_bucket_acl" "static_acl" {
  bucket = google_storage_bucket.static.id
  predefined_acl = "publicRead"
  default_acl = "publicRead"
}

output "entan_gl_nameservers" {
  value = google_dns_managed_zone.entan.name_servers
}

output "project_id" {
  value = google_project.project.id
}

output "static_bucket_path" {
  value = "https://storage.googleapis.com/${google_storage_bucket.static.id}/"
}

output "static_bucket_gs" {
  value = "${google_storage_bucket.static.url}/"
}

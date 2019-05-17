resource "google_dns_managed_zone" "allons" {
  project = "${google_project.project.id}"
  name = "allons-me"
  dns_name = "allons.me."

  depends_on = ["google_project_services.services"]
}

resource "google_dns_record_set" "allons_a" {
  project = "${google_project.project.id}"
  name = "${google_dns_managed_zone.allons.dns_name}"
  managed_zone = "${google_dns_managed_zone.allons.id}"
  type = "A"
  ttl = 3600
  rrdatas = [
    "151.101.1.195",
    "151.101.65.195",
  ]

  depends_on = ["google_project_services.services"]
}

resource "google_dns_record_set" "allons_www_a" {
  project = "${google_project.project.id}"
  name = "www.${google_dns_managed_zone.allons.dns_name}"
  managed_zone = "${google_dns_managed_zone.allons.id}"
  type = "A"
  ttl = 3600
  rrdatas = [
    "151.101.1.195",
    "151.101.65.195",
  ]

  depends_on = ["google_project_services.services"]
}

resource "google_dns_record_set" "allons_txt" {
  project = "${google_project.project.id}"
  name = "${google_dns_managed_zone.allons.dns_name}"
  managed_zone = "${google_dns_managed_zone.allons.id}"
  type = "TXT"
  ttl = 3600
  rrdatas = [
    "\"protonmail-verification=1d03de4983212df89a559a5c8664dfcb072b058a\"",
    "\"v=spf1 include:_spf.protonmail.ch mx ~all\"",
    "\"google-site-verification=3RsL8VG2-1WMGQ2HTvYrdHQt-3wty2WZCHyh5sSF9oQ\"",
  ]

  depends_on = ["google_project_services.services"]
}

resource "google_dns_record_set" "allons_txt_acme" {
  project = "${google_project.project.id}"
  name = "_acme-challenge.${google_dns_managed_zone.allons.dns_name}"
  managed_zone = "${google_dns_managed_zone.allons.id}"
  type = "TXT"
  ttl = 3600
  rrdatas = [
    "\"KKQe3w-pc-3Hn9fyTeqwhtF_Y8zAgRUx--r6_lWlZyk\""
  ]

  depends_on = ["google_project_services.services"]
}

resource "google_dns_record_set" "allons_www_txt_acme" {
  project = "${google_project.project.id}"
  name = "_acme-challenge.www.${google_dns_managed_zone.allons.dns_name}"
  managed_zone = "${google_dns_managed_zone.allons.id}"
  type = "TXT"
  ttl = 3600
  rrdatas = [
    "\"-fi694GD4hT0HvDgf2zR5wESHhgpJHQuJxaFFFmvqJg\""
  ]

  depends_on = ["google_project_services.services"]
}

resource "google_dns_record_set" "allons_protonmail_domainkey" {
  project = "${google_project.project.id}"
  name = "protonmail._domainkey.${google_dns_managed_zone.allons.dns_name}"
  managed_zone = "${google_dns_managed_zone.allons.id}"
  type = "TXT"
  ttl = 3600
  rrdatas = [
    "\"v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDO/g8MVlMjls6y3m0bnrzTLTVOpi38URkyrXbPnHAHn/ZhbxR+DfcIvhgdeyw62ldzyMv5+KMPKxsSql1W/o5y8Yo+g5D4o9ctHJn/5yTmYLFz3GGBGrV2JgHMzxqRNYXqZPa3xwhaauhoN7L/FaSTPGiwcG7BH5HQ6UKY6Na3cQIDAQAB\"",
  ]

  depends_on = ["google_project_services.services"]
}

resource "google_dns_record_set" "allons_protonmail_mx" {
  project = "${google_project.project.id}"
  name = "${google_dns_managed_zone.allons.dns_name}"
  managed_zone = "${google_dns_managed_zone.allons.id}"
  type = "MX"
  ttl = 3600
  rrdatas = [
    "10 mail.protonmail.ch.",
  ]

  depends_on = ["google_project_services.services"]
}


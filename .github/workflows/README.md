GitHub Actions deployment expects these repository secrets:

- `FTP_HOST`: Hostname only, such as `ftp.example.com`
- `FTP_USERNAME`: Hostinger FTP username
- `FTP_PASSWORD`: Hostinger FTP password
- `REMOTE_DIR`: Usually `/public_html`

Optional secrets:

- `FTP_PROTOCOL`: `ftp` or `ftps` (defaults to `ftp`)
- `FTP_PORT`: Custom FTP port if Hostinger gives you one

Important:

- Do not put `ftp://` or `https://` in `FTP_HOST`
- Do not put `/public_html` in `FTP_HOST`; use `REMOTE_DIR` for that
- This workflow uploads the generated static site from `.output/public/`

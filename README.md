# thesis

## description
Web app that offers users 3D files. Users can input different measurments, which will then adjust the file to be downloaded. Welcome page > selection of product > for each product measurment inputs > download > assembly instructions

## architecture
### context
- web app can be hosted for free
- database has a usable size > 6gb and is free
- deterministic file names -> measurments: 10 x 20 - fileName: productA/10x20.stl
- immutable files: readme.txt, instructions.txt, immutable_3d_part.stl
- mutable: mutable_3d_part.stl
- .zip files for downlaod

-------

- React + Vite + Tailwind web app
- there is no server
- create zips on client using jszip or fflate
- cloudflare hosting, free 10gb
- if we decide to secure the files, cloudflare offers signed urls, signed urls would have to be generated inside a server comp

### references
- research: https://chatgpt.com/share/693b1bc7-db84-8011-9378-402b30fcb954
- cloudflare 10gb free tier: https://www.cloudflare.com/de-de/developer-platform/products/r2/

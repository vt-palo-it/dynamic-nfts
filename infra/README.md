
### Build image
docker build -t blocktrust-white-label .

### Run image
docker run -d --name blocktrust-white-label -p 80:80 blocktrust-white-label

Go to: 
http://localhost:80

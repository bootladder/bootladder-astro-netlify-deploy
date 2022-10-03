# this runs on the host to start the container
sudo docker run -it --rm -u1000 -w/app/ \
        -v$(pwd):/app/ \
        --network=host  npmbuilder $1



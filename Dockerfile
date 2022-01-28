FROM jenkins/agent:latest
RUN apt update
RUN apt install wget -y
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
---
title: 'Jenkins builds'
description: 'The leading open source automation server, Jenkins provides hundreds of plugins to support building, deploying and automating any project.'
pubDate: '2 Jun 2024'
heroImage: '/blog-placeholder-5.jpg'
---

[Jenkins](https://jenkins.io) describes itself as "The leading open source automation server, Jenkins provides hundreds of plugins to support building, deploying and automating any project.".

It is extremely useful for automatically building and deploying code, and can be used to automate many tasks.

## Project setup
```bash
curl -fsSL https://bun.sh/install | bash
```
<br/>

## Create a new Astro project
```bash
bun create astro@latest
```
<br/>

Follow the prompts and say yes to everything. Use the blog template. Name your project whatever you like and then simply enter the project. (For example `cd my-astro-blog`)

## Uploading to GitHub
Go to [new repository screen](https://github.com/new) and create a new repository. Then run the following commands in your terminal to upload your project to GitHub.

Run the following commands replacing `[YOUR GITHUB USERNAME]` and `[REPO NAME]` with your GitHub username and the name of the repository you just created.
```bash
git remote add origin git@github.com:[YOUR GITHUB USERNAME]/[REPO NAME].git
git add . && git commit -m "Initial commit"
git push -u origin main
```

If you now go to your repository on GitHub you should see all of your project files.

## Setting up Jenkins
Firstly, install [Docker](https://docs.docker.com/engine/install/); then run the following commands to start Jenkins.
```bash
docker volume create jenkins_build
docker run -dit -p 8250:8080 -p 50000:50000 --restart=on-failure -v jenkins_home:/var/jenkins_home -v jenkins_build:/var/jenkins_home/jenkins_build --name jenkins jenkins/jenkins:lts-jdk17
docker exec -it -u jenkins /bin/sh
chown -R jenkins:jenkins /var/jenkins_home/jenkins_build
exit
```

Then go to [http://localhost:8250](http://localhost:8250) in your browser and follow the instructions to set up Jenkins (e.g. creating an admin user and installing the recommended plugins).

## Setting up a new Jenkins job

1. Click on "New Item" in the Jenkins dashboard.
2. Enter a name for your job and select "Freestyle project".
3. Click "OK".
4. Select GitHub project and enter the URL of your GitHub repository.
5. Under "Source Code Management" select "Git" and enter the URL of your GitHub repository along with the branch to build (e.g. `*/main`).
6. Under "Build Triggers" select "GitHub hook trigger for GITScm polling".
7. Under "Build Steps" click "Add build step" and select "Execute shell".
8. Enter the following commands:
```bash
curl -fsSL https://bun.sh/install | bash
~/.bun/bin/bun install
~/.bun/bin/bun run build

rm -rf /var/jenkins_home/jenkins_build/*
cp ./dist/* /var/jenkins_home/jenkins_build/ -rf
```
9. Press "Save" to save your job.
10. Click "Build Now" on the left side to run your job.

Your project should now be built and it should show as successful in Jenkins now the last step is to setup a webhook in GitHub to trigger the build on push.

## Setting up a webhook in GitHub

1. Go to your repository on GitHub.
2. Click on "Settings" in the top right.
3. Click on "Webhooks" in the left sidebar.
4. Click on "Add webhook".
5. Enter the Payload URL as `http://<JENKINS URL>/github-webhook/`. (you will want to port forward this if you are running Jenkins locally)
6. Select "application/json" as the content type.
7. Click "Add webhook".

## Setting up Apache to serve the built files

```bash
docker run -dit --name rustbytes -p 8235:8080 -v jenkins_build:/usr/local/apache2/htdocs/ httpd:2.4
```

Now you can access your built files at [http://localhost:8235](http://localhost:8235) (you can also port forward this if you are running all of this locally).

# Conclusion

You now have a fully automated build and deploy pipeline using Jenkins and Astro. You can now push changes to your repository and Jenkins will automatically build and deploy your project. You can also access the built files using Apache.
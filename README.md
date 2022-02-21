# gorilla-practice

This project runs automated UI and API tests against Gorilla's [Automation Playground](http://3.14.176.40/)

**Tech stack**
- Javascript
- Cypress
- Mocha
- Mochawesome


# Installation
Using your terminal, navigate to your project's folder, then run the following commands
```
git clone https://github.com/josequesadaGL/gorilla-practice.git
npm install
```

# Running
There are several options to run the automated tests:

Cypress local dashboard
```
npm run gui
```

Cypress dashboard - runs browsers in parallel
```
npm run dashboard
```

Run Cypress only on Chrome
```
npm run chrome
```

Run Cypress only on Firefox
```
npm run firefox
```

Run only UI tests
```
npm run e2e
```


Run only API tests
```
npm run api
```


# Reports
After each run, the automation framework will create a series of reporting data:
- A [Mochawesome](https://user-images.githubusercontent.com/68253320/153429202-a9dad4d4-b956-42a8-bdd3-5078dcbbb8ec.png) report
- [Video captures](https://user-images.githubusercontent.com/68253320/153429757-5032abd5-acca-4db7-8753-003176360422.png) of the test runs
- [Screenshots](https://user-images.githubusercontent.com/68253320/153430357-31195fa2-7eb4-42c2-94b0-59fd2eb59a8a.png) are taken when a Test run fails


# Fetch Rewards Backend Coding Exercise

## Table of Contents
1. [About](https://github.com/alex-yambao/fetch_rewards#about)

2. [Project Requirements](https://github.com/alex-yambao/fetch_rewards#project-requirements)

3. [Installation](https://github.com/alex-yambao/fetch_rewards#installation)

4. [Use/Testing](https://github.com/alex-yambao/fetch_rewards#usetesting)

5. [API Endpoints](https://github.com/alex-yambao/fetch_rewards#api-endpoints)

### About
While this was a take home challenge, I was stoked to have the opportunity to create a project up to Fetch Rewards' standards! As a developer fresh out of a coding bootcamp (literally three days ago), I was thrilled to be able to put the skills I've learned to the test - and this was a worthy one. Fetch Rewards requires its Backend interns to build highly performant backend services that are flexible enough to integrate into data stores, message queues, mobile and web platforms, and other systems. After thinking about those standards, I created a web service utilizing Node.JS and several of its packages - most notably Express, Axios, and Jest.

The project meets all of the specified project requirements. Additionally, there is a small test suite that I built to ensure that I met all specifications. 

### Project Requirements
Write a web service that accepts HTTP request and returns responses. 

In our system, each transaction record contains: payer (string), points (integer), timestamp (date).
For earning points it is easy to assign a payer, we know which actions earned the points. And thus which partner should be paying for the points.
When a user spends points, they don't know or care which payer the points come from. But, our accounting team does care how the points are
spent. 

There are two rules for determining what points to "spend" first:
*  We want the oldest points to be spent first (oldest based on transaction timestamp, not the order they’re received)
*  We want no payer's points to go negative.

Provide routes that:
* Add transactions for a specific payer and date.
* Spend points using the rules above and return a list of { "payer": <string>, "points": <integer> } for each call.
* Return all payer point balances.

Suppose you call your add transaction route with the following sequence of calls:
- { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" }
- { "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" }
- { "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" }
- { "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z" }
- { "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" }

Then you call your spend points route with the following request:
- { "points": 5000 }


The expected response from the spend call would be:

- [{ "payer": "DANNON", "points": -100 },{ "payer": "UNILEVER", "points": -200 },{ "payer": "MILLER COORS", "points": -4,700 }]

A subsequent call to the points balance route, after the spend, should returns the following results:

{"DANNON": 1000,"UNILEVER": 0,"MILLER COORS": 5300}


### Installation
**Required prior to use**

Runtime: [Node.js](https://nodejs.org/en/download/) 

[Github Cloning Docs](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

- Git clone https://github.com/alex-yambao/fetch_rewards.git

Install node packages

- npm -i

Start server

- npm run start 

Run jest API test suite 
- npm run test
![Alt text](https://github.com/alex-yambao/fetch_rewards/blob/master/assets/TESTS.png?raw=true "Test suites") 

Default host: 
- [localhost:3000](localhost:3000)

### Use/Testing 
To interact with the API for testing purposes you must have an API testing service such as cURL or Postman to hit API endpoints. 
[Heroku](https://fetchrewards-ay.herokuapp.com/api) link: https://fetchrewards-ay.herokuapp.com/api/
 
Check [Health](https://fetchrewards-ay.herokuapp.com/api/health)

 ![Alt text](https://github.com/alex-yambao/fetch_rewards/blob/master/assets/HEALTH.png?raw=true "Health Displayed in Browser")
 
  Postman
  
  -[Installation Docs](https://learning.postman.com/docs/getting-started/installation-and-updates/)
  
  -[Request Formatting Docs](https://learning.postman.com/docs/sending-requests/requests/)
  
  Curl
  
  -[Installation Docs](https://help.ubidots.com/en/articles/2165289-learn-how-to-install-run-curl-on-windows-macosx-linux)
  
  -[Request Formatting Doc](https://docs.oracle.com/en/cloud/saas/marketing/eloqua-develop/Developers/GettingStarted/APIRequests/curl-formats.htm)

### API ENDPOINTS
 
 **Headers**
 ![Alt text](https://github.com/alex-yambao/fetch_rewards/blob/master/assets/HEADERS.png?raw=true "Header Settings in Postman (Default)") 
 
  ***Body Requests must be formatted as JSON Data***  
  
- **POST rewards/add**
 
  ![Alt text](https://github.com/alex-yambao/fetch_rewards/blob/master/assets/POST.png?raw=true "Post/add request in Postman") 
  
  
- **PATCH rewards/spend**
 
  ![Alt text](https://github.com/alex-yambao/fetch_rewards/blob/master/assets/PATCH.png?raw=true "Patch/spend request in Postman)") 

  
- **GET rewards/balance**
 
  ![Alt text](https://github.com/alex-yambao/fetch_rewards/blob/master/assets/GET.png?raw=true "Get/balance request in Postman") 
 
  ![Alt text](https://github.com/alex-yambao/fetch_rewards/blob/master/assets/BALANCE.png?raw=true "Balance route displayed in Browser view") 
 

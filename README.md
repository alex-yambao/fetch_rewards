# Fetch Rewards Backend Coding Exercise

## Table of Contents

1. [Project Requirements](https://github.com/alex-yambao/fetch_rewards#project-requirements)

2. [Installation](https://github.com/alex-yambao/fetch_rewards#installation)

3. [Testing / Usage](https://github.com/alex-yambao/fetch_rewards#testing-/-usage)


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

Runtime: Node.js https://nodejs.org/en/download/ 

Github Cloning Docs: https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository

- Git clone https://github.com/alex-yambao/fetch_rewards.git

Install node packages

- npm -i

Start server

- npm run start 

Run jest API test suite 
- npm run test



### Use/Testing 
To interact with the API for testing purposes you must have an API testing service such as curl or Postman.  
Heroku link: https://fetchrewards-ay.herokuapp.com/api/health

1) Postman


2) Curl



### 



###

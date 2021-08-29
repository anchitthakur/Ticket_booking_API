
# Contents
 1. [Installation](#installation)
 2. [API Documentation](#api)
 3. [Automatic deletion of tickets(Explaination)](#del)
 4. [Screenshots](#screenshots)

---
---
<a name="installation"></a>
# Installation

****Note: Screenshots are present in /Screenshots folder and Postman file is present in /Postman folder** 

### Requirements
 1. [Nodejs](https://nodejs.org/en/) is required.
 2. A running [MongoDB](https://www.mongodb.com/) instance is required.
 3. [Npm](https://www.npmjs.com/)/[yarn](https://yarnpkg.com/) package manager is required.
 4. A **.env** should be present in the root directory to run the sever.

### Example .env file
```dotenv
MONGOOSE_URI=mongodb://localhost:27017/ticket 
PORT=9000
```


### Using yarn
```shell script
yarn
yarn run start
```

### Using npm
```shell script
npm install
npm run start
```

---
---

<a name="api"></a>  
# Ticket API documentation v1.0.0  
  
Ticket booking API  
  
 - [Ticket](#Ticket)  
   - [Change the timings of an existing ticket](#Change-the-timings-of-an-existing-ticket)  
   - [Create a new ticket](#Create-a-new-ticket)  
   - [Delete a ticket by it&#39;s _id](#Delete-a-ticket-by-it&#39;s-_id)  
   - [Fetch all tickets for a particular timing](#Fetch-all-tickets-for-a-particular-timing)  
 - [User](#User)  
   - [Fetch User by ticket ID](#Fetch-User-by-ticket-ID)  
  
___  
  
  
# <a name='Ticket'></a> Ticket  
  
## <a name='Change-the-timings-of-an-existing-ticket'></a> Change the timings of an existing ticket  
[Back to top](#api)  
  
```  
PATCH /ticket  
```  
  
### Parameters - `Parameter`  
  
| Name     | Type       | Description                           |  
|----------|------------|---------------------------------------|  
| ticketId | `String` | <p>_id of the ticket to be changed</p> |  
| timings | `Date` | <p>new timings requested</p> |  
  
### Examples  
Example usage:  
  
```json  
endpoint: http://localhost:9000/ticket  
body: {  
 "timings": "2020-11-17T16:30:28.000Z", "ticketId": "4d5c719fc95147c7213fa720"
}  
```  
  
### Success response  
  
#### Success response - `Success 200`  
  
| Name     | Type       | Description                           |  
|----------|------------|---------------------------------------|  
| timings | `Date` | <p>Time for the ticket</p> |  
| _id | `String` | <p>MongoDB generate _id</p> |  
| user | `String` | <p>_id of the user who booked the ticket</p> |  
| createdAt | `Date` | <p>Timestamp of the creation of the ticket</p> |  
  
### Success response example  
  
#### Success response example - `Success`  
  
```json  
HTTP/1.1 200 OK  
{  
"message": "Success",  
"ticket": {  
  "_id": "5f4b71c7ec53302d826a6dc6",  
  "timings": "2020-11-17T16:30:28.000Z",  
  "user": "5f4b71c7c152df3a1aaea1d0", 
  "createdAt": "2020-08-30T09:30:47.807Z"  
 }
}
```  
  
### Error response example  
  
#### Error response example - `Error Types`  
  
```json  
HTTP/1.1 500 {"message": "Something went wrong"}  
HTTP/1.1 422 {"message": "Invalid input"}  
HTTP/1.1 412 {"message": "Max ticket count exceeded"}  
```  
  
## <a name='Create-a-new-ticket'></a> Create a new ticket  
[Back to top](#api)  
  
```  
POST /ticket  
```  
  
### Parameters - `Parameter`  
  
| Name     | Type       | Description                           |  
|----------|------------|---------------------------------------|  
| timings | `Date` | <p>Time for the ticket to be booked</p> |  
| fullName | `String` | <p>Name of the user</p> |  
| phone | `String` | <p>Phone number of the user</p> |  
  
### Examples  
Example usage:  
  
```json  
endpoint: http://localhost:9000/ticket  
body: {  
 "timings": "2020-11-17T16:30:28.000Z", "fullName": "Anchit Thakur", "phone": "123-456-7890"
}  
```  
  
### Success response  
  
#### Success response - `Success 200`  
  
| Name     | Type       | Description                           |  
|----------|------------|---------------------------------------|  
| timings | `Date` | <p>Time for the ticket</p> |  
| _id | `String` | <p>MongoDB generate _id</p> |  
| user | `String` | <p>_id of the user who booked the ticket</p> |  
| createdAt | `Date` | <p>Timestamp of the creation of the ticket</p> |  
  
### Success response example  
  
#### Success response example - `Success`  
  
```json  
HTTP/1.1 200 OK  
{  
"message": "Success",  
"ticket": {  
  "_id": "5f4b71c7ec53302d826a6dc6",  
  "timings": "2020-11-17T16:30:28.000Z",  
  "user": "5f4b71c7c152df3a1aaea1d0",  
  "createdAt": "2020-08-30T09:30:47.807Z"  
 }
}
```  
  
### Error response example  
  
#### Error response example - `Error Types`  
  
```json  
HTTP/1.1 500 {"message": "Something went wrong"}  
HTTP/1.1 422 {"message": "Invalid input"}  
HTTP/1.1 412 {"message": "Max ticket count exceeded"}  
```  
  
## <a name='Delete-a-ticket-by-it&#39;s-_id'></a> Delete a ticket by it&#39;s _id  
[Back to top](#api)  
  
```  
DELETE /ticket  
```  
  
### Parameters - `Parameter`  
  
| Name     | Type       | Description                           |  
|----------|------------|---------------------------------------|  
| ticketId | `String` | <p>_id of the ticket to be changed</p> |  
  
### Examples  
Example usage:  
  
```json  
endpoint: http://localhost:9000/ticket  
body: {  
 "ticketId": "4d5c719fc95147c7213fa720"
}  
```  
  
### Success response example  
  
#### Success response example - `Success`  
  
```json  
HTTP/1.1 200 OK {"message": "Success"}  
```  
  
### Error response example  
  
#### Error response example - `Error Types`  
  
```json  
HTTP/1.1 500 {"message": "Something went wrong"}  
HTTP/1.1 422 {"message": "Invalid input"}  
HTTP/1.1 404 {"message": "Ticket not found / Already delete"}  
```  
  
## <a name='Fetch-all-tickets-for-a-particular-timing'></a> Fetch all tickets for a particular timing  
[Back to top](#api)  
  
```  
GET /ticket  
```  
  
### Parameters - `Parameter`  
  
| Name     | Type       | Description                           |  
|----------|------------|---------------------------------------|  
| timings | `Date` | <p>timings for the tickets</p> |  
  
### Examples  
Example usage:  
  
```json  
endpoint: http://localhost:9000/ticket  
query: {  
 "timings": "2020-11-17T16:30:28.000Z",
}  
```  
  
### Success response  
  
#### Success response - `Success 200`  
  
| Name     | Type       | Description                           |  
|----------|------------|---------------------------------------|  
| tickets | `Object[]` | <p>Fetched tickets</p> |  
| ticket.timings | `Date` | <p>Time for the ticket</p> |  
| ticket._id | `String` | <p>MongoDB generate _id</p> |  
| ticket.createdAt | `Date` | <p>Timestamp of the creation of the ticket</p> |  
| ticket.user | `Object` | <p>User who booked the ticket</p> |  
| ticket.user.firstName | `String` | <p>User's first name</p> |  
| ticket.user.lastName | `String` | <p>User's last name</p> |  
| ticket.user.phone | `String` | <p>User's phone number</p> |  
  
### Success response example  
  
#### Success response example - `Success`  
  
```json  
HTTP/1.1 200 OK  
{  
"message": "Success",  
"tickets": [{  
  "_id": "5f4b71c7ec53302d826a6dc6",  
  "timings": "2020-11-17T16:30:28.000Z",  
  "user": {  
  "fullName": "Anchit Thakur",  
  "phone": "123-456-7890",
  },
  "createdAt": "2020-08-30T09:30:47.807Z"  
}]  
}  
```  
  
### Error response example  
  
#### Error response example - `Error Types`  
  
```json  
HTTP/1.1 500 {"message": "Something went wrong"}  
HTTP/1.1 422 {"message": "Invalid input"}  
HTTP/1.1 404 {"message": "No tickets found"}  
```  
  
# <a name='User'></a> User  
  
## <a name='Fetch-User-by-ticket-ID'></a> Fetch User by ticket ID  
[Back to top](#api)  
  
```  
GET /user  
```  
  
### Parameters - `Parameter`  
  
| Name     | Type       | Description                           |  
|----------|------------|---------------------------------------|  
| query | `String` | <p>Ticket ID associated with the user</p> |  
  
### Examples  
Example usage:  
  
```json  
endpoint: http://localhost:9000/user  
query: {"ticketId": "4d5c719fc95147c7213fa720"}  
```  
  
### Success response  
  
#### Success response - `Success 200`  
  
| Name     | Type       | Description                           |  
|----------|------------|---------------------------------------|  
| firstName | `String` | <p>User's first name</p> |  
| lastName | `String` | <p>User's last name</p> |  
| phone | `String` | <p>User's phone number</p> |  
| _id | `String` | <p>MongoDB generate _id</p> |  
  
### Success response example  
  
#### Success response example - `Success`  
  
```json  
HTTP/1.1 200 OK  
{  
"message": "Success",  
"user": {  
  "_id": "5f4a719fc95143c7813ff709",  
  "firstName": "Anchit",  
  "lastName": "Thakur",  
  "phone": "123-456-7890"  
 }
}
```  
  
### Error response example  
  
#### Error response example - `Error Types`  
  
```json  
HTTP/1.1 500 {"message": "Something went wrong"}  
HTTP/1.1 422 {"message": "Invalid input"}  
HTTP/1.1 404 {"message": "User not found"}  
````
---
---

<a name="del"></a>
# Automatic deletion of tickets (Explaination)
Automatic deletion of ticket documents is achieved by adding a TTL index on TicketSchema, forcing the document to auto expire after 28800 seconds (8 hours).

****Note: MongoDB's data expiration task runs once a minute, so an expired doc might persist up to a minute past its expiration.**
```js
TicketSchema.index({timings: 1}, {expireAfterSeconds: 28800});
```

---
---

<a name="screenshots"></a>
# Screenshots

## Post /ticket

### Execution
![](https://drive.google.com/uc?id=1_VhBXXuIxDlGf7CMvrBSb-zwo4i_LFBS)

### Test
![](https://drive.google.com/uc?id=1Y5ej4JXzJS3awq8NOznMphPHTPkM6YiW)

## Patch /ticket
### Execution
![](https://drive.google.com/uc?id=1hZLu0TjpZZoSLo4cdl5ixO8oQ4lkRiZ1)
### Test
![](https://drive.google.com/uc?id=1thbIoC2AKVNdi6sfu8NPshcolbH_pC2j)


## Delete /ticket
### Execution
![](https://drive.google.com/uc?id=1EMWU_KXMdLDrURV473_JzDQf-dQlbAuQ)

### Test
![](https://drive.google.com/uc?id=1PT4P3xraYwzZtQpkGk_XSyzOIfb4eh4F)

## Get /ticket
### Execution
![](https://drive.google.com/uc?id=1QGy_9TCirwBqFUW47MD-9YI688o0IYWO)

### Test
![](https://drive.google.com/uc?id=1KPRewQkvd-jcZrOZirxuLvzkPY-Pd8S6)



## Get /user
### Execution
![](https://drive.google.com/uc?id=1PI3QPshB28BAiVc3P5o-Oylakv7QUoH_)

### Test
![](https://drive.google.com/uc?id=1lwBqnQUKRKEAGLYpu8QHkiEKHw_T9vqC)

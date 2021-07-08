## Online Bookstore

### Descriptions
This project is an online bookstore that includes most features of online stores like amazon and taobao.

The frontend is developed using React JS and antd for the UI.

The backend uses Springboot and Hibernate to manage requests from the frontend server, and the object-relation mapping between the local MySQL database and the entities. 

## Results
Basic User UI
![login](/assets/login.png)
![home](/assets/userHome.png)
![query](/assets/query.png)
![bookInfo](/assets/bookInfo.png)
![cart](/assets/cart.png)
![purchase](/assets/purchase.png)
![orders](/assets/orders.png)
![analytics](/assets/analytics.png)

Manager UI
![ranking](/assets/ranking.png)
![bookManagement](/assets/bookManagement.png)

## Experience

From this project, I have learned the basics of Springboot annotations and persistency for database transactions for hibernate. 

I have also learned how communcation between the frontend and backend server is accomplished.

I dug into database structures to create a architecture that minimizes redundancy.

I gained experience on why and how to implement pagination and honed my decision making on whether to handle processes in the backend or frontend. 

## Shortcomings

The security of the data is very fragile. There are no encryptions when sending the authentication data.


    We should use a method like sha-256 to encrypt the data with a public key when sending login credentials, and decrpyt with the private key at the backend to ensure safety.


Images are stored by a url. I do not have a dedicated server that stores images, instead, I use a url from another existing bookstore website. 

Loading screens should be added in between page swaps.The change can be aesthetically displeasing. 





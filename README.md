# Lab 5-7 report
1. We implemented front and back for registration and login. We used fastify with typescript for the backend and Svelte for the frontend. 
We also implemented passwords' validation. User must use from 8 to 20 symbols including uppercase and lowercase characters, numbers and special symbol.
In order to prevent a brute force attack we added rate limiter. You have only 20 attempts to login and 50 attempts to register every minute for an IP address.
Postgres was chosen as a storage. Our system hashes passwords using bcrypt with salt.


2. With the aim of securing sensitive information of our users such as phone numbers and addresses, we implemented its encryption.
We used aes-256-gcm algorithm for such a purpose. 
Our team added an extra table containing encrypted data as well as init vectors and so-called tags. 
When user is successfully logged in, his sensitive information is sent to him. We placed our encryption key in config `.env` file. We know that it's not the best solution.
We could use for example a cloud KMS provider and the key would be more secured in there.
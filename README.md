# Gambling-Website  

## Overview  
Gambling-Website is an engaging platform where users can participate in betting games with predefined rules and real-time synchronized outcomes. The project focuses on secure user management, seamless betting mechanics, and database-driven game history.  

---

## Features  

### User Authentication  
- Email-based OTP verification for secure sign-up.  
- Robust login functionality with error handling.  

### Betting System  
- Users can place bets on sizes (Big/Small) if their wallet balance is sufficient.  
- Game results are generated every 30 seconds and shared in real-time across all users.  
- Wallet balance is updated dynamically based on the outcome of each bet.  

### Game History and Sync  
- Game history is stored in the database, allowing users to view past results even after refreshing the page.  
- Automatic page reload ensures users always see the latest game results.  

### Account Management  
- Dedicated pages for deposit, withdrawal, and balance display.  
- User-friendly interface to manage transactions.  

---

## Tech Stack  

### Backend  
- **Node.js:** For server-side logic and API development.  
- **Express.js:** For routing and request handling.  
- **MongoDB:** Database for user data, game history, and balance management.  

### Frontend  
- **HTML, CSS, JavaScript:** For creating a responsive and interactive user interface.  

### Security  
- Tested for authentication and error handling using **Postman**.  

---

## How to Run  

1. **Clone the Repository**:  
   ```bash  
   git clone https://github.com/vansh-choudhary01/Gambling-Website.git  
   cd Gambling-Website  
   ```  

2. **Install Dependencies**:  
   ```bash  
   npm install  
   ```  

3. **Set Up Environment Variables**:  
   Create a `.env` file in the root directory and add the following variables:  
   ```env  
   MONGO_URI=your_mongo_database_connection_string  
   SECRET_KEY=your_secret_key  
   ```  

4. **Run the Application**:  
   ```bash  
   node Backend/index.js
   ```  

5. **Access the App**:  
   Open `http://localhost:8080` in your browser.  

---

## Future Enhancements  
- Implement additional betting options and games.  
- Enhance the design for mobile compatibility.  
- Add analytics for user activity and transaction tracking.  

---

## Contributions  
Contributions are welcome! Please submit issues or pull requests. For major changes, start a discussion by opening an issue.  

---  

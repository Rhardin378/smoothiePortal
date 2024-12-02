## **Smoothie Portal**  
Inventory management system for Smoothie King managers to streamline stock tracking and truck orders.  

### **Table of Contents**  
1. [Overview](#overview)  
2. [Features](#features)
3. [Security](#security)
5. [Technologies Used](#technologies-used)  
6. [Installation](#installation)  
7. [Usage](#usage)
8. [Contact for Test Access](#contact-for-test-access)

---

### **Overview**  
Smoothie Portal simplifies inventory management by helping managers track weekly inventory needs, manage truck orders, and view stock status. The dashboard provides a visual representation of inventory data, including pie charts for stock and order analysis.  

### **Features**  
- Add, edit, and delete products.  
- Set and track weekly quantity needs.  
- Visualize inventory data using pie charts.  
- Monitor stocked, low-stock, and out-of-stock items.  
- Track recent truck orders.
- Secure User Access: User accounts are created by an admin through the backend, as no public signup route is provided to safeguard store information.

### **Security**
No Signup Route on Frontend:
To protect sensitive store information, a signup route is not directly implemented on the frontend. User accounts must be created securely by an administrator through the backend. This ensures only authorized personnel have access to inventory and order data.

### **Technologies Used**  
#### **Frontend:**  
- Next.js  
- React  
- Redux  
- React Hook Form  
- Highcharts  
- Axios  
- Yup  
- Moment.js  

#### **Backend:**  
- Express.js  
- MongoDB  
- Mongoose  
- Passport.js  
- JWT (jsonwebtoken)  

### **Installation**  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/Rhardin378/smoothie-portal.git  
   ```  
2. Navigate to the project directory and install dependencies:  
   ```bash  
   cd ui  
   cd smoothie_portal  
   npm install  
   cd ../../backend  
   npm install  
   ```  
3. Create environment variable files:  
   - **Backend (.env)**:  
     ```  
     MONGODB_URI=your_mongodb_connection_string  
     SECRET=your_jwt_secret  
     PORT=your_backend_port  
     ```  
   - **Frontend (.env.local)**:  
     ```  
     API_URL=http://localhost:3000/  
     ```  

4. Run the applications:  
   - Start the Next.js app:  
     ```bash  
     cd ui/smoothie_portal  
     npm run dev  
     ```  
   - Start the backend server:  
     ```bash  
     cd backend  
     npm run start  
     ```  

### **Usage**  
- Access the dashboard to view inventory levels and order details.  
- Manage inventory by adding, editing, or deleting products.
- - Set weekly quantity needs to prepare for truck orders.  
- Use pie charts for a quick visual summary of inventory data.  

### **Contact for Test Access**
If you’d like to explore the app and its features, please contact me to request credentials for an authorized test user account.

Email: [rhardin378@gmail.com]
GitHub: github.com/Rhardin378

---  

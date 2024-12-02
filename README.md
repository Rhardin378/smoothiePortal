## **Smoothie Portal**  
Inventory management system for Smoothie King managers to streamline stock tracking and truck orders.  

### **Table of Contents**  
1. [Overview](#overview)  
2. [Features](#features)  
3. [Technologies Used](#technologies-used)  
4. [Installation](#installation)  
5. [Usage](#usage)  

---

### **Overview**  
Smoothie Portal simplifies inventory management by helping managers track weekly inventory needs, manage truck orders, and view stock status. The dashboard provides a visual representation of inventory data, including pie charts for stock and order analysis.  

### **Features**  
- Add, edit, and delete products.  
- Set and track weekly quantity needs.  
- Visualize inventory data using pie charts.  
- Monitor stocked, low-stock, and out-of-stock items.  
- Track recent truck orders.  

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
- Set weekly quantity needs to prepare for truck orders.  
- Use pie charts for a quick visual summary of inventory data.  

---  

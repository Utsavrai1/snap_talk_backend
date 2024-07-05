# SnapTalk Backend

SnapTalk is a real-time chat application. This repository contains the backend code built using Express.js and Node.js, with MongoDB as the database.

## Features

- User authentication
- Real-time messaging
- Chat rooms
- Online/offline status
- Message history

## Technologies Used

- **Backend:** Express.js, Node.js
- **Database:** MongoDB
- **Real-time Communication:** Socket.IO

## Related Repositories

- **Frontend Repository:** [SnapTalk-Frontend](https://github.com/Utsavrai1/snap-talk-frontend.git)
- **Backend Repository:** [SnapTalk-Backend](https://github.com/Utsavrai1/snap_talk_backend.git)
- **Mobile App Repository:** [SnapTalk Mobile](https://github.com/Utsavrai1/snap_talk.git)

## Installation

To get started with the backend, follow these steps:

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Clone the Repository

```bash
git clone https://github.com/Utsavrai1/snap_talk_backend.git
cd snap_talk_backend
```

### Install Dependencies
```bash
npm install
```

### Configure Environment Variables
Create a .env file in the snap_talk_backend directory and add the following environment variables:

```bash
PORT=3001
DATABASEURL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
```

### Run the Application
```bash
npm run dev
```

The backend should now be running on http://localhost:3001.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code follows the project's coding standards and includes tests where applicable.


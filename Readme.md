# Backend API for Task-er

This is the backend service for the **Task-er** application, built with Node.js, Express, and MongoDB. It handles authentication, task management, and communication with third-party OAuth providers.

---

## 🔧 Installation & Setup

For detailed installation instructions, please refer to the main project README:

👉 [Task-er Installation Guide](https://github.com/S0KPiseth/TaskMaster/blob/65d0729cfeefd22883e9002a1a47663c9842eba9/README.md)

---

## 🌐 Environment Variables

Make sure to create a `.env` file in the root of the backend folder with the following structure:

```env
# === Server Configuration ===
SERVER_PORT=5050

# === Google OAuth ===
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# === Discord OAuth ===
DISCORD_ID=your_discord_client_id
DISCORD_SECRET=your_discord_client_secret

# === GitHub OAuth ===
GITHUB_APP_ID=your_github_client_id
GITHUB_APP_SECRET=your_github_client_secret

# === MongoDB Connection ===
MONGO_URI=mongodb://127.0.0.1/Tasker

# === Frontend URL ===
CLIENT_URL=http://localhost:8888
```

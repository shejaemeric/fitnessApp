const sqlite3 = require("sqlite3").verbose();
const axios = require("axios");

// Connect to SQLite database
const db = new sqlite3.Database(":memory:"); // You can change ':memory:' to a file path for persistent storage

// Create Users table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT
    )
  `);
});

// SQLite CRUD Operations

// Create a new user
const createUser = (username, password) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO Users (username, password) VALUES (?, ?)",
      [username, password],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
};

// Get a user by ID
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM Users WHERE id = ?", [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Update user by ID
const updateUserById = (id, newData) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE Users SET username = ?, password = ? WHERE id = ?",
      [newData.username, newData.password, id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      }
    );
  });
};

// Delete user by ID
const deleteUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM Users WHERE id = ?", [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
};

// Update stored user data by ID with offline-online sync
const updateStoredUserDataByIdWithSync = async (id, newData) => {
  try {
    // Attempt to update locally
    const updatedLocally = await updateStoredUserDataById(id, newData);

    // Check if online
    const isOnline = navigator.onLine; // Use the appropriate method for detecting online status in your environment

    if (isOnline) {
      // If online, make a call to the API to update data
      const updatedRemotely = await updateUserDataRemotely(id, newData);

      // Use the updated data from the API response for further operations if needed
      console.log("User Updated Remotely:", updatedRemotely);

      return updatedRemotely;
    }

    // If offline, return the locally updated data
    return updatedLocally;
  } catch (error) {
    console.error("Error during update:", error);
    throw error;
  }
};

// Update user data on the API
const updateUserDataRemotely = async (id, newData) => {
  try {
    // Make a call to your API to update user data
    const response = await axios.put(
      `https://your-api-url/users/${id}`,
      newData
    );

    return response.data; // Assuming the API responds with the updated user data
  } catch (error) {
    console.error("Error during API update:", error);
    throw error;
  }
};

// Example Usage:

// (async () => {
//   try {
//     // Create user
//     const userId = await createUser('john_doe', 'password123');
//     console.log('User Created with ID:', userId);

//     // Get user by ID
//     const user = await getUserById(userId);
//     console.log('User:', user);

//     // Update user
//     const updatedRows = await updateUserById(userId, {
//       username: 'john_doe_updated',
//       password: 'newpassword',
//     });
//     console.log('User Updated. Rows Updated:', updatedRows);

//     // Delete user
//     const deletedRows = await deleteUserById(userId);
//     console.log('User Deleted. Rows Deleted:', deletedRows);
//   } catch (error) {
//     console.error('Error:', error);
//   } finally {
//     // Close the database connection
//     db.close();
//   }
// })();

// (async () => {
//   try {
//     // Store user data
//     const storedUser = await storeUserData('john_doe', 'password123');
//     console.log('User Stored:', storedUser);

//     // Get stored user data by ID
//     const retrievedUser = await getStoredUserDataById(storedUser.id);
//     console.log('Retrieved User:', retrievedUser);

//     // Update stored user data by ID with offline-online sync
//     const updatedUser = await updateStoredUserDataByIdWithSync(storedUser.id, {
//       username: 'john_doe_updated',
//       password: 'newpassword',
//     });
//     console.log('User Updated:', updatedUser);

//     // Delete stored user data by ID
//     const deletedUser = await deleteStoredUserDataById(storedUser.id);
//     console.log('Deleted User:', deletedUser);
//   } catch (error) {
//     console.error('Error:', error);
//   } finally {
//     // Close the database connection
//     db.close();
//   }
// })();

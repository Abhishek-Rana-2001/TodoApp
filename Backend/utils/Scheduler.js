const cron = require('node-cron');
const webpush = require('web-push');
const Todo = require('../models/todoModel');
const Subscription = require('../models/subscriptionmodel');
const User = require('../models/usermodel');

// Configure web-push with VAPID keys
const publicKey = "BJy8Yv98ss_Q7oOaVYQffOhm-Thd_8LjvYZuppXG5NOvQ8lUl6aedfxrRNw0tV8Z82bzd16EIPNfpPYi7yu6vd4"
const privateKey = "vEtmByydxGfmVZkgqaptmTUuyLwe0CN9by7WgW8I78c"

  webpush.setVapidDetails(
    'mailto:abhishek.weboapp@gmail.com',
    publicKey,
    privateKey
  );


// Export function to start the scheduler
module.exports = function startScheduler() {
    // Schedule task to run every minute
    cron.schedule('* * * * *', async () => {
        try {
            // Get current date and time
            const currentTime = new Date()
                currentTime.setMilliseconds(0);
                // Query todos with due dates matching current time
            const todos = await Todo.find({ time: currentTime });
            // Send notifications for matching todos
            for (const todo of todos) {
                // Find the user associated with the todo
                const user = await User.findById(todo.user);
                if (!user) {
                    console.error(`User not found for todo with ID ${todo.user}`);
                    continue; // Skip to the next todo if user not found
                }

                // Iterate through the user's subscriptions
                for (const subscription of user.subscriptions) {
                    const subscriptionData = await Subscription.findById(subscription)
                    await sendPushNotification(subscriptionData, {
                        title: todo.title,
                        body: `Its time to do ${todo.description}`,
                        // Add o    ther notification options as needed
                    });
                }
            }
        } catch (error) {
            console.error('Error in scheduler:', error);
        }
    });

    // Function to send push notification
    async function sendPushNotification(subscription, payload) {
        try {
            await webpush.sendNotification(subscription, JSON.stringify(payload));
            console.log('Push notification sent successfully');
        } catch (error) {
            console.error('Error sending push notification:', error);
        }
    }
};

import React from 'react';
import { Link } from 'react-router-dom';

const DOSTDashboard = () => {
  const recentFeedback = [
    { id: '1', comment: 'Great service!', date: '1/9/2025', rating: '5/5' },
    { id: '2', comment: 'Very helpful staff.', date: '1/8/2025', rating: '4/5' },
    // Add more feedback as needed
  ];

  const notifications = [
    { id: '1', message: 'New feedback received for application ID: 12345', time: '1/9/2025 at 11:07 AM' },
    { id: '2', message: 'Feedback review required for application ID: 67890', time: '1/8/2025 at 10:22 AM' },
    // Add more notifications as needed
  ];

  const quickStats = {
    totalFeedback: 100,
    positiveFeedback: 80,
    negativeFeedback: 20,
    feedbackIncrease: '15%',
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Customer Satisfaction Dashboard</h1>
      <p className="mb-6">Good morning! Ready to review today's feedback?</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold">Recent Feedback</h2>
          {recentFeedback.map(feedback => (
            <div key={feedback.id} className="border-b py-2">
              <p>{feedback.comment}</p>
              <p>Date: {feedback.date} - Rating: {feedback.rating}</p>
            </div>
          ))}
          <Link to="/feedback" className="text-blue-600">View All Feedback</Link>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold">Notifications</h2>
          {notifications.map(notification => (
            <div key={notification.id} className="border-b py-2">
              <p>{notification.message}</p>
              <p>{notification.time}</p>
            </div>
          ))}
          <Link to="/notifications" className="text-blue-600">View All Notifications</Link>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold">Quick Stats</h2>
          <p>Total Feedback: {quickStats.totalFeedback}</p>
          <p>Positive Feedback: {quickStats.positiveFeedback}</p>
          <p>Negative Feedback: {quickStats.negativeFeedback}</p>
          <p>Feedback Increase (Last 30 days): {quickStats.feedbackIncrease}</p>
          <Link to="/analytics" className="text-blue-600">View Detailed Analytics</Link>
        </div>
      </div>

      <div className="flex justify-between">
        <Link to="/reports" className="bg-green-600 text-white py-2 px-4 rounded">Go to Reports</Link>
        <Link to="/all-feedback" className="bg-blue-600 text-white py-2 px-4 rounded">Go to All Feedback</Link>
        <Link to="/settings" className="bg-gray-600 text-white py-2 px-4 rounded">Go to Settings</Link>
      </div>
    </div>
  );
};

export default DOSTDashboard;
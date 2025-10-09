import React, { useState } from 'react';
import { Bell, Plus, Clock, Calendar, Trash2, Edit3, Check, X, Smartphone, Mail, Settings, Moon, Sun, Sunset, Sunrise } from 'lucide-react';

const RemindersPage = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);

  // Sample reminders data
  const [reminders, setReminders] = useState([
    {
      id: 1,
      type: 'period',
      title: 'Period Starting Soon',
      description: 'Your period is expected to start in 2 days',
      time: '09:00',
      frequency: 'cycle',
      isActive: true,
      method: ['push', 'email'],
      daysBeforeEvent: 2,
      icon: '🩸'
    },
    {
      id: 2,
      type: 'symptoms',
      title: 'Log Daily Symptoms',
      description: 'Time to record how you\'re feeling today',
      time: '20:00',
      frequency: 'daily',
      isActive: true,
      method: ['push'],
      icon: '📝'
    },
    {
      id: 3,
      type: 'medication',
      title: 'Take Birth Control',
      description: 'Don\'t forget your daily pill',
      time: '08:00',
      frequency: 'daily',
      isActive: true,
      method: ['push'],
      icon: '💊'
    },
    {
      id: 4,
      type: 'fertility',
      title: 'Fertile Window Starting',
      description: 'Your fertile window begins today',
      time: '07:00',
      frequency: 'cycle',
      isActive: false,
      method: ['push', 'email'],
      daysBeforeEvent: 0,
      icon: '🌸'
    },
    {
      id: 5,
      type: 'appointment',
      title: 'Gynecologist Appointment',
      description: 'Annual check-up reminder',
      time: '10:00',
      frequency: 'yearly',
      isActive: true,
      method: ['push', 'email'],
      icon: '👩‍⚕️'
    }
  ]);

  const [newReminder, setNewReminder] = useState({
    type: 'symptoms',
    title: '',
    description: '',
    time: '09:00',
    frequency: 'daily',
    method: ['push'],
    daysBeforeEvent: 1,
    isActive: true
  });

  const reminderTypes = [
    { value: 'period', label: 'Period Reminder', icon: '🩸' },
    { value: 'symptoms', label: 'Symptom Logging', icon: '📝' },
    { value: 'medication', label: 'Medication', icon: '💊' },
    { value: 'fertility', label: 'Fertility Window', icon: '🌸' },
    { value: 'appointment', label: 'Appointments', icon: '👩‍⚕️' },
    { value: 'custom', label: 'Custom', icon: '⚙️' }
  ];

  const frequencies = [
    { value: 'daily', label: 'Daily' },
    { value: 'cycle', label: 'Each Cycle' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const getTimeIcon = (time) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 5 && hour < 12) return <Sunrise className="w-4 h-4 text-orange-500" />;
    if (hour >= 12 && hour < 17) return <Sun className="w-4 h-4 text-yellow-500" />;
    if (hour >= 17 && hour < 21) return <Sunset className="w-4 h-4 text-orange-600" />;
    return <Moon className="w-4 h-4 text-indigo-500" />;
  };

  const toggleReminder = (id) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, isActive: !reminder.isActive } : reminder
    ));
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const addReminder = () => {
    const reminder = {
      ...newReminder,
      id: Date.now(),
      icon: reminderTypes.find(t => t.value === newReminder.type)?.icon || '⚙️'
    };
    setReminders([...reminders, reminder]);
    setNewReminder({
      type: 'symptoms',
      title: '',
      description: '',
      time: '09:00',
      frequency: 'daily',
      method: ['push'],
      daysBeforeEvent: 1,
      isActive: true
    });
    setShowAddReminder(false);
  };

  const activeReminders = reminders.filter(r => r.isActive);
  const inactiveReminders = reminders.filter(r => !r.isActive);

  const ReminderCard = ({ reminder }) => (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{reminder.icon}</div>
          <div>
            <h3 className="font-semibold text-gray-900">{reminder.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{reminder.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setEditingReminder(reminder)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteReminder(reminder.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            {getTimeIcon(reminder.time)}
            <span>{reminder.time}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span className="capitalize">{reminder.frequency}</span>
          </div>
          <div className="flex items-center space-x-1">
            {reminder.method.includes('push') && <Smartphone className="w-4 h-4" />}
            {reminder.method.includes('email') && <Mail className="w-4 h-4" />}
          </div>
        </div>
        
        <button
          onClick={() => toggleReminder(reminder.id)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            reminder.isActive ? 'bg-pink-600' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              reminder.isActive ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );

  const AddReminderModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Add New Reminder</h3>
          <button
            onClick={() => setShowAddReminder(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={newReminder.type}
              onChange={(e) => setNewReminder({ ...newReminder, type: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {reminderTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={newReminder.title}
              onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
              placeholder="Enter reminder title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={newReminder.description}
              onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
              placeholder="Enter reminder description"
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <input
                type="time"
                value={newReminder.time}
                onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
              <select
                value={newReminder.frequency}
                onChange={(e) => setNewReminder({ ...newReminder, frequency: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {frequencies.map(freq => (
                  <option key={freq.value} value={freq.value}>{freq.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notification Method</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newReminder.method.includes('push')}
                  onChange={(e) => {
                    const methods = e.target.checked 
                      ? [...newReminder.method, 'push']
                      : newReminder.method.filter(m => m !== 'push');
                    setNewReminder({ ...newReminder, method: methods });
                  }}
                  className="rounded text-pink-600 focus:ring-pink-500"
                />
                <span className="ml-2 text-sm text-gray-700">Push Notification</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newReminder.method.includes('email')}
                  onChange={(e) => {
                    const methods = e.target.checked 
                      ? [...newReminder.method, 'email']
                      : newReminder.method.filter(m => m !== 'email');
                    setNewReminder({ ...newReminder, method: methods });
                  }}
                  className="rounded text-pink-600 focus:ring-pink-500"
                />
                <span className="ml-2 text-sm text-gray-700">Email</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={() => setShowAddReminder(false)}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={addReminder}
            disabled={!newReminder.title}
            className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add Reminder
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Reminders</h1>
              <p className="text-gray-600">Never miss important moments in your cycle</p>
            </div>
            <button
              onClick={() => setShowAddReminder(true)}
              className="flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Reminder</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Bell className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{activeReminders.length}</p>
                <p className="text-sm text-gray-600">Active Reminders</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">2</p>
                <p className="text-sm text-gray-600">Next 24 Hours</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Settings className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">85%</p>
                <p className="text-sm text-gray-600">Completion Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'active'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Active ({activeReminders.length})
          </button>
          <button
            onClick={() => setActiveTab('inactive')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'inactive'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Inactive ({inactiveReminders.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'history'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            History
          </button>
        </div>

        {/* Reminders List */}
        <div className="space-y-4">
          {activeTab === 'active' && (
            <>
              {activeReminders.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Reminders</h3>
                  <p className="text-gray-600 mb-4">Get started by adding your first reminder</p>
                  <button
                    onClick={() => setShowAddReminder(true)}
                    className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors"
                  >
                    Add Reminder
                  </button>
                </div>
              ) : (
                activeReminders.map(reminder => (
                  <ReminderCard key={reminder.id} reminder={reminder} />
                ))
              )}
            </>
          )}

          {activeTab === 'inactive' && (
            <>
              {inactiveReminders.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Inactive Reminders</h3>
                  <p className="text-gray-600">All your reminders are currently active</p>
                </div>
              ) : (
                inactiveReminders.map(reminder => (
                  <ReminderCard key={reminder.id} reminder={reminder} />
                ))
              )}
            </>
          )}

          {activeTab === 'history' && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="text-lg">📝</div>
                    <div>
                      <p className="font-medium text-gray-900">Log Daily Symptoms</p>
                      <p className="text-sm text-gray-600">Today at 8:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600">Completed</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="text-lg">💊</div>
                    <div>
                      <p className="font-medium text-gray-900">Take Birth Control</p>
                      <p className="text-sm text-gray-600">Today at 8:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600">Completed</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-lg">🩸</div>
                    <div>
                      <p className="font-medium text-gray-900">Period Starting Soon</p>
                      <p className="text-sm text-gray-600">Yesterday at 9:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <X className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Dismissed</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add Reminder Modal */}
        {showAddReminder && <AddReminderModal />}
      </div>
    </div>
  );
};

export default RemindersPage;
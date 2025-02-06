export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="hero bg-gray-100">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-gray-800">
              About HabitTrack
            </h1>
            <p className="py-6 text-gray-600 -mb-8">
              Your daily companion for better habits
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="card bg-white shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl text-gray-800">
                What is HabitTrack?
              </h2>
              <p className="text-gray-600">
                HabitTrack is a web-based application built with Next.js,
                designed to help friends and family track and maintain their
                daily habits. Our platform makes it easy to build positive
                routines and stay accountable to your goals.
              </p>
            </div>
          </div>

          <div className="card bg-gray-600 text-gray-100">
            <div className="card-body">
              <h2 className="card-title text-2xl">Our Vision</h2>
              <p>
                To create a supportive community where building positive habits
                becomes an engaging and rewarding journey for everyone.
              </p>
            </div>
          </div>

          <div className="card bg-gray-500 text-gray-100">
            <div className="card-body">
              <h2 className="card-title text-2xl">Our Mission</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Empower individuals to develop and maintain positive habits
                </li>
                <li>Foster a supportive environment for personal growth</li>
                <li>Provide simple yet effective tools for habit tracking</li>
                <li>Create meaningful connections through shared goals</li>
              </ul>
            </div>
          </div>

          <div className="card bg-white shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4 text-gray-800">
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="card bg-gray-50 shadow-md">
                  <div className="card-body">
                    <h3 className="card-title text-lg text-gray-800">
                      Habit Tracking
                    </h3>
                    <p className="text-gray-600">
                      Easy-to-use interface for daily habit tracking
                    </p>
                  </div>
                </div>
                <div className="card bg-gray-50 shadow-md">
                  <div className="card-body">
                    <h3 className="card-title text-lg text-gray-800">
                      Progress Analytics
                    </h3>
                    <p className="text-gray-600">
                      Visual insights into your habit-forming journey
                    </p>
                  </div>
                </div>
                <div className="card bg-gray-50 shadow-md">
                  <div className="card-body">
                    <h3 className="card-title text-lg text-gray-800">
                      Community Support
                    </h3>
                    <p className="text-gray-600">
                      Connect with friends and family
                    </p>
                  </div>
                </div>
                <div className="card bg-gray-50 shadow-md">
                  <div className="card-body">
                    <h3 className="card-title text-lg text-gray-800">
                      Customization
                    </h3>
                    <p className="text-gray-600">
                      Personalize your habit tracking experience
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

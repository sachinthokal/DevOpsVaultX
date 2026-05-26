from flask_frozen import Freezer
from app import app  # Import the Flask app instance from app.py

# Initialize the Freezer with our Flask app
freezer = Freezer(app)

# Execute the freezing process if this file is run directly
if __name__ == '__main__':

    print("🚀 Freezing Flask App...")
    
    # Generate the static HTML/CSS/JS files
    # By default, this will create a 'build' folder in your project directory
    freezer.freeze()
    print("✅ Success! The static site has been generated inside the 'build' folder.")
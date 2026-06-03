from flask import Flask, render_template

# Initialize the Flask application
app = Flask(__name__)

# Define the route for the home page (Root URL)
@app.route('/')
def home():
    # Render the index.html file located in the 'templates' folder
    # Jinja2 will automatically handle the url_for('static', ...) links
    return render_template('index.html')

# Define the route for the text case converter page
@app.route('/text-case-converter/')
def text_case_converter():
    return render_template('text-case-converter.html')

# Run the application in debug mode if this file is executed directly
if __name__ == '__main__':
    app.run(debug=True)
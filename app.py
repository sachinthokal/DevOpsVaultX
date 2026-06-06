from flask import Flask, render_template

# Initialize the Flask application
app = Flask(__name__)

# Homepage (Root URL)
@app.route('/')
def home():
    # Render the index.html file located in the 'templates' folder
    # Jinja2 will automatically handle the url_for('static', ...) links
    return render_template('index.html')

# Text Case Converter
@app.route('/text-case-converter/')
def text_case_converter():
    return render_template('text-case-converter.html')

# CRON GURU 
@app.route('/cron-expression-guru/')
def cron_expression_guru():
    return render_template('cron-expression-guru.html')

# Base64 Encoder/Decoder
@app.route('/base64-encoder-decoder/')   
def base64_encoder_decoder():
    return render_template('base64-encoder-decoder.html')

# Run the application in debug mode if this file is executed directly
if __name__ == '__main__':
    app.run(debug=True)
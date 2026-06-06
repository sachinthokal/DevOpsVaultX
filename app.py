from flask import Flask, render_template

# Initialize the Flask application
app = Flask(__name__)



# ------------------------------------------------------------------
# ADDING SECURITY HEADERS TO FIX LIGHTHOUSE BEST PRACTICES
# ------------------------------------------------------------------
@app.after_request
def add_security_headers(response):
    # 1. Mitigate Clickjacking
    response.headers['X-Frame-Options'] = 'DENY'
    # 2. Prevent MIME-sniffing
    response.headers['X-Content-Type-Options'] = 'nosniff'
    # 3. Secure Origin Isolation
    response.headers['Cross-Origin-Opener-Policy'] = 'same-origin'
    
    return response

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

# IP CIDR Generator
@app.route('/ip-cidr-generator/')
def ip_cidr_generator():
    return render_template('ip-cidr-generator.html')

# Digital Unit Converter
@app.route('/digital-unit-converter/')
def digital_unit_converter():
    return render_template('digital-unit-converter.html')

# Image Converter
@app.route('/image-converter/')
def image_converter():
    return render_template('image-converter.html')

# Kubernetes YAML Generator
@app.route('/kubernetes-yaml-generator/')
def kubernetes_yaml_generator():
    return render_template('kubernetes-yaml-generator.html')

# Run the application in debug mode if this file is executed directly
if __name__ == '__main__':
    app.run(debug=True)
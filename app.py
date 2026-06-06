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

    # 4. Use a strong HSTS Policy (Enforced even on localhost during testing)
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload'
    
    # 5. Robust Content Security Policy (CSP) - Allowing Google Analytics & Fonts cleanly
    csp_policy = (
        "default-src 'self'; "
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://cdnjs.cloudflare.com; "
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; "
        "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; "
        "img-src 'self' data: https://www.googletagmanager.com https://analytics.google.com; "
        "connect-src 'self' https://analytics.google.com https://stats.g.doubleclick.net; "
        "require-trusted-types-for 'script';"
    )
    response.headers['Content-Security-Policy'] = csp_policy
    
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

# Run the application in debug mode if this file is executed directly
if __name__ == '__main__':
    app.run(debug=True)
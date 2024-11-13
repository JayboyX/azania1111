import openai
import json
import fitz  # PyMuPDF for PDF extraction
import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv

# Explicitly specify the path to the .env file
load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))
print("OpenAI API Key:", os.getenv("OPENAI_API_KEY"))

# Set up Flask app
app = Flask(__name__)

# Set your OpenAI API key from environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

# Function to extract text from PDF
def extract_text_from_pdf(pdf_path):
    """
    Extracts text from each page of the PDF and combines it into a single string.
    """
    text = ""
    with fitz.open(pdf_path) as pdf:
        for page_num in range(pdf.page_count):
            page = pdf[page_num]
            text += page.get_text("text")  # Extract text from each page
    return text

# Path to the PDF file using a relative path
current_dir = os.path.dirname(os.path.abspath(__file__))
pdf_path = os.path.join(current_dir, "QCTO_FAQ_Dataset.pdf")  # Ensure the PDF is in the same directory

# Extract the context once when the script runs
try:
    pdf_text = extract_text_from_pdf(pdf_path)
except FileNotFoundError:
    pdf_text = None
    print(f"PDF file not found at {pdf_path}")

# Function to interact with OpenAI's API
def generate_response(question, context):
    """
    Generates a response from the OpenAI model based on the question and PDF context.
    """
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",  # Ensure the model name matches the latest available model you are using
            messages=[
                {"role": "system", "content": "You are Azania, an assistant specializing in answering questions about the Quality Council for Trades and Occupations (QCTO)."},
                {"role": "system", "content": context},  # Include PDF content as system context
                {"role": "user", "content": question}
            ]
        )
        # Access the completion text
        answer = response.choices[0].message["content"]
        return answer
    except Exception as e:
        return f"An error occurred: {str(e)}"

# Route to handle question requests
@app.route('/process', methods=['GET', 'POST'])
def process():
    if request.method == 'GET':
        return jsonify({"response": "Please use a POST request with a message payload"})

    # POST logic for processing the message
    if not pdf_text:
        return jsonify({"error": "PDF content is not available"}), 500

    data = request.get_json()
    question = data.get("message", "")
    answer = generate_response(question, pdf_text)
    return jsonify({"response": answer})

# Run Flask app
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Default to 5000 if PORT is not set
    app.run(host="0.0.0.0", port=port)

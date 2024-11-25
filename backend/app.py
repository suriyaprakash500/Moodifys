from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob

app = Flask(__name__)
CORS(app)  # Enable CORS to allow frontend-backend communication

# Define the route for sentiment analysis
@app.route('/sentiment', methods=['POST'])
def sentiment_analysis():
    try:
        data = request.get_json()
        text = data.get("text", "")  # Get the input text

        if not text:
            return jsonify({"error": "Text input is required"}), 400

        # Analyze sentiment using TextBlob
        blob = TextBlob(text)
        polarity = blob.sentiment.polarity  # Sentiment polarity (-1 to 1)

        # Categorize polarity into sentiments
        if polarity > 0:
            sentiment = "Positive"
        elif polarity < 0:
            sentiment = "Negative"
        else:
            sentiment = "Neutral"

        return jsonify({"sentiment": sentiment, "polarity": polarity})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)

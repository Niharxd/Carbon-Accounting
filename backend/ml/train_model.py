import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib
from pathlib import Path

# Load dataset
data_path = Path(__file__).parent.parent / "data" / "emissions_data.csv"
df = pd.read_csv(data_path)

# Features and target
X = df[["cpu", "ram", "storage", "carbon_intensity"]]
y = df["emissions"]

# Split train/test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Print model score
train_score = model.score(X_train, y_train)
test_score = model.score(X_test, y_test)
print(f"Training Score: {train_score:.4f}")
print(f"Test Score: {test_score:.4f}")

# Save model
model_path = Path(__file__).parent / "model.pkl"
joblib.dump(model, model_path)
print(f"Model saved to {model_path}")

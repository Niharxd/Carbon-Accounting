import json
from pathlib import Path
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
import joblib

# Paths
base_path = Path(__file__).parent
data_path = base_path.parent / "data" / "emissions_data.csv"
model_path = base_path / "model.pkl"
metrics_path = base_path / "model_metrics.json"

# Load dataset
print(f"Loading training data from {data_path}")
df = pd.read_csv(data_path)

# Features and target
X = df[["cpu", "ram", "storage", "carbon_intensity"]]
y = df["emissions"]

# Train / test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize models
linear_model = LinearRegression()
forest_model = RandomForestRegressor(n_estimators=100, random_state=42)

# Fit models
linear_model.fit(X_train, y_train)
forest_model.fit(X_train, y_train)

# Evaluate models
def evaluate(model, name):
    train_score = model.score(X_train, y_train)
    test_score = model.score(X_test, y_test)
    print(f"{name} → train score: {train_score:.4f}, test score: {test_score:.4f}")
    return {
        "name": name,
        "training_score": float(train_score),
        "testing_score": float(test_score)
    }

linear_metrics = evaluate(linear_model, "Linear Regression")
forest_metrics = evaluate(forest_model, "Random Forest")

# Choose best model by test score
best_model = linear_model if linear_metrics["testing_score"] >= forest_metrics["testing_score"] else forest_model
best_metrics = linear_metrics if linear_metrics["testing_score"] >= forest_metrics["testing_score"] else forest_metrics
print(f"Best model selected: {best_metrics['name']}")

# Compute anomaly thresholds
y_mean = float(y.mean())
y_std = float(y.std())
anomaly_threshold = float(y_mean + 2 * y_std)

metrics = {
    "model_name": best_metrics["name"],
    "training_score": best_metrics["training_score"],
    "testing_score": best_metrics["testing_score"],
    "emissions_mean": y_mean,
    "emissions_std": y_std,
    "anomaly_threshold": anomaly_threshold,
    "models": {
        linear_metrics["name"]: {
            "training_score": linear_metrics["training_score"],
            "testing_score": linear_metrics["testing_score"]
        },
        forest_metrics["name"]: {
            "training_score": forest_metrics["training_score"],
            "testing_score": forest_metrics["testing_score"]
        }
    }
}

# Save best model and metrics
joblib.dump(best_model, model_path)
metrics_path.write_text(json.dumps(metrics, indent=2))

print(f"Saved best model to {model_path}")
print(f"Saved model metrics to {metrics_path}")

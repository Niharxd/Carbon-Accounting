# GHG Platform Backend

This backend powers the GHG Platform with FastAPI, scikit-learn model serving, anomaly detection, and model metrics reporting.

## New ML features

- Random Forest model added alongside existing Linear Regression
- Automatic model comparison by training and testing score
- Best-performing model is saved in `backend/ml/model.pkl`
- Model metrics are saved in `backend/ml/model_metrics.json`
- Anomaly detection uses `predicted_emissions > mean + 2 * std_dev`
- Efficiency scoring returns a readable 0–100 efficiency rating
- Simple rule-based recommendation engine returns actionable guidance

## Endpoints

- `POST /predict` — returns predictions plus analytics:
  - `predicted_emissions`
  - `efficiency_score`
  - `anomaly_detected`
  - `model_used`
  - `recommendations`

- `GET /model-metrics` — returns current model and scores

- `POST /calculate` — computes emissions and optionally saves user logs

## Training

To retrain models and update the saved model and metrics:

```powershell
cd backend/ml
python train_model.py
```

This script trains both Linear Regression and Random Forest on `backend/data/emissions_data.csv` and selects the best model automatically.

## Model files

- `backend/ml/model.pkl` — serialized best model
- `backend/ml/model_metrics.json` — stored metrics and selection metadata

## Anomaly detection logic

An emission prediction is marked anomalous when:

```python
predicted_emissions > mean + 2 * std_dev
```

## Recommendations logic

Recommendations are generated from simple rules based on:

- region carbon intensity
- storage consumption
- emission levels relative to dataset averages

## Notes

- If the model file is missing, `/predict` will return a model-loading error.
- If metric loading fails, the backend continues with fallback values but logs the issue.

import pandas as pd
from pathlib import Path

CSV_PATH = Path(__file__).parent.parent / "data" / "carbon_intensity.csv"


def get_carbon_intensity(region: str) -> float:
    df = pd.read_csv(CSV_PATH)
    match = df[df["region"] == region]
    if match.empty:
        return 500.0
    return float(match.iloc[0]["carbon_intensity"])

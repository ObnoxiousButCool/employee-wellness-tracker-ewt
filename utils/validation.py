"""Input validation rules for wellness submissions."""

from __future__ import annotations

from datetime import date
from typing import Mapping, MutableMapping


class ValidationError(ValueError):
    """Raised when submitted wellness data violates business rules."""


def _require_number(payload: Mapping[str, object], field: str, minimum: float, maximum: float) -> float:
    """Return a numeric field value after validating its inclusive range."""

    value = payload.get(field)
    if not isinstance(value, (int, float)):
        raise ValidationError(f"{field} must be a number.")
    numeric = float(value)
    if numeric < minimum or numeric > maximum:
        raise ValidationError(f"{field} must be between {minimum:g} and {maximum:g}.")
    return numeric


def validate_wellness_entry(payload: Mapping[str, object]) -> MutableMapping[str, object]:
    """Validate and normalize a wellness entry payload for service-layer use."""

    normalized: MutableMapping[str, object] = {
        "user_id": _require_number(payload, "user_id", 1, 10_000_000),
        "department_id": _require_number(payload, "department_id", 1, 10_000_000),
        "stress_level": _require_number(payload, "stress_level", 1, 10),
        "work_hours": _require_number(payload, "work_hours", 0, 24),
        "sleep_hours": _require_number(payload, "sleep_hours", 0, 24),
        "energy_level": _require_number(payload, "energy_level", 1, 10),
    }

    mood = payload.get("mood")
    if not isinstance(mood, str) or not mood.strip():
        raise ValidationError("mood is required.")
    normalized["mood"] = mood.strip()[:80]

    submission_date = payload.get("submission_date", date.today().isoformat())
    if not isinstance(submission_date, str):
        raise ValidationError("submission_date must be an ISO date string.")
    date.fromisoformat(submission_date)
    normalized["submission_date"] = submission_date
    return normalized

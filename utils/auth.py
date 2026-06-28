"""Authentication and authorization helpers for Employee Wellness Tracker."""

from __future__ import annotations

import base64
import hashlib
import hmac
import os
from dataclasses import dataclass
from typing import Iterable


@dataclass(frozen=True)
class AuthenticatedUser:
    """Represents a user whose credentials have already been verified."""

    id: int
    name: str
    email: str
    role: str


def hash_password(password: str, *, iterations: int = 210_000) -> str:
    """Return a salted PBKDF2-SHA256 password hash suitable for database storage."""

    if not password or len(password) < 8:
        raise ValueError("Password must be at least 8 characters long.")
    salt = os.urandom(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, iterations)
    return (
        f"pbkdf2_sha256${iterations}$"
        f"{base64.b64encode(salt).decode('ascii')}$"
        f"{base64.b64encode(digest).decode('ascii')}"
    )


def check_password(password: str, stored_hash: str) -> bool:
    """Return True when a plaintext password matches a stored PBKDF2-SHA256 hash."""

    try:
        algorithm, iteration_text, salt_text, digest_text = stored_hash.split("$", 3)
        if algorithm != "pbkdf2_sha256":
            return False
        iterations = int(iteration_text)
        salt = base64.b64decode(salt_text.encode("ascii"))
        expected = base64.b64decode(digest_text.encode("ascii"))
    except (ValueError, TypeError):
        return False

    actual = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, iterations)
    return hmac.compare_digest(actual, expected)


def require_role(user: AuthenticatedUser, allowed_roles: Iterable[str]) -> None:
    """Raise PermissionError when a user does not have one of the allowed roles."""

    allowed = {role.lower() for role in allowed_roles}
    if user.role.lower() not in allowed:
        raise PermissionError("User is not authorized for this action.")

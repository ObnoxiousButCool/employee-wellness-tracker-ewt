#!/usr/bin/env python3
"""CI sanity check run by Agent OS after each code-generation iteration."""

from __future__ import annotations

import glob
import importlib
import os
import py_compile
import subprocess
import sys

sys.dont_write_bytecode = True


def run(command: str) -> int:
    """Run a shell command and print captured output with a short failure path."""

    result = subprocess.run(command, shell=True, capture_output=True, text=True, timeout=120)
    if result.stdout:
        print(result.stdout)
    if result.returncode != 0 and result.stderr:
        print(result.stderr, file=sys.stderr)
    return result.returncode


def compile_python_sources(root: str) -> int:
    """Compile project Python files to catch syntax errors without importing heavy packages."""

    for path in glob.glob(os.path.join(root, "**", "*.py"), recursive=True):
        if f"{os.sep}.venv{os.sep}" in path:
            continue
        py_compile.compile(path, doraise=True)
    return 0


def run_pytest(root: str) -> int:
    """Run only local test files when they exist."""

    venv = os.path.join(root, ".venv")
    pytest_exe = (
        os.path.join(venv, "Scripts", "pytest")
        if os.path.exists(os.path.join(venv, "Scripts", "pytest"))
        else os.path.join(venv, "bin", "pytest")
    )
    test_files = glob.glob(os.path.join(root, "tests", "test_*.py"))
    if not test_files:
        print("No test files found - skipping pytest")
        return 0
    files_arg = " ".join(f'"{path}"' for path in test_files)
    return run(
        f'"{pytest_exe}" {files_arg} --tb=short -q --no-header -p no:timeout 2>NUL '
        f'|| "{pytest_exe}" {files_arg} --tb=short -q --no-header'
    )


if __name__ == "__main__":
    project_root = os.path.dirname(os.path.abspath(__file__))
    try:
        importlib.import_module("utils")
        compile_python_sources(project_root)
    except Exception as exc:
        print(f"CI sanity check failed: {exc}", file=sys.stderr)
        sys.exit(1)

    pytest_rc = run_pytest(project_root)
    if pytest_rc == 0:
        print("CI sanity check passed")
    else:
        print("CI sanity check failed", file=sys.stderr)
    sys.exit(pytest_rc)

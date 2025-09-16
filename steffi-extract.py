#!/usr/bin/env python3
"""
steffi-extract

Decode a base64-encoded ZIP archive and extract its contents to a directory.
Insert the full base64 string into the placeholder variable below and run.
"""

import base64
import os
import zipfile
from io import BytesIO


def main() -> None:
    """Entry point for the steffi-extract script."""
    # Paste the full base64 string between the quotes below
    base64_string = "HIER_DEN_GESAMTEN_BASE64_STRING_EINFÜGEN"

    # Directory to extract the ZIP contents into
    output_directory = "steffi_wakeapp"

    if not base64_string or base64_string == "HIER_DEN_GESAMTEN_BASE64_STRING_EINFÜGEN":
        raise SystemExit(
            "Please paste the full base64 string into 'base64_string' before running."
        )

    os.makedirs(output_directory, exist_ok=True)

    try:
        zip_bytes = base64.b64decode(base64_string)
    except Exception as decode_error:  # noqa: BLE001 - broad for user convenience
        raise SystemExit(f"Failed to decode base64 input: {decode_error}")

    zip_buffer = BytesIO(zip_bytes)

    try:
        with zipfile.ZipFile(zip_buffer, "r") as zip_ref:
            zip_ref.extractall(output_directory)
    except zipfile.BadZipFile as bad_zip_error:
        raise SystemExit(f"Decoded data is not a valid ZIP file: {bad_zip_error}")
    except Exception as extract_error:  # noqa: BLE001 - broad for user convenience
        raise SystemExit(f"Failed to extract ZIP contents: {extract_error}")

    print(f"Extraction complete. Files written to '{output_directory}'.")


if __name__ == "__main__":
    main()


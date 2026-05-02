# Agent Instructions

For every new feature or significant logic change:

1. **Verify with User**: Implement the code changes first and ask the user to verify the feature in the UI.
2. **Post-Verification**: ONLY after the user gives the explicit go-ahead to **commit**, perform the following:
    - **README.md**: Update the documentation to reflect the new feature.
    - **Settings**: Ensure it is toggleable in the Settings Modal.
    - **Backups**: Ensure state/settings are included in JSON export/import.
3. **Commit**: Perform the commit for that specific feature.

Do NOT update documentation or commit until the user has confirmed the feature works as expected.

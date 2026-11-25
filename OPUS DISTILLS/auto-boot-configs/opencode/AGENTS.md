# OpenCode V2 Tool Mapping (Antigravity Skills Compatibility Bridge)

When reading any `SKILL.md` or reference written for Antigravity CLI, map tool names to **OpenCode V2 native tools** as follows:

| Legacy / Antigravity Name | OpenCode V2 Tool | Notes |
|---|---|---|
| `read_file` (`filePath`) | `read` (`path`) | Or use `skill` (`{ "id": "<skill-id>" }`) when loading `SKILL.md` |
| `write_to_file` / `replace_file_content` | `write` / `edit` (`path`) | Preserve indentation and write uncut files |
| `bash` / `run_command` / `run_shell_command` | `shell` (`command`, `workdir`) | Never use `bash` tool name |
| `task` | `subagent` (`agent`, `description`, `prompt`, `sessionID`) | Dispatch parallel subagents in a single turn |
| `ask_question` | `question` | Interactive user clarification / multi-choice |
| `mindmap-engine` / `context-mode` MCP | `execute` Code Mode (`tools["mindmap-engine"]...`) | Or direct MCP tool if `codemode: false` |
| `explore` (subagent name) | `explorer` | Fast read-only codebase explorer subagent |

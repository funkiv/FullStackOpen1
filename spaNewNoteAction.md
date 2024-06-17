```mermaid
sequenceDiagram
    participant A as Browser
    participant B as Server
    A->>B: POST new_note_spa
    B-->>A: 201 Created
    A->>A: Browser Rerenders & Modifies Page
    A->>B: Browser Sends Note as JSON String

```

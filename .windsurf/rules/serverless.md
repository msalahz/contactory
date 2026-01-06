---
trigger: model_decision
description: Cloudflare serverless environments instructions
globs:
---

- Don't use singletons. Instead, you should always create a function that returns a new instance like getDB or getAuth.

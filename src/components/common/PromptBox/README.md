# Prompt Box

This prompt box will live within each Rumble Game Instance.
It simply provides a visual of `today's` prompt along with a `Submit` button.

## Questions For Brandon

- [ ] PromptBoxt as a full page to save clicks?
- [ ] Do we need `setAuthModalVisible` in RenderPromptBox.ts line 14 if this is going to be a full page?
- [ ] Do we need `active` for "getTimeUntilEvent"? (`./PromptBoxContainer`). I assume nothing bc we want to leave the Submit button open for ever.
- [ ] Do we need to check if a user is logged in when rendering the promptBoxModal in `RenderPromptBox.tsx` (line 26)? A Student should already be logged in by this point.

## Notes on Prompts

A teacher will have chosen a prompt by ID when they create their Rumble game instance. The selected prompt can even be a custom prompt made by the teacher, also part of the Create Game functinality.

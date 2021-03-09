# Prompt Box

This prompt box will live within each Rumble Game Instance.
It simply provides a visual of `today's` prompt along with a `Submit` button.

## To Do

- [ ] What will we use to replace `active` fomr "getTimeUntilEvent"? I assume nothing bc we want to leave the Submit button open for ever
- [ ] Do we need `setAuthModalVisible` in RenderPromptBox.ts line 14?
- [ ] Do we need to check if a user is logged in when rendering the promptBoxModal in `RenderPromptBox.tsx` (line 26)? A Student should already be logged in by this point.
- [ ] how will we override the prompt selection from our DB when a teacher creates their own prompt?

# SEO

This component allows us to control the way our application is viewed by search engines, as well as embed certain metadata in our pages.

## `title`

Probably the only important property to set in this component, this will alter the title of the page that you put it on. For example, if you add

```tsx
<SEO title="My Profile">
```

then the name of the tab viewing the page will be "My Profile - Story Squad".

If a title is not set, it will default to "Story Squad - Free Daily Story Contest".

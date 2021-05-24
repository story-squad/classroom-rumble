# `useCheckBrowserState` Custom Hook

This is a highly specialized custom hook that allows us to maintain page state on refresh, provided that we push to the proper routes correctly. It is used in conjunction with recoil state to provide a standard way to render components based on state.

## Usage

The hook takes a comma-separated list of strings as an argument. The strings correspond to the names of the state values that you need to ensure are set to render a component. It returns an object with the `isLoading` property, which is intended to be a render condition for your component/loading message.

In the following example, the `StudentList` component needs information about the current student as well as the section. The possible arguments are hard-coded as a union type, so your editor will suggest the values ('section', 'student') to you.

```tsx
const { isLoading } = useCheckBrowserState('section', 'student');
const section = useRecoilValue(current.section);
const student = useRecoilValue(current.student);

return student && section ? (
  <StudentList student={student} section={section}>
) : isLoading ? (
  <p>Loading message...</p>
) : (
  <Redirect to="/dashboard/teacher" />
)
```

> Note: For this to work correctly, you must set the recoil state when pushing to a route that requires `currentViewState`. If you want the state to be maintained on refresh, you must ALSO pass the router state. Example:
>
> ```tsx
> setSection(section);
> setStudent(student);
> push('/dashboard/teacher/section', { section, student });
> ```
>
> Remember, provided that you're using the hook correctly in the component you're routing to, the recoil state will be updated automatically!

First, we check if the state values are set. If they are, we just render the component with the values passed in. Otherwise, we allow our hook to read the browser state. The initial state of `isLoading` is true, so it will render a loading message.

If the hook reads the desired values in from the browser state and successfully updates the recoil state, the component will be rendered with the values passed in.

If the hook fails to read the desired values out of the browser state, we are redirecting to the dashboard, which handles its own state and requires none of the `currentViewAtoms` to be set.

## Benefits

The biggest benefit of this pattern is that if a user refreshes the page, they don't have to reroute to their dashboard to load application state again. The hook reads the existing browser state (which persists after refresh) and displays the same component to them.

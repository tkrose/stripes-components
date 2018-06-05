# `<FocusWrap>`
Focus-routing to help make Single-Page React Applications (SPRA's) accessible through focus-management! Since SPRA's update the page without refreshing the entire page, it's important to move focus in response to these changes so that users of assistive technology can receive the context necessary for navigation actions that just took place. Imagine if all you had available to tell you the status of what was displayed within a webpage was the element that's in focus and the text it contains, its labels, its attributes - that's reality for a screen reader! So a change in navigation warrants a change in focus.

## What we're trying to solve...
`AutoFocus` is a nice thing that, when used tactically, can provide the just the focus transition that you need. It will cause a control to be focused right as the component mounts... the downside to this, you may not always want this behavior - say I have a container component (`<ReusedLayout>`) that gets re-used between different routes - one of which presents a deeper level of workflow than the other... 
```
<Route path="/1">
  <ReusedLayout />
</Route1>
<Route path="/2">
  <ReusedLayout />
  <ContextuallyImportant>
</Route2>
```
If `<ReusedLayout>` is relying on `AutoFocus`, bad things could happen. It will want to gain focus every mount. There will be a race condition for its `AutoFocus`ed controls and those that `<ContextuallyImportant>` may contain. `AutoFocus` could leave users of assitive techology lost if it's used improperly.

## Basic Usage
Managing focus among the components of the SPRA involves a combination of two components - `<FocusWrap>` and `<FocusWrapProvider>`. `<FocusWrapProvider>` sets a string through its `value` prop... this value is passed down through the React component tree. When a nested `<FocusWrap>` component mounts, it reads that passed value, compares it with its own `focusName` prop, and if they match, `<FocusWrap>` focuses the first focusable element within its child tree.

```
// Parent component, where routing is set up...
import { FocusWrapProvider } from '@folio/stripes-components/lib/FocusWrap';

<Route path="/search">
  <FocusWrapProvider value="search">
    <SearchView />
  </FocusWrapProvider>
</Route>
<Route path="/account">
  <FocusWrapProvider value="account">
    <AccountView />
  </FocusWrapProvider>
</Route>
``` 

```
// within views rendered by routes.....
import { FocusWrap } from '@folio/stripes-components/lib/FocusWrap';

<ReusedLayout>
  <FocusWrap focusName="search">
    <SearchField />
  </FocusWrap>
  <FocusWrap focusName="account">
    <FoundThing>
  </FocusWrap>
</ReusedLayout>
```

## Props
Name | type | description | default | required
--- | --- | --- | --- | ---
`children` | node | `<FocusWrap>` should contain a single child. | | &#10004;
`focusName` | string | If this string matches the string passed down from `<FocusWrapProvider>`, focus will transition to the child. | |
`focusRefGetter` | function | returns a ref to receive focus. Optional parameter. If none is provided, `<FocusWrap>` will focus the first focusable element it renders. | |
`shouldFocus` | bool | If true, the wrapped will be focused on mount. This can be made to look at query strings, state, or other criteria for determining whether or not it will need to be focused. | | 

## Targeting focus with a ref.
In scenarios where the first focusable element isn't what needs to receive immediate focus, you can control where it goes via a ref to the focusable element.

```
// within the Route's rendered component tree.....
<Reused>
  <FocusWrap focusName="searchSecondControl" focusRefGetter={() => this.secondControl}>
    <SearchField refToSecondThing={(ref) => {this.secondControl = ref;}} />
  </FocusWrap>
</Reused>
```

## Controlling focus via a boolean
Sometimes context won't exactly tell you where you need to focus and you may have to derive a boolean from a number of criteria within the current worflow of your application. This is where the `shouldFocus` prop comes in. This should be used sparingly - only in instances where matching of the `focusName` prop is inadequate.

```
// within the Route's rendered component tree.....
focusWhenNew() {
  return firstTime && queryParam('new');
}

focusHeading() {
  return !queryParam('new');
}

<Reused>
  <FocusWrap shouldFocus={this.focusWhenNew}>
    <NewFeaturesList />
  </FocusWrap>
  <FocusWrap shouldFocus={this.focusHeading}>
    <Header />
  </FocusWrap>
</Reused>
```

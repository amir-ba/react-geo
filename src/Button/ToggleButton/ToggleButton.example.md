This demonstrates the use of ToggleButtons.

A ToggleButton without any configuration:

```jsx
<ToggleButton
  onToggle={()=>{}}
/>
```

A ToggleButton initially pressed:

```jsx
<ToggleButton
  checked={true}
  onToggle={()=>{console.log(121)}}
/>
```

A ToggleButton with an icon and a pressedIcon:

```jsx
<ToggleButton
  icon="frown-o"
  pressedIcon="smile-o"
  onToggle={()=>{}}
/>
```

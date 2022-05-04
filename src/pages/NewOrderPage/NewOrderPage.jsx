import { useState, useEffect } from 'react';

export default function NewOrderPage() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(function() {
    console.log('New Order Page Rendered')
  })
  useEffect(function() {
    console.log('useeffect runs after first render')
  }, [menuItems])

  // - Fetch the menuItems from the server via AJAX
  // - When the data comes back, call setMenuItems to save in state

  return (
    <>
    <h1>NewOrderPage</h1>
    <button onClick={() => setMenuItems(Date.now())}>Trigger re-render</button>
    </>
  );
}
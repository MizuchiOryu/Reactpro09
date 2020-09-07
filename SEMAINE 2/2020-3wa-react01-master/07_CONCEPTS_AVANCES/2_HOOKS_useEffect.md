# HOOKS

## Notions nécessaires


## Nouvelles notions
- UseEffect

## Codes a tester
```
const Counter = () => {

  const [count1, setCount1] = React.useState(0);

   React.useEffect( () => console.log("mount"), [] );

   React.useEffect( () => console.log("count1 updated"), [ count1 ] );

   React.useEffect( () => console.log("any updated") );

   React.useEffect( () => () => console.log("will update count1 or unmount"), [  count1 ] );

   React.useEffect( () => () => console.log("unmount"), [] );

  return (
      <div>
      <p>You clicked {count1} times</p>
      <button onClick={() => setCount1(count1 + 1)}>
      First
      </button>
      </div>
  );
}

const App = () =>{
const [display, setDisplay] = React.useState(true);
return(
  <div>
    <button onClick={() => setDisplay(false)}>
      Delete
    </button>
    {display && <Counter/>}
</div>
)
}

ReactDOM.render(
<App/>,
document.getElementById('root')
);

```

### Sans nettoyage
```
const Counter = () => {

  const [count, setCount] = React.useState(0);

  // Au montage la première fois.
  // Et dès que le state change.  
  React.useEffect(() => {
    setTimeout(() => {
      console.log(`First message: You clicked ${count} times`);
    }, 1000);
  });

  // Au montage la première fois.
  // Dès que le state change.
  React.useEffect(() => {
    setTimeout(() => {
      console.log(`Second message: You clicked ${count} times`);
    }, 1000);
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

### Avec nettoyage
```
import React, { useState, useEffect } from 'react';

//API class
class ChatAPIClass {

  //Subscription is simulated by a contant loop.
  constructor(){
    this.interval = null;
    this.loops = new Set();
  }

  subscribeToFriendStatus(friendId,handleFunction){

    //the loop call the handle function
    this.interval = setInterval(()=>{
      const status = Math.random() < 0.5;
      handleFunction(
        {
          isOnline : status,
          size : this.loops.size
        }
      );
    },3000);

    //add Interval to set to control loops currently running
    this.loops.add(this.interval);
  }
  unsubscribeFromFriendStatus(friendId,handleFunction){

    //Clear the loop
    if(this.interval){
      clearInterval(this.interval);
      this.loops.delete(this.interval);
      handleFunction(
        {
          size : this.loops.size
        }
      );
    }

  }
}

const ChatAPI = new ChatAPIClass();

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);
  const [size, setSize] = useState(0);

  useEffect(() => {
    function handleStatusChange(status) {
      console.log(status)
      setSize(status.size);
      if(status.isOnline !== undefined){
        setIsOnline(status.isOnline);
      }
    }
    //This line create a loop and update stauts
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

    //This line clear the loop
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  //Unmount only Effect
  useEffect( () => () => console.log("unmount"), [] );

  if (isOnline === null) {
    return 'Chargement...';
  }

  //Green : Loop has been stoped, Red loop is still running
  return (<div style={{color: size > 0 ? 'red' : 'green'}}>{isOnline ? 'En ligne' : 'Hors-ligne'}</div>);
}

const App = (props) => {

  const [renderChild,setRenderChild] = useState(1);

  const unmount = () =>{
    setRenderChild(0);
  }

  return(
    <div>
      {renderChild && <FriendStatus friend={{id:1}}/>}
      <div>
        <input type="button" onClick={unmount} value="Démonter"/>
      </div>
    </div>
  )
}

export default App;

```
